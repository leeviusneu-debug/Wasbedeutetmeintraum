export type DreamSymbol = {
  /** URL-Teil, z. B. "zaehne-ausfallen" → /traumdeutung/zaehne-ausfallen */
  slug: string;
  /** Anzeigename, z. B. "Zähne ausfallen" */
  name: string;
  /** Seitentitel für Suchmaschinen (ohne Markenzusatz). */
  title: string;
  /** Meta-Beschreibung, ca. 140–160 Zeichen. */
  description: string;
  /** Kurzer Text für Übersichtskarten. */
  teaser: string;
  /** Einleitung (1–2 Absätze). */
  intro: string[];
  /** Mögliche Bedeutungen aus verschiedenen Perspektiven. */
  meanings: { title: string; text: string }[];
  /** Typische Varianten dieses Traums. */
  variants: { title: string; text: string }[];
  /** Fragen, die bei der persönlichen Deutung helfen. */
  questions: string[];
  /** Slugs verwandter Symbole. */
  related: string[];
};
