import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Fehler 404
        </p>
        <h1 className="mt-5 font-serif text-4xl font-light text-balance text-moon-50 sm:text-5xl">
          Diese Seite hat sich im Traum verloren.
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-pretty text-moon-300">
          Vielleicht findest du, wonach du suchst, in unseren{" "}
          <Link
            href={routes.symbols}
            className="text-moon-100 underline decoration-moon-400/40 underline-offset-2"
          >
            Traumsymbolen
          </Link>
          – oder du lässt direkt deinen eigenen Traum deuten.
        </p>
        <ButtonLink href={routes.dream} className="mt-10">
          Traum erzählen
        </ButtonLink>
      </section>
    </PageShell>
  );
}
