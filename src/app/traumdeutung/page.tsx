import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/features/symbols/components/Breadcrumbs";
import { DreamToolCta } from "@/features/symbols/components/DreamToolCta";
import { SymbolGrid } from "@/features/symbols/components/SymbolGrid";
import { DREAM_SYMBOLS } from "@/features/symbols/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { routes } from "@/lib/site";

const TITLE = "Traumdeutung: Traumsymbole und ihre Bedeutung";
const DESCRIPTION =
  "Traumsymbole und ihre Bedeutung: Was heißt es, wenn Zähne ausfallen, man fällt, verfolgt wird oder von Schlangen träumt? Mögliche Deutungen.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: routes.symbols },
  openGraph: { title: TITLE, description: DESCRIPTION, url: routes.symbols },
};

const TIPS = [
  {
    title: "Mit dem Gefühl beginnen",
    text: "Wie hat sich der Traum angefühlt – und wie ging es dir beim Aufwachen? Gefühle sind oft der direkteste Zugang zur Bedeutung.",
  },
  {
    title: "Den ganzen Traum betrachten",
    text: "Ein Symbol allein sagt wenig. Erst im Zusammenhang mit Ort, Handlung und Ende des Traums ergibt sich ein stimmiges Bild.",
  },
  {
    title: "Die eigene Bedeutung ernst nehmen",
    text: "Was ein Bild für dich bedeutet, wiegt schwerer als jedes Lexikon. Eine Schlange kann für den einen Gefahr, für die andere Wandlung sein.",
  },
];

const sorted = [...DREAM_SYMBOLS].sort((a, b) =>
  a.name.localeCompare(b.name, "de"),
);

export default function SymbolsIndexPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", path: routes.home },
          { name: "Traumdeutung", path: routes.symbols },
        ])}
      />
      <div className="mx-auto w-full max-w-5xl px-5 pt-10 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
        <Breadcrumbs
          items={[
            { name: "Startseite", path: routes.home },
            { name: "Traumdeutung" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <h1 className="font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 sm:text-5xl">
            Traumdeutung: Traumsymbole und ihre Bedeutung
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-moon-300">
            Manche Träume lassen uns nicht los: Zähne, die ausfallen, ein Sturz
            ins Leere, eine Schlange, ein Mensch, der nicht mehr da ist. Hier
            findest du mögliche Bedeutungen häufiger Traumsymbole – aus
            psychologischer, symbolischer und traditioneller Sicht. Nicht als
            feste Wahrheit, sondern als Anregung, deinen eigenen Traum besser zu
            verstehen.
          </p>
        </header>

        <section aria-labelledby="symbols-heading" className="mt-14">
          <h2
            id="symbols-heading"
            className="mb-6 font-serif text-2xl font-light text-moon-50 sm:text-3xl"
          >
            Häufige Traumsymbole
          </h2>
          <SymbolGrid symbols={sorted} />
        </section>

        <section aria-labelledby="tips-heading" className="mt-20">
          <h2
            id="tips-heading"
            className="font-serif text-2xl font-light text-moon-50 sm:text-3xl"
          >
            So deutest du deine Träume
          </h2>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-moon-50/10 ring-1 ring-moon-50/10 sm:grid-cols-3">
            {TIPS.map((tip, i) => (
              <li
                key={tip.title}
                className="bg-night-900/80 p-6 backdrop-blur-sm"
              >
                <span className="font-serif text-sm text-glow-300/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-lg text-moon-50">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-moon-400">
                  {tip.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mx-auto mt-20 max-w-2xl">
          <DreamToolCta />
        </div>
      </div>
    </PageShell>
  );
}
