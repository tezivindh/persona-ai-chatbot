export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 w-fit">
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}
