import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";

const FOCUS = [
  {
    title: "Deine Lebenssituation",
    text: "Was gerade in deinem Leben passiert, fließt in die Deutung ein – dort, wo es für dich stimmig ist.",
  },
  {
    title: "Die Bedeutung deiner Bilder",
    text: "Welche Erinnerungen, Menschen und Gefühle verbindest du mit dem, was du geträumt hast?",
  },
  {
    title: "Was bleibt",
    text: "Gemeinsam schauen wir, was dein Traum dir für das, was dich gerade bewegt, mitgeben kann.",
  },
];

/**
 * Platzhalter für das spätere Gesprächsangebot.
 * Dauer, Preis, Kalender und Zahlung werden in `BOOKING_DETAILS` bzw. im
 * Buchungsbereich ergänzt, sobald die Buchung umgesetzt ist.
 */
const BOOKING_DETAILS = [
  { label: "Gesprächsdauer", value: null },
  { label: "Preis", value: null },
] as const;

type ConversationOfferProps = {
  /** Statt des Links zurück zu /traum/deutung (z. B. in der Demo). */
  onBack?: () => void;
};

/** Inhalt der Gesprächsseite – genutzt unter /gespraech und in der Demo. */
export function ConversationOffer({ onBack }: ConversationOfferProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-14 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <header className="text-center">
        <p className="animate-fade-up text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Persönliches Gespräch
        </p>
        <h1 className="mx-auto mt-6 max-w-2xl animate-fade-up font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 [animation-delay:120ms] sm:text-5xl md:text-6xl">
          Dein Traum ist persönlich. Deine Deutung auch.
        </h1>
        <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-pretty text-moon-300 [animation-delay:240ms] sm:text-xl">
          Die Deutung kann mögliche Zusammenhänge sichtbar machen. Im
          persönlichen Gespräch geht es darum, deinen Traum mit dem zu
          verbinden, was dich gerade wirklich beschäftigt.
        </p>
      </header>

      <section
        aria-labelledby="focus-heading"
        className="mt-20 animate-fade-up [animation-delay:360ms]"
      >
        <h2
          id="focus-heading"
          className="text-center font-serif text-2xl font-light text-moon-50 sm:text-3xl"
        >
          Worum es im Gespräch geht
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-moon-50/10 ring-1 ring-moon-50/10 sm:grid-cols-3">
          {FOCUS.map((item) => (
            <li
              key={item.title}
              className="bg-night-900/80 p-6 backdrop-blur-sm sm:p-7"
            >
              <h3 className="font-serif text-lg text-moon-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-moon-400">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="booking-heading"
        className="relative mt-16 animate-fade-up overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/80 to-night-900/80 p-6 ring-1 ring-glow-300/20 backdrop-blur-sm [animation-delay:480ms] sm:p-10"
      >
        <span
          aria-hidden="true"
          className="absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-glow-300/10 blur-3xl"
        />
        <div className="relative">
          <h2
            id="booking-heading"
            className="font-serif text-2xl font-light text-moon-50 sm:text-3xl"
          >
            Dein Termin
          </h2>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {BOOKING_DETAILS.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl bg-night-950/50 p-5 ring-1 ring-moon-50/10"
              >
                <dt className="text-[0.7rem] font-medium tracking-[0.2em] text-moon-400 uppercase">
                  {detail.label}
                </dt>
                <dd className="mt-2 font-serif text-lg text-moon-300">
                  {detail.value ?? "Folgt in Kürze"}
                </dd>
              </div>
            ))}
          </dl>

          {/* Platzhalter: Kalender */}
          <div className="mt-3 rounded-2xl border border-dashed border-moon-50/15 bg-night-950/30 p-5">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] text-moon-400 uppercase">
              Termin wählen
            </p>
            <div
              aria-hidden="true"
              className="mt-4 grid grid-cols-7 gap-1.5 opacity-40"
            >
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className="aspect-square rounded-lg bg-moon-50/5 ring-1 ring-moon-50/10"
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-moon-400">
              Der Kalender wird hier in Kürze verfügbar sein.
            </p>
          </div>

          {/* Platzhalter: Zahlung */}
          <div className="mt-3 rounded-2xl border border-dashed border-moon-50/15 bg-night-950/30 p-5">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] text-moon-400 uppercase">
              Zahlung
            </p>
            <p className="mt-2 text-sm text-moon-400">
              Die sichere Online-Zahlung folgt gemeinsam mit der Terminbuchung.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <span
              aria-disabled="true"
              className="inline-flex min-h-14 w-full max-w-xs cursor-not-allowed items-center justify-center rounded-full bg-moon-50/5 px-6 text-[0.95rem] font-medium tracking-wide text-moon-400 ring-1 ring-moon-50/15 sm:w-auto sm:px-8"
            >
              Buchung bald möglich
            </span>
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-center">
        {onBack ? (
          <Button variant="quiet" onClick={onBack}>
            <ArrowLeftIcon />
            Zurück zu meiner Deutung
          </Button>
        ) : (
          <ButtonLink href={routes.interpretation} variant="quiet">
            <ArrowLeftIcon />
            Zurück zu meiner Deutung
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
