import { DREAM_SYMBOLS, getSymbol } from "@/features/symbols/data";
import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Traumdeutung";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return DREAM_SYMBOLS.map((symbol) => ({ slug: symbol.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symbol = getSymbol(slug);
  return renderOgImage({
    eyebrow: "Traumdeutung",
    title: symbol ? `${symbol.name} im Traum` : "Traumsymbole",
    subtitle: symbol?.teaser ?? "Mögliche Bedeutungen häufiger Traumsymbole.",
  });
}
