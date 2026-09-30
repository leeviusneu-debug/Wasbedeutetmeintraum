import type { AnalysisErrorCode } from "./contract";

const DEFAULTS: Record<AnalysisErrorCode, { status: number; message: string }> =
  {
    invalid_input: {
      status: 400,
      message:
        "Deine Angaben konnten nicht verarbeitet werden. Bitte prüfe deinen Traum noch einmal.",
    },
    not_configured: {
      status: 503,
      message: "Die Traumdeutung ist gerade nicht verfügbar.",
    },
    rate_limited: {
      status: 429,
      message:
        "Gerade kommen sehr viele Anfragen zusammen. Bitte versuche es in ein paar Minuten noch einmal.",
    },
    timeout: {
      status: 504,
      message:
        "Die Deutung hat länger gedauert als erwartet. Bitte versuche es noch einmal.",
    },
    unavailable: {
      status: 502,
      message:
        "Die Deutung konnte gerade nicht erstellt werden. Bitte versuche es gleich noch einmal.",
    },
    invalid_output: {
      status: 502,
      message:
        "Bei der Deutung ist etwas durcheinandergeraten. Bitte versuche es noch einmal.",
    },
    refused: {
      status: 422,
      message:
        "Zu diesem Traum konnte leider keine Deutung erstellt werden. Magst du ihn etwas anders beschreiben?",
    },
    invalid_email: {
      status: 400,
      message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    },
    expired: {
      status: 410,
      message:
        "Diese Deutung ist abgelaufen. Lade die Seite neu, dann erstelle ich sie noch einmal für dich.",
    },
    delivery_failed: {
      status: 502,
      message:
        "Die E-Mail konnte gerade nicht verschickt werden. Bitte versuche es gleich noch einmal.",
    },
    email_limit: {
      status: 429,
      message:
        "An diese Adresse haben wir heute schon mehrere Deutungen geschickt. Bitte versuche es morgen wieder.",
    },
    unknown: {
      status: 500,
      message: "Etwas ist schiefgelaufen. Bitte versuche es noch einmal.",
    },
  };

/**
 * Fehler mit nutzerfreundlicher Nachricht. Technische Details landen nur
 * im Server-Log (`cause`), nie in der Antwort an den Browser.
 */
export class AnalysisError extends Error {
  readonly code: AnalysisErrorCode;
  readonly status: number;
  readonly userMessage: string;

  constructor(
    code: AnalysisErrorCode,
    options?: { cause?: unknown; userMessage?: string },
  ) {
    super(code, { cause: options?.cause });
    this.name = "AnalysisError";
    this.code = code;
    this.status = DEFAULTS[code].status;
    this.userMessage = options?.userMessage ?? DEFAULTS[code].message;
  }
}

export function defaultErrorMessage(code: AnalysisErrorCode) {
  return DEFAULTS[code].message;
}
