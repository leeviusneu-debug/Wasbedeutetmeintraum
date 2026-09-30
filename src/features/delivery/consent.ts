/**
 * Texte für Einwilligungen – zentral und versioniert, damit später
 * nachvollziehbar ist, welchem Wortlaut jemand zugestimmt hat.
 * Wird im Formular angezeigt und serverseitig mitgespeichert.
 */
export const NEWSLETTER_CONSENT = {
  version: "newsletter-2026-09-v1",
  text: "Ja, ich möchte gelegentlich interessante Inhalte rund um Träume und Traumdeutung per E-Mail erhalten.",
} as const;

/** Die Zusendung der Deutung ist ausdrücklich keine Newsletter-Anmeldung. */
export const DELIVERY_NOTICE =
  "Wir nutzen deine Adresse nur, um dir diese Deutung zu schicken. Das ist keine Newsletter-Anmeldung.";
