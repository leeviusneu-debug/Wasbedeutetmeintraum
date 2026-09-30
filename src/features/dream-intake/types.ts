import type { ProcessingConsent } from "./consent";

export type QuestionId =
  | "emotion"
  | "people"
  | "place"
  | "symbol"
  | "action"
  | "ending"
  | "waking"
  | "life";

export type QuestionKind = "single" | "multi" | "text";

export type QuestionOption = {
  value: string;
  label: string;
  /** Zeigt bei Auswahl ein Freitextfeld („Etwas anderes“). */
  isOther?: boolean;
  /** Hebt bei Mehrfachauswahl alle anderen Optionen auf („Nichts Besonderes“). */
  exclusive?: boolean;
};

export type Question = {
  id: QuestionId;
  kind: QuestionKind;
  /** Kurzer, persönlicher Übergang, der auf bisherige Antworten eingeht. */
  lead?: string;
  title: string;
  hint?: string;
  placeholder?: string;
  options?: QuestionOption[];
  /** Optionales Freitextfeld zusätzlich zur Auswahl. */
  notePrompt?: string;
};

export type Answer = {
  selected: string[];
  /** Freitext – bei Textfragen die Antwort, sonst „Etwas anderes“ bzw. Notiz. */
  text: string;
  skipped?: boolean;
};

export type DreamSession = {
  version: 1;
  phase: "story" | "questions" | "complete";
  dream: string;
  /** Die für diesen Traum ausgewählte Fragenfolge. */
  flow: QuestionId[];
  step: number;
  answers: Partial<Record<QuestionId, Answer>>;
  /** Einwilligung in die Verarbeitung (siehe consent.ts). */
  consent?: ProcessingConsent;
  updatedAt: string;
};
