"use client";
import { useState, useCallback } from "react";
import { Message, PersonaId, Persona } from "@/types";
import { personas } from "@/lib/personas";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import ChatWindow from "@/components/ChatWindow";

const personaList: Persona[] = Object.values(personas);

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>("anshuman");
  const [conversations, setConversations] = useState<Record<PersonaId, Message[]>>({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePersona = personas[activePersonaId];
  const messages = conversations[activePersonaId];

  const handlePersonaSwitch = useCallback((id: PersonaId) => {
    setActivePersonaId(id);
    setInput("");
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: updatedMessages,
      }));
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages,
            personaId: activePersonaId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        };

        setConversations((prev) => ({
          ...prev,
          [activePersonaId]: [...updatedMessages, assistantMessage],
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [activePersonaId, messages, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const accentBorder: Record<string, string> = {
    indigo: "focus:border-indigo-500",
    emerald: "focus:border-emerald-500",
    orange: "focus:border-orange-500",
  };

  const sendBtnColor: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-500",
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    orange: "bg-orange-600 hover:bg-orange-500",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/8 px-4 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Scaler Personas</h1>
              <p className="text-white/40 text-xs mt-0.5">
                Chat with Scaler's founders & mentors
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() =>
                  setConversations((prev) => ({ ...prev, [activePersonaId]: [] }))
                }
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Clear chat
              </button>
            )}
          </div>
          <PersonaSwitcher
            personas={personaList}
            activeId={activePersonaId}
            onSwitch={handlePersonaSwitch}
          />
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-3xl w-full mx-auto">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          persona={activePersona}
          onSuggestion={(text) => sendMessage(text)}
          showSuggestions={messages.length === 0}
        />

        {/* Error */}
        {error && (
          <div className="mx-4 mb-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-6 flex-shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${activePersona.name}...`}
              rows={1}
              disabled={isLoading}
              className={`flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-opacity-100 disabled:opacity-50 ${accentBorder[activePersona.color]}`}
              style={{ maxHeight: "120px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className={`px-4 py-3 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed ${sendBtnColor[activePersona.color]}`}
            >
              Send
            </button>
          </div>
          <p className="text-white/20 text-xs mt-2 text-center">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
