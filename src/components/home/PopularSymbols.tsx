import Link from "next/link";
import { SymbolGrid } from "@/features/symbols/components/SymbolGrid";
import { DREAM_SYMBOLS } from "@/features/symbols/data";
import { routes } from "@/lib/site";

const HIGHLIGHTS = [
  "zaehne-ausfallen",
  "fallen",
  "verfolgt-werden",
  "schlange",
  "ex-partner",
  "tod-sterben",
];

export function PopularSymbols() {
  const symbols = HIGHLIGHTS.map((slug) =>
    DREAM_SYMBOLS.find((symbol) => symbol.slug === slug),
  ).filter((symbol) => symbol !== undefined);

  return (
    <section
      aria-labelledby="popular-heading"
      className="mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Traumsymbole
        </p>
        <h2
          id="popular-heading"
          className="mt-5 font-serif text-3xl leading-tight font-light text-balance text-moon-50 sm:text-4xl"
        >
          Häufige Träume und ihre Bedeutung
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-moon-300">
          Manche Traumbilder kennen fast alle. Was sie bedeuten können – und
          warum es dabei immer auch auf dich ankommt.
        </p>
      </div>
      <div className="mt-10">
        <SymbolGrid symbols={symbols} />
      </div>
      <div className="mt-8 text-center">
        <Link
          href={routes.symbols}
          className="text-sm text-glow-300/90 underline decoration-glow-300/30 underline-offset-4 hover:text-glow-300"
        >
          Alle Traumsymbole ansehen
        </Link>
      </div>
    </section>
  );
}
