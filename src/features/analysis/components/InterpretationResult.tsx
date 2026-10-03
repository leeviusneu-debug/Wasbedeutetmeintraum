import type { CSSProperties, ReactNode } from "react";
import { OfferInvitation } from "@/features/booking/components/OfferInvitation";
import type { DreamInterpretation } from "../schema";

type InterpretationResultProps = {
  interpretation: DreamInterpretation;
  actions?: ReactNode;
  /** Statt des Links zur Buchungsseite (z. B. in der Demo). */
  onRequestOffer?: () => void;
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
  onRequestOffer,
}: InterpretationResultProps) {
  const {
    summary,
    observations,
    thread,
    psychological,
    keyInsight,
    symbolic,
    mystical,
    reflection,
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

      <Section title="Der rote Faden" order={2}>
        <p className="border-l border-glow-300/40 pl-5 font-serif text-xl leading-relaxed text-pretty text-moon-100 sm:text-[1.35rem]">
          {thread}
        </p>
      </Section>

      <Section title="Eine mögliche psychologische Perspektive" order={3}>
        <Paragraphs items={psychological} />
      </Section>

      <figure {...reveal(4, "mt-14 text-center")}>
        <Divider />
        <figcaption className="mt-8 text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Ein Gedanke, der bleibt
        </figcaption>
        <blockquote className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug font-light text-balance text-glow-300 sm:text-[1.7rem]">
          {keyInsight}
        </blockquote>
        <Divider className="mt-8" />
      </figure>

      <Section title="Die symbolische Ebene" order={5}>
        <Paragraphs items={symbolic} />
      </Section>

      <Section
        title="Wenn du auch die mystische Seite betrachten möchtest"
        order={6}
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

      <section {...reveal(7, "mt-16")}>
        <div className="rounded-3xl bg-night-900/60 px-6 py-10 text-center ring-1 ring-moon-50/10 backdrop-blur-sm sm:px-10">
          <h2 className="font-serif text-xl text-moon-300 italic">
            Ein Impuls für dich
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-2xl leading-snug font-light text-balance text-glow-300 sm:text-[1.7rem]">
            {reflection}
          </p>
        </div>
      </section>

      <p
        {...reveal(
          8,
          "mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-pretty text-moon-400",
        )}
      >
        Diese Deutung ist eine Einladung zur Selbstreflexion – keine
        Tatsachenbehauptung und kein Ersatz für psychologische oder medizinische
        Beratung.
      </p>

      <div {...reveal(9, "mt-24")}>
        <OfferInvitation onRequest={onRequestOffer} />
      </div>

      {actions && <div {...reveal(10, "mt-16")}>{actions}</div>}
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
