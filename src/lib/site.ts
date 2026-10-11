export const siteConfig = {
  name: "Was bedeutet mein Traum?",
  /** Öffentliche Adresse – Grundlage für Canonical-URLs, Sitemap und Open Graph. */
  url: "https://wasbedeutetmeintraum.de",
  /** Titel der Startseite in Suchergebnissen. */
  homeTitle: "Was bedeutet mein Traum? Kostenlose Traumdeutung online",
  description:
    "Kostenlose Traumdeutung online: Erzähle deinen Traum, beantworte ein paar Fragen und erhalte eine persönliche Deutung – anonym und ohne Anmeldung.",
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

export const routes = {
  home: "/",
  dream: "/traum",
  interpretation: "/traum/deutung",
  symbols: "/traumdeutung",
  demo: "/demo",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;
