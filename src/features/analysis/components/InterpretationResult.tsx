import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";
import type { DreamInterpretation } from "../schema";

type InterpretationResultProps = {
  interpretation: DreamInterpretation;
  actions?: ReactNode;
};

/** Gestaffeltes, ruhiges Einblenden der Abschnitte. */
function reveal(order: number, className = "") {
  return {
    className: `animate-fade-up ${className}`,
    style: { animationDelay: `${150 + order * 140}ms` } as CSSProperties,
  };
}

export function InterpretationResult({
  interpretation,
  actions,
}: InterpretationResultProps) {
  const {
    summary,
    observations,
    psychological,
    keyInsight,
    symbolic,
    mystical,
    bridge,
    careNote,
  } = interpretation;

  return (
    <article className="flex flex-col">
      <header {...reveal(0)}>
        <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Deine Traumdeutung
        </p>
        <h1 className="sr-only">Deine Traumdeutung</h1>
        <p className="mt-6 font-serif text-2xl leading-snug font-light text-pretty text-moon-50 sm:text-[1.9rem]">
          {summary}
        </p>
      </header>

      {careNote && (
        <aside
          {...reveal(
            1,
            "mt-10 rounded-2xl bg-moon-50/5 p-5 text-[0.95rem] leading-relaxed text-moon-100 ring-1 ring-moon-50/15",
          )}
        >
          {careNote}
        </aside>
      )}

      <Section title="Was in deinem Traum auffällt" order={1}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {observations.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl bg-night-900/60 p-5 ring-1 ring-moon-50/10 backdrop-blur-sm"
            >
              <p className="flex items-center gap-2.5 font-serif text-lg text-moon-50">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow-300 shadow-[0_0_10px_2px_rgb(241_212_155/0.45)]"
                />
                {item.title}
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-moon-300">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Eine mögliche psychologische Perspektive" order={2}>
        <Paragraphs items={psychological} />
      </Section>

      <figure {...reveal(3, "mt-14 text-center")}>
        <Divider />
        <figcaption className="mt-8 text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Ein Gedanke, der bleibt
        </figcaption>
        <blockquote className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug font-light text-balance text-glow-300 sm:text-[1.7rem]">
          {keyInsight}
        </blockquote>
        <Divider className="mt-8" />
      </figure>

      <Section title="Die symbolische Ebene" order={4}>
        <Paragraphs items={symbolic} />
      </Section>

      <Section
        title="Wenn du auch die mystische Seite betrachten möchtest"
        order={5}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dusk-500/15 via-night-900/60 to-night-900/40 p-6 ring-1 ring-dusk-400/20 sm:p-8">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-dusk-400/20 blur-3xl"
          />
          <div className="relative">
            <Paragraphs items={mystical} />
          </div>
        </div>
      </Section>

      <section {...reveal(6, "mt-16")}>
        <h2 className="sr-only">Die persönliche Ebene</h2>
        <p className="border-l border-glow-300/40 pl-5 font-serif text-xl leading-relaxed text-pretty text-moon-100 sm:text-[1.35rem]">
          {bridge}
        </p>
        <PersonalDeepening />
      </section>

      {actions && <div {...reveal(7, "mt-16")}>{actions}</div>}

      <p
        {...reveal(
          7,
          "mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-pretty text-moon-400",
        )}
      >
        Diese Deutung ist eine Einladung zur Selbstreflexion – keine
        Tatsachenbehauptung und kein Ersatz für psychologische oder medizinische
        Beratung.
      </p>
    </article>
  );
}

/** Der ruhige Übergang zur persönlichen Vertiefung. */
function PersonalDeepening() {
  return (
    <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/80 to-night-900/80 px-5 py-10 text-center ring-1 ring-glow-300/20 backdrop-blur-sm sm:px-10 sm:py-12">
      <span
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-glow-300/10 blur-3xl"
      />
      <div className="relative">
        <p className="font-serif text-2xl leading-snug font-light text-balance text-glow-300 sm:text-3xl">
          Genau hier beginnt die persönliche Ebene.
        </p>
        <ButtonLink
          href={routes.conversation}
          className="mt-8 w-full max-w-xs sm:w-auto"
        >
          Traum persönlich vertiefen
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty text-moon-300">
          Deine Deutung macht mögliche Zusammenhänge und Bedeutungen sichtbar.
          Was davon zu deinem Leben passt, zeigt sich oft erst im persönlichen
          Gespräch.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  order,
  children,
}: {
  title: string;
  order: number;
  children: ReactNode;
}) {
  return (
    <section {...reveal(order, "mt-14")}>
      <h2 className="mb-5 font-serif text-2xl font-light text-moon-50 sm:text-[1.7rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-[1.05rem] leading-relaxed text-pretty text-moon-100 sm:text-lg">
      {items.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-auto block h-px w-16 bg-gradient-to-r from-transparent via-glow-300/60 to-transparent ${className}`}
    />
  );
}
