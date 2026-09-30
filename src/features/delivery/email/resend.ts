import "server-only";

import { AnalysisError } from "@/features/analysis/errors";
import type { EmailSender } from "./types";

/** Versand über die HTTP-API von Resend (https://resend.com). */
export function createResendSender(): EmailSender {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    throw new AnalysisError("not_configured", {
      cause: new Error("RESEND_API_KEY oder EMAIL_FROM ist nicht gesetzt."),
      userMessage: "Der E-Mail-Versand ist gerade nicht verfügbar.",
    });
  }
  const replyTo = process.env.EMAIL_REPLY_TO?.trim();

  return {
    id: "resend",
    async send(message) {
      let response: Response;
      try {
        response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            ...(message.idempotencyKey && {
              "Idempotency-Key": message.idempotencyKey,
            }),
          },
          body: JSON.stringify({
            from,
            to: [message.to],
            subject: message.subject,
            html: message.html,
            text: message.text,
            ...(replyTo && { reply_to: replyTo }),
          }),
          signal: AbortSignal.timeout(15_000),
        });
      } catch (error) {
        throw new AnalysisError("delivery_failed", { cause: error });
      }

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const cause = new Error(`Resend ${response.status}: ${detail}`);
        if (response.status === 401 || response.status === 403) {
          throw new AnalysisError("not_configured", {
            cause,
            userMessage: "Der E-Mail-Versand ist gerade nicht verfügbar.",
          });
        }
        if (response.status === 422) {
          throw new AnalysisError("invalid_email", { cause });
        }
        throw new AnalysisError("delivery_failed", { cause });
      }
    },
  };
}
