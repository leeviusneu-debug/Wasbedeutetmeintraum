import { resolveQuestion } from "@/features/dream-intake/questions";
import type {
  Answer,
  Question,
  QuestionId,
} from "@/features/dream-intake/types";
import type { AnalysisRequest } from "./schema";

const TOPIC_LABELS: Record<QuestionId, string> = {
  emotion: "Stärkstes Gefühl im Traum",
  people: "Wichtige Personen",
  place: "Ort",
  symbol: "Auffälliges Bild / Symbol",
  action: "Eigene Rolle in der Handlung",
  ending: "Ende des Traums",
  waking: "Gefühl nach dem Aufwachen",
  life: "Aktuelle Lebenssituation",
};

export type PreparedAnswer = {
  topic: string;
  question: string;
  answer: string;
};

/** Bereinigte, für die KI lesbare Fassung der Traumabfrage. */
export type PreparedDream = {
  dream: string;
  answers: PreparedAnswer[];
  skippedTopics: string[];
};

function clean(text: string) {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatAnswer(question: Question, answer: Answer): string | null {
  const text = clean(answer.text);

  if (question.kind === "text") return text || null;

  const options = question.options ?? [];
  const labels = answer.selected
    .map((value) => options.find((o) => o.value === value))
    .filter((o) => o !== undefined)
    .map((o) => (o.isOther ? text || null : o.label))
    .filter((label): label is string => Boolean(label));

  if (labels.length === 0) return null;

  const hasOther = answer.selected.some(
    (value) => options.find((o) => o.value === value)?.isOther,
  );
  const note = !hasOther && text ? ` – Ergänzung: „${text}“` : "";
  return labels.join(", ") + note;
}

export function prepareDream(request: AnalysisRequest): PreparedDream {
  const dream = clean(request.dream);
  const answers: PreparedAnswer[] = [];
  const skippedTopics: string[] = [];

  for (const id of request.flow) {
    const answer = request.answers[id];
    const question = resolveQuestion(id, dream, request.answers);
    const formatted =
      answer && !answer.skipped ? formatAnswer(question, answer) : null;

    if (formatted) {
      answers.push({
        topic: TOPIC_LABELS[id],
        question: question.title,
        answer: formatted,
      });
    } else {
      skippedTopics.push(TOPIC_LABELS[id]);
    }
  }

  return { dream, answers, skippedTopics };
}
