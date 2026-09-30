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

export const routes = {
  home: "/",
  dream: "/traum",
  interpretation: "/traum/deutung",
  conversation: "/gespraech",
  demo: "/demo",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;
