import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/site";
import { PageShell } from "./PageShell";

type SimplePageProps = {
  title: string;
  children: ReactNode;
};

/** Einfache Inhaltsseite, z. B. für Platzhalter und Rechtstexte. */
export function SimplePage({ title, children }: SimplePageProps) {
  return (
    <PageShell>
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <h1 className="font-serif text-4xl font-light text-moon-50 sm:text-5xl">
          {title}
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-moon-300">
          {children}
        </div>
        <ButtonLink href={routes.home} variant="ghost" className="mt-10">
          Zur Startseite
        </ButtonLink>
      </section>
    </PageShell>
  );
}
