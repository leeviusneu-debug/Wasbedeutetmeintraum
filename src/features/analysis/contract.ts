import type { DreamInterpretation } from "./schema";

/**
 * Vertrag zwischen Browser und /api/deutung.
 * Bewusst ohne zod-Import, damit der Client-Code schlank bleibt.
 */
export const analysisErrorCodes = [
  "invalid_input",
  "not_configured",
  "rate_limited",
  "timeout",
  "unavailable",
  "invalid_output",
  "refused",
  "unknown",
] as const;

export type AnalysisErrorCode = (typeof analysisErrorCodes)[number];

export type AnalysisApiResponse =
  | { interpretation: DreamInterpretation }
  | { error: { code: AnalysisErrorCode; message: string } };
