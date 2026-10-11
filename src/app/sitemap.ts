import type { MetadataRoute } from "next";
import { DREAM_SYMBOLS, symbolPath } from "@/features/symbols/data";
import { absoluteUrl } from "@/lib/seo";
import { routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: absoluteUrl(routes.home),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(routes.dream),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(routes.symbols),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...DREAM_SYMBOLS.map((symbol) => ({
      url: absoluteUrl(symbolPath(symbol.slug)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
