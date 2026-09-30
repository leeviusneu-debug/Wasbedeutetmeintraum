import type { CSSProperties, ReactNode } from "react";
import type { InterpretationPreview } from "../schema";

type InterpretationResultProps = {
  preview: InterpretationPreview;
  /** Wird nach dem sichtbaren Teil eingeblendet (z. B. E-Mail-Angebot). */
  continuation: ReactNode;
  actions: ReactNode;
};

/** Gestaffeltes, ruhiges Einblenden der Abschnitte. */
function reveal(order: number, className = "") {
  return {
    className: `animate-fade-up ${className}`,
    style: { animationDelay: `${150 + order * 140}ms` } as CSSProperties,
  };
}

export function InterpretationResult({
  preview,
  continuation,
  actions,
}: InterpretationResultProps) {
  const { summary, observations, psychological, keyInsight, careNote } =
    preview;

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
        <div className="space-y-4 text-[1.05rem] leading-relaxed text-pretty text-moon-100 sm:text-lg">
          {psychological.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </Section>

      <figure {...reveal(3, "mt-14 text-center")}>
        <span
          aria-hidden="true"
          className="mx-auto block h-px w-16 bg-gradient-to-r from-transparent via-glow-300/60 to-transparent"
        />
        <figcaption className="mt-8 text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Ein Gedanke, der bleibt
        </figcaption>
        <blockquote className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug font-light text-balance text-glow-300 sm:text-[1.7rem]">
          {keyInsight}
        </blockquote>
        <span
          aria-hidden="true"
          className="mx-auto mt-8 block h-px w-16 bg-gradient-to-r from-transparent via-glow-300/60 to-transparent"
        />
      </figure>

      <div {...reveal(4, "mt-16")}>{continuation}</div>

      <div {...reveal(5, "mt-14")}>
        {actions}
        <p className="mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-pretty text-moon-400">
          Diese Deutung ist eine Einladung zur Selbstreflexion – keine
          Tatsachenbehauptung und kein Ersatz für psychologische oder
          medizinische Beratung.
        </p>
      </div>
    </article>
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
