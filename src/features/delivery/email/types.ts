/**
 * Schnittstelle für E-Mail-Versanddienste (Resend, Postmark, Brevo, SMTP …).
 * Ein neuer Dienst implementiert nur `send` und wird in `./index.ts` registriert.
 */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Verhindert doppelten Versand bei Wiederholungen (sofern unterstützt). */
  idempotencyKey?: string;
};

export interface EmailSender {
  readonly id: string;
  send(message: EmailMessage): Promise<void>;
}
