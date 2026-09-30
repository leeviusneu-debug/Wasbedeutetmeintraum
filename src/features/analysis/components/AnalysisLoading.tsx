"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Wir schauen genauer hin …",
  "Gefühle und Stimmungen werden betrachtet …",
  "Die Bilder deines Traums kommen zusammen …",
  "Der rote Faden wird sichtbar …",
  "Deine Antworten fließen mit ein …",
  "Deine persönliche Deutung entsteht …",
];

type AnalysisLoadingProps = {
  /** Wechselintervall der Texte in Millisekunden. */
  interval?: number;
};

export function AnalysisLoading({ interval = 4200 }: AnalysisLoadingProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => Math.min(i + 1, MESSAGES.length - 1)),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [interval]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <Orb />

      <h1 className="sr-only">Deine Traumdeutung entsteht</h1>
      <p
        key={index}
        className="mt-12 min-h-16 animate-step-in font-serif text-2xl font-light text-balance text-moon-50 sm:text-3xl"
      >
        {MESSAGES[index]}
      </p>
      <p className="mt-4 max-w-xs text-sm text-pretty text-moon-400">
        Nimm dir einen Moment. Dein Traum wird aus verschiedenen Perspektiven
        betrachtet.
      </p>
    </div>
  );
}

function Orb() {
  return (
    <div aria-hidden="true" className="relative h-40 w-40">
      <span className="absolute inset-0 animate-breathe rounded-full bg-glow-300/15 blur-2xl" />
      <span className="absolute inset-0 animate-orbit rounded-full border border-dashed border-moon-50/15" />
      <span className="absolute inset-5 animate-orbit-reverse rounded-full border border-glow-300/20">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-glow-300 shadow-[0_0_12px_3px_rgb(241_212_155/0.6)]" />
      </span>
      <span className="absolute inset-12 animate-orbit rounded-full border border-dusk-400/30">
        <span className="absolute top-1/2 -right-0.5 h-1 w-1 -translate-y-1/2 rounded-full bg-moon-50/80" />
      </span>
      <span className="absolute inset-0 m-auto h-3 w-3 animate-breathe rounded-full bg-glow-300 shadow-[0_0_24px_8px_rgb(241_212_155/0.45)]" />
    </div>
  );
}
