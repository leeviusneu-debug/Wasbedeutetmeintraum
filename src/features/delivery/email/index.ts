import "server-only";

import { AnalysisError } from "@/features/analysis/errors";
import { createDevOutboxSender } from "./dev-outbox";
import { createResendSender } from "./resend";
import type { EmailSender } from "./types";

const SENDERS: Record<string, () => EmailSender> = {
  resend: createResendSender,
  outbox: createDevOutboxSender,
};

/**
 * Wählt den Versanddienst über EMAIL_PROVIDER.
 * Standard: in der Entwicklung „outbox“ (lokale Dateien), in Produktion
 * muss ein echter Dienst ausdrücklich gesetzt werden.
 */
export function getEmailSender(): EmailSender {
  const fallback = process.env.NODE_ENV === "production" ? "" : "outbox";
  const id = process.env.EMAIL_PROVIDER?.trim().toLowerCase() || fallback;
  const create = SENDERS[id];
  if (!create) {
    throw new AnalysisError("not_configured", {
      cause: new Error(`EMAIL_PROVIDER ungültig oder nicht gesetzt: "${id}"`),
      userMessage: "Der E-Mail-Versand ist gerade nicht verfügbar.",
    });
  }
  return create();
}
