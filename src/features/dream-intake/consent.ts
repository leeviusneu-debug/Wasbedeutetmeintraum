/**
 * Einwilligung in die Verarbeitung des Traums (Art. 9 Abs. 2 lit. a DSGVO).
 * Bei jeder inhaltlichen Änderung des Textes die Version erhöhen – dann muss
 * die Einwilligung erneut erteilt werden.
 */
export const PROCESSING_CONSENT = {
  version: "processing-2026-09-v1",
  text: "Ich willige ein, dass mein Traum und meine Antworten – einschließlich möglicher Angaben zu Gesundheit, Sexualität oder religiösen Überzeugungen – zur Erstellung meiner Deutung mithilfe künstlicher Intelligenz an OpenAI übermittelt und dort verarbeitet werden. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen.",
} as const;

export type ProcessingConsent = {
  version: string;
  givenAt: string;
};

export function hasValidConsent(consent: ProcessingConsent | undefined) {
  return consent?.version === PROCESSING_CONSENT.version;
}
