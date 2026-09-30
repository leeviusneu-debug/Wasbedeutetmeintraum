import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";
import { ExplainerVideo } from "./ExplainerVideo";

const STEPS = [
  {
    title: "Erzähl deinen Traum",
    text: "In deinen eigenen Worten – so, wie du dich an ihn erinnerst.",
  },
  {
    title: "Ein paar ruhige Fragen",
    text: "Zu Gefühlen, Bildern und dem, was dich gerade bewegt.",
  },
  {
    title: "Deine Deutung",
    text: "Psychologische, symbolische und traditionelle Deutungsansätze werden miteinander verbunden.",
  },
  {
    title: "Persönlich vertiefen",
    text: "Was davon zu deinem Leben passt, zeigt sich oft erst im persönlichen Gespräch.",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Wie funktioniert das?
        </p>
        <h2
          id="how-heading"
          className="mt-5 font-serif text-3xl leading-tight font-light text-balance text-moon-50 sm:text-4xl"
        >
          Aus deinen Antworten entsteht eine persönliche Deutung.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-moon-300">
          Manche Träume lassen uns nicht los. Dein Traum wird aus verschiedenen
          Perspektiven betrachtet und gibt dir eine erste Orientierung – was
          davon wirklich zu deinem Leben passt, kannst du anschließend
          persönlich vertiefen.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <ExplainerVideo />
      </div>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-moon-50/10 ring-1 ring-moon-50/10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="bg-night-900/80 p-6 backdrop-blur-sm sm:p-7"
          >
            <span className="font-serif text-sm text-glow-300/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-serif text-lg text-moon-50">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-moon-400">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <ButtonLink href={routes.dream} className="w-full max-w-xs sm:w-auto">
          Traum erzählen
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </ButtonLink>
      </div>
    </section>
  );
}
