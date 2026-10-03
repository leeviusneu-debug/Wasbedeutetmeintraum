import "server-only";

import { AnalysisError } from "./errors";
import { prepareDream } from "./prepare";
import { buildUserPrompt, SYSTEM_PROMPT } from "./prompt";
import { getAIProvider } from "./providers";
import {
  analysisRequestSchema,
  dreamInterpretationSchema,
  interpretationJsonSchema,
  type DreamInterpretation,
} from "./schema";

/**
 * Zentrale Einstiegsstelle für die Traumdeutung.
 * Prüft die Eingabe, bereitet sie auf, ruft den konfigurierten KI-Anbieter
 * und validiert dessen Ausgabe. Der Anbieter ist austauschbar (AI_PROVIDER).
 */
export async function analyzeDream(
  input: unknown,
  options: { signal?: AbortSignal } = {},
): Promise<DreamInterpretation> {
  const parsed = analysisRequestSchema.safeParse(input);
  if (!parsed.success) {
    throw new AnalysisError("invalid_input", { cause: parsed.error });
  }

  const prepared = prepareDream(parsed.data);
  const provider = getAIProvider();

  const raw = await provider.generateStructured({
    system: SYSTEM_PROMPT,
    user: buildUserPrompt(prepared),
    schemaName: "dream_interpretation",
    jsonSchema: interpretationJsonSchema(),
    signal: options.signal,
  });

  const result = dreamInterpretationSchema.safeParse(raw);
  if (!result.success) {
    throw new AnalysisError("invalid_output", { cause: result.error });
  }
  return normalize(result.data);
}

function normalize(interpretation: DreamInterpretation): DreamInterpretation {
  const trimAll = (items: string[]) =>
    items.map((item) => item.trim()).filter(Boolean);
  return {
    summary: interpretation.summary.trim(),
    observations: interpretation.observations.map((o) => ({
      title: o.title.trim().replace(/[.:]$/, ""),
      text: o.text.trim(),
    })),
    thread: interpretation.thread.trim(),
    psychological: trimAll(interpretation.psychological),
    keyInsight: interpretation.keyInsight.trim(),
    symbolic: trimAll(interpretation.symbolic),
    mystical: trimAll(interpretation.mystical),
    reflection: interpretation.reflection.trim(),
    careNote: interpretation.careNote.trim(),
  };
}
