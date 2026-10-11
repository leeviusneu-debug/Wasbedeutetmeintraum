import { jsonLdScript } from "@/lib/seo";

/** Strukturierte Daten für Suchmaschinen (unsichtbar). */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}
