export const siteConfig = {
  name: "Was bedeutet mein Traum?",
  description:
    "Erzähle uns deinen Traum – wir schauen gemeinsam genauer hin. Traumdeutung aus psychologischer, symbolischer und behutsam spiritueller Perspektive.",
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
  conversation: "/gespraech",
  demo: "/demo",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;
