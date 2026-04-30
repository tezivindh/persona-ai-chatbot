"use client";
import { Persona, PersonaId } from "@/types";

interface Props {
  personas: Persona[];
  activeId: PersonaId;
  onSwitch: (id: PersonaId) => void;
}

const colorMap: Record<string, string> = {
  indigo: "border-indigo-500 bg-indigo-500/10 text-indigo-300",
  emerald: "border-emerald-500 bg-emerald-500/10 text-emerald-300",
  orange: "border-orange-500 bg-orange-500/10 text-orange-300",
};

const inactiveColor =
  "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80";

export default function PersonaSwitcher({ personas, activeId, onSwitch }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => onSwitch(p.id)}
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
            activeId === p.id ? colorMap[p.color] : inactiveColor
          }`}
        >
          <span className="mr-2">{p.avatar}</span>
          {p.name}
        </button>
      ))}
    </div>
  );
}
