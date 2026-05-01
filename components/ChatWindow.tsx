"use client";
import { useRef, useEffect } from "react";
import { Message, Persona } from "@/types";
import Image from "next/image";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

interface Props {
  messages: Message[];
  isLoading: boolean;
  persona: Persona;
  onSuggestion: (text: string) => void;
  showSuggestions: boolean;
}

export default function ChatWindow({
  messages,
  isLoading,
  persona,
  onSuggestion,
  showSuggestions,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 min-h-0">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-12">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src={persona.avatar}
              alt={persona.name}
              fill
              className="rounded-full object-cover shadow-lg ring-2 ring-white/10"
            />
          </div>
          <div>
            <p className="text-white/80 font-semibold text-lg">{persona.name}</p>
            <p className="text-white/40 text-sm mt-1">{persona.title}</p>
          </div>
          <p className="text-white/30 text-sm max-w-xs">
            Start a conversation or pick a question below
          </p>
          {showSuggestions && (
            <SuggestionChips
              suggestions={persona.suggestions}
              onSelect={onSuggestion}
              accentColor={persona.color}
            />
          )}
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} accentColor={persona.color} />
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
