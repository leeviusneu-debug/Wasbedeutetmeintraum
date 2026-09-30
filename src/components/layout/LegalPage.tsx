import type { ReactNode } from "react";
import { PageShell } from "./PageShell";

/** Layout für längere Rechtstexte (Datenschutz, Impressum). */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <article className="mx-auto w-full max-w-2xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <h1 className="font-serif text-4xl leading-tight font-light text-balance text-moon-50 sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <div className="mt-5 text-lg leading-relaxed text-pretty text-moon-300">
            {intro}
          </div>
        )}
        <div className="mt-12 space-y-12 text-[0.95rem] leading-relaxed text-pretty text-moon-300 [&_a]:text-moon-100 [&_a]:underline [&_a]:decoration-moon-400/40 [&_a]:underline-offset-2 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-moon-50 [&_h3]:mt-6 [&_h3]:font-medium [&_h3]:text-moon-100 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_p]:mt-3 [&_strong]:font-medium [&_strong]:text-moon-100 [&_ul]:mt-3 [&_ul]:space-y-1.5">
          {children}
        </div>
      </article>
    </PageShell>
  );
}

/** Markiert fehlende Pflichtangaben deutlich sichtbar. */
export function Fill({ value }: { value?: string }) {
  return value ? (
    <>{value}</>
  ) : (
    <span className="rounded bg-glow-300/15 px-1 text-glow-300">
      [bitte ergänzen]
    </span>
  );
}
