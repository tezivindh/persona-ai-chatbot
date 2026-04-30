import { Message } from "@/types";

interface Props {
  message: Message;
  accentColor: string;
}

const bubbleColor: Record<string, string> = {
  indigo: "bg-indigo-600",
  emerald: "bg-emerald-600",
  orange: "bg-orange-600",
};

export default function MessageBubble({ message, accentColor }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? `${bubbleColor[accentColor]} text-white rounded-br-sm`
            : "bg-white/8 border border-white/10 text-white/90 rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
