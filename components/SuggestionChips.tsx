interface Props {
  suggestions: string[];
  onSelect: (text: string) => void;
  accentColor: string;
}

const chipColor: Record<string, string> = {
  indigo: "border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10",
  emerald: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10",
  orange: "border-orange-500/30 text-orange-300 hover:bg-orange-500/10",
};

export default function SuggestionChips({ suggestions, onSelect, accentColor }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${chipColor[accentColor]}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
