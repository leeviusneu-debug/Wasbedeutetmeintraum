import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { bookingConfig, routes } from "@/lib/site";
import { BOOKING_STEPS, PERSONAL_READING } from "../offer";

type BookingPageProps = {
  /** Statt des Links zurück zu /traum/deutung (z. B. in der Demo). */
  onBack?: () => void;
};

/** Buchungsseite der persönlichen Traumdeutung – genutzt unter /gespraech und in der Demo. */
export function BookingPage({ onBack }: BookingPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-14 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <header className="text-center">
        <p className="animate-fade-up text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
          Persönliche Analyse
        </p>
        <h1 className="mt-6 animate-fade-up font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 [animation-delay:120ms] sm:text-5xl md:text-6xl">
          {PERSONAL_READING.name}
        </h1>
        <ul className="mt-7 flex animate-fade-up flex-wrap justify-center gap-2.5 [animation-delay:200ms]">
          {[PERSONAL_READING.durationLabel, PERSONAL_READING.priceLabel].map(
            (item) => (
              <li
                key={item}
                className="rounded-full bg-glow-300/10 px-4 py-1.5 text-sm text-glow-300 ring-1 ring-glow-300/30"
              >
                {item}
              </li>
            ),
          )}
        </ul>
        <p className="mx-auto mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-pretty text-moon-300 [animation-delay:280ms] sm:text-xl">
          In der persönlichen Analyse verbinden wir deinen Traum mit dem, was
          dich gerade wirklich beschäftigt. Deine Lebenssituation, Erfahrungen,
          Gefühle und die Bilder deines Traums werden gemeinsam betrachtet.
        </p>
      </header>

      <section
        aria-labelledby="steps-heading"
        className="mt-16 animate-fade-up [animation-delay:360ms]"
      >
        <h2 id="steps-heading" className="sr-only">
          So läuft die Buchung ab
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-moon-50/10 ring-1 ring-moon-50/10 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKING_STEPS.map((step, i) => (
            <li
              key={step.id}
              className="bg-night-900/80 p-5 backdrop-blur-sm sm:p-6"
            >
              <span className="font-serif text-sm text-glow-300/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-lg text-moon-50">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-moon-400">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="booking-heading"
        className="relative mt-10 animate-fade-up overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/80 to-night-900/80 p-6 ring-1 ring-glow-300/20 backdrop-blur-sm [animation-delay:440ms] sm:p-10"
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
            Termin auswählen
          </h2>

          {bookingConfig.calendlyUrl ? (
            <iframe
              title="Termin auswählen"
              src={`${bookingConfig.calendlyUrl}?hide_gdpr_banner=1&background_color=0b0d1a&text_color=ece4d4&primary_color=e6bd72`}
              className="mt-6 h-[720px] w-full rounded-2xl bg-night-950"
            />
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-moon-50/15 bg-night-950/30 p-5 sm:p-6">
              <div aria-hidden="true" className="grid grid-cols-7 gap-1.5">
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                  <span
                    key={day}
                    className="pb-1 text-center text-[0.65rem] tracking-wider text-moon-400/70 uppercase"
                  >
                    {day}
                  </span>
                ))}
                {Array.from({ length: 21 }, (_, i) => (
                  <span
                    key={i}
                    className={`aspect-square rounded-lg ring-1 ${
                      [3, 5, 9, 11, 16].includes(i)
                        ? "bg-glow-300/10 ring-glow-300/25"
                        : "bg-moon-50/[0.03] ring-moon-50/10"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-5 text-sm text-moon-400">
                Die Terminauswahl wird hier in Kürze freigeschaltet.
              </p>
            </div>
          )}

          <p className="mt-5 text-sm leading-relaxed text-pretty text-moon-300">
            Bei der Terminbuchung beantwortest du vorab einige Fragen zu dir und
            deinem Traum. So kann ich mich gezielt auf unser Gespräch
            vorbereiten.
          </p>
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
