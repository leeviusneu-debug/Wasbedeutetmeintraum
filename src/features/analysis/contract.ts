import type { InterpretationPreview } from "./schema";

/**
 * Vertrag zwischen Browser und /api/deutung/*.
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
  "invalid_email",
  "expired",
  "delivery_failed",
  "email_limit",
  "unknown",
] as const;

export type AnalysisErrorCode = (typeof analysisErrorCodes)[number];

export type ApiError = { error: { code: AnalysisErrorCode; message: string } };

/** POST /api/deutung */
export type AnalysisApiResponse =
  | {
      preview: InterpretationPreview;
      /** Undurchsichtige Referenz auf die vollständige Deutung (serverseitig). */
      analysisRef: string;
      /** Abschnitte, die nur in der E-Mail enthalten sind. */
      emailOnlySections: string[];
    }
  | ApiError;

/** POST /api/deutung/zusenden */
export type DeliveryApiRequest = {
  analysisRef: string;
  email: string;
  newsletterConsent: boolean;
};

export type DeliveryApiResponse = { status: "sent" } | ApiError;
