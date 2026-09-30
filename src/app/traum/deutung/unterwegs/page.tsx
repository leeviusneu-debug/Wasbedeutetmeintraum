import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Deine Traumdeutung ist unterwegs",
  robots: { index: false },
};

export default function DeliveredPage() {
  return (
    <PageShell>
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <div
          aria-hidden="true"
          className="relative mb-12 flex h-24 w-24 animate-fade-up items-center justify-center"
        >
          <span className="absolute inset-0 animate-breathe rounded-full bg-glow-300/15 blur-2xl" />
          <span className="absolute inset-2 animate-orbit rounded-full border border-dashed border-glow-300/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-glow-300 shadow-[0_0_20px_6px_rgb(241_212_155/0.5)]" />
        </div>

        <h1 className="animate-fade-up font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 [animation-delay:120ms] sm:text-5xl">
          Deine Traumdeutung ist unterwegs. 🌙
        </h1>
        <p className="mt-5 animate-fade-up text-lg text-pretty text-moon-300 [animation-delay:240ms]">
          Schau gleich in deinem Postfach nach.
        </p>
        <p className="mt-2 animate-fade-up text-sm text-pretty text-moon-400 [animation-delay:300ms]">
          Nichts angekommen? Ein Blick in den Spam-Ordner lohnt sich.
        </p>

        <div className="mt-20 w-full animate-fade-up rounded-3xl bg-night-900/60 px-5 py-8 ring-1 ring-moon-50/10 backdrop-blur-sm [animation-delay:480ms] sm:p-10">
          <h2 className="font-serif text-2xl font-light text-moon-50 sm:text-3xl">
            Du möchtest noch tiefer gehen?
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-pretty text-moon-300">
            Wenn dich dein Traum weiter beschäftigt, kannst du deine Gedanken
            auch persönlich mit mir besprechen.
          </p>
          <ButtonLink
            href={routes.conversation}
            className="mt-8 w-full max-w-xs sm:w-auto"
          >
            Persönliches Gespräch entdecken
            <ArrowRightIcon className="hidden h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 min-[400px]:block" />
          </ButtonLink>
        </div>

        <ButtonLink
          href={routes.interpretation}
          variant="quiet"
          className="mt-8"
        >
          Zurück zu meiner Deutung
        </ButtonLink>
      </section>
    </PageShell>
  );
}
