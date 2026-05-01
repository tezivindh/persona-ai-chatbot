export type PersonaId = "anshuman" | "abhimanyu" | "kshitij";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  avatar: string; // path to image in /public
  color: string; // tailwind accent color class
  systemPrompt: string;
  suggestions: string[];
}
