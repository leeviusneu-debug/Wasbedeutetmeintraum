import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";

/** Verweis von Inhaltsseiten auf die persönliche Traumdeutung. */
export function DreamToolCta({
  title = "Was bedeutet dein Traum?",
  text = "Allgemeine Bedeutungen sind nur ein Anfang. Erzähl deinen Traum und beantworte ein paar Fragen – dann erhältst du eine Deutung, die sich auf genau deinen Traum bezieht. Kostenlos, anonym und in wenigen Minuten.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <aside className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/90 to-night-900/90 px-6 py-10 text-center ring-1 ring-glow-300/25 backdrop-blur-sm sm:px-10">
      <span
        aria-hidden="true"
        className="absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-glow-300/10 blur-3xl"
      />
      <div className="relative">
        <p className="font-serif text-2xl font-light text-balance text-moon-50 sm:text-3xl">
          {title}
        </p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-pretty text-moon-300">
          {text}
        </p>
        <ButtonLink href={routes.dream} className="mt-8 w-full sm:w-auto">
          Traum erzählen
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </div>
    </aside>
  );
}
