export const siteConfig = {
  name: "Was bedeutet mein Traum?",
  description:
    "Erzähle uns deinen Traum – wir schauen gemeinsam genauer hin. Traumdeutung aus psychologischer, symbolischer und behutsam spiritueller Perspektive.",
  locale: "de_DE",
} as const;

export const routes = {
  home: "/",
  dream: "/traum",
  interpretation: "/traum/deutung",
  imprint: "/impressum",
  privacy: "/datenschutz",
} as const;
