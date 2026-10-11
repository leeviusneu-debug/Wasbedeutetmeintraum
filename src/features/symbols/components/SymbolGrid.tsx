import Link from "next/link";
import { symbolPath } from "../data";
import type { DreamSymbol } from "../types";

/** Übersicht von Traumsymbolen als verlinkte Karten. */
export function SymbolGrid({
  symbols,
  headingLevel = "h3",
}: {
  symbols: DreamSymbol[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {symbols.map((symbol) => (
        <li key={symbol.slug}>
          <Link
            href={symbolPath(symbol.slug)}
            className="group flex h-full flex-col rounded-2xl bg-night-900/60 p-5 ring-1 ring-moon-50/10 backdrop-blur-sm transition-all duration-300 hover:bg-night-800/70 hover:ring-glow-300/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow-300"
          >
            <Heading className="flex items-center gap-2.5 font-serif text-lg text-moon-50">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow-300 shadow-[0_0_10px_2px_rgb(241_212_155/0.45)]"
              />
              {symbol.name}
            </Heading>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-moon-400">
              {symbol.teaser}
            </p>
            <span className="mt-4 text-sm text-glow-300/90 transition-colors group-hover:text-glow-300">
              Bedeutung lesen →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
