import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/features/symbols/components/Breadcrumbs";
import { DreamToolCta } from "@/features/symbols/components/DreamToolCta";
import { SymbolGrid } from "@/features/symbols/components/SymbolGrid";
import {
  DREAM_SYMBOLS,
  getRelatedSymbols,
  getSymbol,
  symbolPath,
} from "@/features/symbols/data";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { routes } from "@/lib/site";

/** Stand der Inhalte – bei Überarbeitungen anpassen. */
const CONTENT_UPDATED = "2026-10-11";

export const dynamicParams = false;

export function generateStaticParams() {
  return DREAM_SYMBOLS.map((symbol) => ({ slug: symbol.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/traumdeutung/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const symbol = getSymbol(slug);
  if (!symbol) return {};
  const path = symbolPath(symbol.slug);
  return {
    // Ohne Markenzusatz, damit der Titel in Suchergebnissen nicht abgeschnitten wird.
    title: { absolute: symbol.title },
    description: symbol.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: symbol.title,
      description: symbol.description,
      url: path,
    },
  };
}

export default async function SymbolPage({
  params,
}: PageProps<"/traumdeutung/[slug]">) {
  const { slug } = await params;
  const symbol = getSymbol(slug);
  if (!symbol) notFound();

  const path = symbolPath(symbol.slug);
  const related = getRelatedSymbols(symbol);

  return (
    <PageShell>
      <JsonLd
        data={[
          articleJsonLd({
            title: symbol.title,
            description: symbol.description,
            path,
            dateModified: CONTENT_UPDATED,
          }),
          breadcrumbJsonLd([
            { name: "Startseite", path: routes.home },
            { name: "Traumdeutung", path: routes.symbols },
            { name: symbol.name, path },
          ]),
        ]}
      />
      <article className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
        <Breadcrumbs
          items={[
            { name: "Startseite", path: routes.home },
            { name: "Traumdeutung", path: routes.symbols },
            { name: symbol.name },
          ]}
        />

        <header className="mt-8">
          <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
            Traumdeutung
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 sm:text-5xl">
            {symbol.name} im Traum: Was bedeutet das?
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-pretty text-moon-300">
            {symbol.intro.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </header>

        <section aria-labelledby="meanings-heading" className="mt-14">
          <h2
            id="meanings-heading"
            className="font-serif text-2xl font-light text-moon-50 sm:text-3xl"
          >
            Mögliche Bedeutungen
          </h2>
          <div className="mt-6 space-y-3">
            {symbol.meanings.map((meaning) => (
              <section
                key={meaning.title}
                className="rounded-2xl bg-night-900/60 p-5 ring-1 ring-moon-50/10 backdrop-blur-sm sm:p-6"
              >
                <h3 className="font-serif text-lg text-moon-50">
                  {meaning.title}
                </h3>
                <p className="mt-2 leading-relaxed text-pretty text-moon-300">
                  {meaning.text}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="variants-heading" className="mt-14">
          <h2
            id="variants-heading"
            className="font-serif text-2xl font-light text-moon-50 sm:text-3xl"
          >
            Typische Varianten des Traums
          </h2>
          <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {symbol.variants.map((variant) => (
              <div key={variant.title}>
                <dt className="flex items-center gap-2.5 font-serif text-lg text-moon-50">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow-300"
                  />
                  {variant.title}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-pretty text-moon-300">
                  {variant.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="questions-heading"
          className="mt-14 rounded-3xl bg-gradient-to-br from-dusk-500/15 via-night-900/60 to-night-900/40 p-6 ring-1 ring-dusk-400/20 sm:p-8"
        >
          <h2
            id="questions-heading"
            className="font-serif text-2xl font-light text-moon-50"
          >
            Fragen, die dir bei der Deutung helfen
          </h2>
          <ul className="mt-5 space-y-3">
            {symbol.questions.map((question) => (
              <li
                key={question}
                className="flex gap-3 leading-relaxed text-pretty text-moon-100"
              >
                <span aria-hidden="true" className="text-glow-300">
                  ✦
                </span>
                {question}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-sm leading-relaxed text-pretty text-moon-400">
          Traumsymbole bedeuten nicht für jeden Menschen dasselbe. Die hier
          beschriebenen Bedeutungen sind Anregungen zur Selbstreflexion – keine
          Tatsachen, keine Vorhersagen und kein Ersatz für psychologische oder
          medizinische Beratung.
        </p>

        <div className="mt-14">
          <DreamToolCta
            title={`Du hast von „${symbol.name}“ geträumt?`}
            text="Erzähl deinen ganzen Traum und beantworte ein paar Fragen – dann erhältst du eine Deutung, die sich auf genau deinen Traum und deine Situation bezieht. Kostenlos, anonym und in wenigen Minuten."
          />
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16">
            <h2
              id="related-heading"
              className="mb-6 font-serif text-2xl font-light text-moon-50"
            >
              Verwandte Traumsymbole
            </h2>
            <SymbolGrid symbols={related} />
          </section>
        )}
      </article>
    </PageShell>
  );
}
