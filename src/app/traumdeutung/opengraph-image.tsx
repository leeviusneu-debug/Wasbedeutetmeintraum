import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Traumdeutung: Traumsymbole und ihre Bedeutung";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Traumdeutung",
    title: "Traumsymbole und ihre Bedeutung",
    subtitle:
      "Zähne ausfallen, fallen, verfolgt werden, Schlangen – was häufige Träume bedeuten können.",
  });
}
