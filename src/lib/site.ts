export const siteConfig = {
  name: "Was bedeutet mein Traum?",
  description:
    "Träume können Schlüssel zu unserer Seele sein. Erzähle deinen Traum und erhalte eine persönliche Deutung aus psychologischer, symbolischer und behutsam spiritueller Perspektive.",
  locale: "de_DE",
  /**
   * Erklärvideo auf der Startseite („Wie funktioniert das?“).
   * Sobald vorhanden, z. B. unter public/video/ ablegen und hier eintragen:
   * { src: "/video/wie-es-funktioniert.mp4", poster: "/video/poster.jpg" }
   */
  explainerVideo: null as { src: string; poster?: string } | null,
};

/**
 * Angaben zum Betreiber für Impressum und Datenschutzerklärung.
 * Leere Felder erscheinen auf der Website als „[bitte ergänzen]“.
 */
export const legalConfig = {
  operatorName: "",
  /** Straße, PLZ und Ort – je Zeile ein Eintrag. */
  address: [] as string[],
  email: "",
  /** Hosting-Anbieter inkl. Anschrift, z. B. „Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA“. */
  hostingProvider: "",
  /** Stand der Datenschutzerklärung. */
  privacyUpdated: "September 2026",
};

/**
 * Buchung der persönlichen Traumdeutung.
 * Solange keine Calendly-URL eingetragen ist, zeigt die Buchungsseite einen
 * Platzhalter. Die WhatsApp-Nummer erscheint nur nach einer Buchung.
 */
export const bookingConfig = {
  /** z. B. "https://calendly.com/dein-name/persoenliche-traumdeutung" */
  calendlyUrl: null as string | null,
  /** Internationales Format ohne +, z. B. "4917612345678" */
  whatsappNumber: null as string | null,
};

export const routes = {
  home: "/",
  dream: "/traum",
  interpretation: "/traum/deutung",
  conversation: "/gespraech",
  demo: "/demo",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;
