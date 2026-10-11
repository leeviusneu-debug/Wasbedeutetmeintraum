import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Was bedeutet mein Traum? – Kostenlose Traumdeutung online";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Kostenlose Traumdeutung",
    title: "Was bedeutet mein Traum?",
    subtitle:
      "Erzähle deinen Traum und erhalte eine persönliche Deutung – psychologisch, symbolisch und spirituell.",
  });
}
