import { detectMotifs, quoteList, type DetectedMotifs } from "./detect";
import type { Answer, Question, QuestionId, QuestionOption } from "./types";

const OTHER: QuestionOption = {
  value: "other",
  label: "Etwas anderes",
  isOther: true,
};

const EMOTIONS: QuestionOption[] = [
  { value: "Angst", label: "Angst" },
  { value: "Freude", label: "Freude" },
  { value: "Traurigkeit", label: "Traurigkeit" },
  { value: "Ruhe", label: "Ruhe" },
  { value: "Verwirrung", label: "Verwirrung" },
  { value: "Neugier", label: "Neugier" },
  OTHER,
];

const MIDDLE_TOPICS = ["people", "place", "symbol", "action"] as const;
type MiddleTopic = (typeof MIDDLE_TOPICS)[number];

function motifCount(topic: MiddleTopic, motifs: DetectedMotifs) {
  switch (topic) {
    case "people":
      return motifs.people.length;
    case "place":
      return motifs.places.length;
    case "symbol":
      return motifs.symbols.length;
    case "action":
      return motifs.actions.length;
  }
}

/**
 * Stellt die Fragenfolge passend zur Traumbeschreibung zusammen (6–7 Fragen):
 * Gefühl → 2–3 Themen, die im Traum auffallen → Ende → Aufwachen → Leben.
 */
export function buildQuestionFlow(dream: string): QuestionId[] {
  const motifs = detectMotifs(dream);
  const isShort = dream.trim().length < 160;

  const ranked = [...MIDDLE_TOPICS].sort((a, b) => {
    // Bei knappen Beschreibungen zuerst nach der Handlung fragen.
    if (isShort && (a === "action" || b === "action")) {
      return a === "action" ? -1 : 1;
    }
    return motifCount(b, motifs) - motifCount(a, motifs);
  });

  const detectedTopics = MIDDLE_TOPICS.filter(
    (topic) => motifCount(topic, motifs) > 0,
  ).length;
  const middle = ranked.slice(0, detectedTopics >= 3 ? 3 : 2);

  // Reihenfolge wie in einem Gespräch: Wer → Wo → Was → Wie gehandelt.
  const ordered = MIDDLE_TOPICS.filter((topic) => middle.includes(topic));

  return ["emotion", ...ordered, "ending", "waking", "life"];
}

function describeEmotion(answer: Answer | undefined) {
  if (!answer || answer.skipped) return null;
  const [value] = answer.selected;
  if (value === OTHER.value) {
    return answer.text.trim() ? `„${answer.text.trim()}“` : null;
  }
  return value ?? null;
}

/** Erzeugt die konkrete Frage – Formulierung abhängig von Traum und Antworten. */
export function resolveQuestion(
  id: QuestionId,
  dream: string,
  answers: Partial<Record<QuestionId, Answer>>,
): Question {
  const motifs = detectMotifs(dream);

  switch (id) {
    case "emotion":
      return {
        id,
        kind: "single",
        lead: "Danke, dass du deinen Traum teilst.",
        title: "Welches Gefühl war in deinem Traum am stärksten?",
        hint: "Wähle, was am ehesten passt – es muss nicht genau stimmen.",
        options: EMOTIONS,
      };

    case "people":
      return {
        id,
        kind: "text",
        lead: motifs.people.length
          ? `In deinem Traum ${motifs.people.length > 1 ? "kommen" : "kommt"} ${quoteList(motifs.people)} vor.`
          : "Lass uns kurz auf die Menschen im Traum schauen.",
        title: motifs.people.length
          ? "Wer war besonders wichtig – und wie hast du diese Person erlebt?"
          : "Waren andere Menschen da – bekannte oder fremde?",
        hint: "Manchmal zeigt sich eine Person anders als im echten Leben.",
        placeholder: "z. B. vertraut, fremd, liebevoll, bedrohlich …",
      };

    case "place":
      return {
        id,
        kind: "multi",
        lead: motifs.places.length
          ? `Dein Traum führt dich an einen besonderen Ort: „${motifs.places[0]}“.`
          : "Träume haben oft eine eigene Umgebung.",
        title: motifs.places.length
          ? "Wie hat sich dieser Ort für dich angefühlt?"
          : "Wo warst du – und wie hat sich dieser Ort angefühlt?",
        hint: "Mehrere Antworten sind möglich.",
        options: [
          { value: "Vertraut", label: "Vertraut" },
          { value: "Fremd", label: "Fremd" },
          { value: "Geborgen", label: "Geborgen" },
          { value: "Bedrohlich", label: "Bedrohlich" },
          { value: "Eng", label: "Eng" },
          { value: "Weit und offen", label: "Weit und offen" },
        ],
        notePrompt: motifs.places.length
          ? "Magst du den Ort noch etwas beschreiben? (optional)"
          : "Wo war das ungefähr? (optional)",
      };

    case "symbol":
      return {
        id,
        kind: "text",
        lead: motifs.symbols.length
          ? `Ein Bild sticht heraus: „${motifs.symbols[0]}“.`
          : "Manchmal bleibt ein einzelnes Detail besonders hängen.",
        title: motifs.symbols.length
          ? "Was ist dir daran besonders in Erinnerung geblieben?"
          : "Gab es einen Gegenstand, ein Tier oder ein Bild, das dir aufgefallen ist?",
        hint: "Farbe, Größe, was es getan hat, wie es auf dich gewirkt hat.",
        placeholder: "Mir ist aufgefallen, dass …",
      };

    case "action":
      return {
        id,
        kind: "single",
        lead: motifs.actions.length
          ? `${motifs.actions[0]} scheint eine wichtige Rolle zu spielen.`
          : "Jetzt zu dir selbst im Traum.",
        title: "Wie warst du selbst am Geschehen beteiligt?",
        options: [
          { value: "Aktiv gehandelt", label: "Ich habe aktiv gehandelt" },
          { value: "Eher beobachtet", label: "Ich habe eher zugeschaut" },
          {
            value: "Wollte, konnte aber nicht",
            label: "Ich wollte handeln, konnte aber nicht",
          },
          { value: "Wechselhaft", label: "Das hat sich ständig verändert" },
          OTHER,
        ],
      };

    case "ending":
      return {
        id,
        kind: "single",
        lead: "Träume enden oft ganz unterschiedlich.",
        title: "Wie hat dein Traum aufgehört?",
        options: [
          { value: "Abrupt aufgewacht", label: "Ich bin abrupt aufgewacht" },
          { value: "Gelöst", label: "Es gab eine Art Lösung" },
          { value: "Aufgelöst", label: "Er hat sich einfach aufgelöst" },
          { value: "Offen", label: "Es blieb offen" },
          { value: "Nicht erinnert", label: "Daran erinnere ich mich nicht" },
          OTHER,
        ],
      };

    case "waking": {
      const emotion = describeEmotion(answers.emotion);
      return {
        id,
        kind: "single",
        lead: emotion
          ? `Im Traum war vor allem ${emotion} da.`
          : "Und dann bist du aufgewacht.",
        title: "Wie ging es dir, als du aufgewacht bist?",
        options: [
          { value: "Erleichtert", label: "Erleichtert" },
          { value: "Friedlich", label: "Friedlich" },
          { value: "Unruhig", label: "Unruhig" },
          { value: "Traurig", label: "Traurig" },
          { value: "Aufgewühlt", label: "Aufgewühlt" },
          { value: "Nachdenklich", label: "Nachdenklich" },
          OTHER,
        ],
      };
    }

    case "life":
      return {
        id,
        kind: "multi",
        lead: "Zum Schluss eine Frage an dich – nicht an den Traum.",
        title: "Was beschäftigt dich gerade in deinem Leben?",
        hint: "Träume greifen oft auf, was uns im Wachleben bewegt. Mehrere Antworten sind möglich.",
        options: [
          { value: "Beziehung & Liebe", label: "Beziehung & Liebe" },
          { value: "Familie", label: "Familie" },
          { value: "Arbeit oder Ausbildung", label: "Arbeit oder Ausbildung" },
          { value: "Eine Veränderung", label: "Eine Veränderung" },
          { value: "Abschied oder Verlust", label: "Abschied oder Verlust" },
          { value: "Stress oder Druck", label: "Stress oder Druck" },
          { value: "Gesundheit", label: "Gesundheit" },
          {
            value: "Nichts Besonderes",
            label: "Nichts Besonderes",
            exclusive: true,
          },
        ],
        notePrompt: "Magst du etwas dazu erzählen? (optional)",
      };
  }
}

export function isAnswerComplete(question: Question, answer: Answer) {
  if (question.kind === "text") return answer.text.trim().length > 0;
  if (answer.selected.length === 0) return false;
  const other = question.options?.find((o) => o.isOther);
  if (other && answer.selected.includes(other.value)) {
    return answer.text.trim().length > 0;
  }
  return true;
}
