import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Anfrage: Rohdaten aus der Traumabfrage (vom Client gesendet)        */
/* ------------------------------------------------------------------ */

export const questionIdSchema = z.enum([
  "emotion",
  "people",
  "place",
  "symbol",
  "action",
  "ending",
  "waking",
  "life",
]);

const answerSchema = z.object({
  selected: z.array(z.string().max(100)).max(12),
  text: z.string().max(2000),
  skipped: z.boolean().optional(),
});

export const analysisRequestSchema = z.object({
  dream: z
    .string()
    .trim()
    .min(10, "Die Traumbeschreibung ist zu kurz.")
    .max(8000, "Die Traumbeschreibung ist zu lang."),
  flow: z.array(questionIdSchema).max(8),
  answers: z.partialRecord(questionIdSchema, answerSchema),
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;

/* ------------------------------------------------------------------ */
/* Antwort: strukturierte Deutung (von der KI erzeugt)                 */
/* ------------------------------------------------------------------ */

const paragraphs = (description: string, max: number) =>
  z.array(z.string().min(1)).min(1).max(max).describe(description);

export const dreamInterpretationSchema = z.object({
  summary: z
    .string()
    .min(1)
    .describe(
      "Kurze, persönliche Zusammenfassung (2–3 Sätze): Was fällt an diesem Traum als Ganzes besonders auf?",
    ),
  observations: z
    .array(
      z.object({
        title: z
          .string()
          .min(1)
          .describe("Prägnante Überschrift, 2–6 Wörter, ohne Punkt."),
        text: z
          .string()
          .min(1)
          .describe("1–2 Sätze, konkret auf diesen Traum bezogen."),
      }),
    )
    .min(2)
    .max(4)
    .describe("2–4 zentrale Beobachtungen zum gesamten Traum."),
  psychological: paragraphs(
    "Eine mögliche psychologische Perspektive, 2–3 Absätze.",
    3,
  ),
  keyInsight: z
    .string()
    .min(1)
    .describe(
      "Der zentrale Gedanke: 1–2 Sätze, die Traum und Lebenssituation konkret und überraschend verbinden.",
    ),
  symbolic: paragraphs(
    "Die symbolische Ebene mit mehreren möglichen Lesarten, 1–2 Absätze.",
    2,
  ),
  mystical: paragraphs(
    "Eine vorsichtige traditionelle/spirituelle Perspektive, 1 Absatz.",
    1,
  ),
  bridge: z
    .string()
    .min(1)
    .describe(
      "2–3 Sätze: Eine sich abzeichnende Verbindung zur Lebenssituation benennen und behutsam zeigen, was man persönlich wissen müsste, um sie wirklich einzuordnen.",
    ),
  careNote: z
    .string()
    .describe(
      "Nur bei Hinweisen auf eine akute Krise ein behutsamer Hinweis auf Unterstützung, sonst leerer String.",
    ),
});

export type DreamInterpretation = z.infer<typeof dreamInterpretationSchema>;

/** JSON-Schema für Structured Outputs des Sprachmodells. */
export function interpretationJsonSchema(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    ...z.toJSONSchema(dreamInterpretationSchema, {
      target: "draft-7",
      io: "output",
    }),
  };
  delete schema.$schema;
  return schema;
}
