import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";
import { PERSONAL_READING } from "../offer";

type OfferInvitationProps = {
  /** Statt des Links zur Buchungsseite (z. B. in der Demo). */
  onRequest?: () => void;
};

/** Ruhiger Übergang nach der Deutung – eine Einladung, kein Verkauf. */
export function OfferInvitation({ onRequest }: OfferInvitationProps) {
  const label = (
    <>
      Persönliche Analyse anfragen
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const buttonClass = "mt-8 w-full sm:w-auto";

  return (
    <section aria-labelledby="offer-heading" className="text-center">
      <span
        aria-hidden="true"
        className="mx-auto block h-px w-16 bg-gradient-to-r from-transparent via-glow-300/60 to-transparent"
      />
      <h2
        id="offer-heading"
        className="mx-auto mt-10 max-w-xl font-serif text-3xl leading-tight font-light text-balance text-moon-50 sm:text-4xl"
      >
        Möchtest du deinen Traum noch tiefer persönlich betrachten?
      </h2>
      <div className="mx-auto mt-6 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-pretty text-moon-300">
        <p>
          Ein Traum kann Bilder und Gefühle sichtbar machen. Welche Bedeutung
          sie für dich persönlich haben, zeigt sich oft erst im Zusammenhang mit
          deiner aktuellen Lebenssituation, deinen Erfahrungen und dem, was dich
          gerade beschäftigt.
        </p>
        <p>
          Wenn du das Gefühl hast, dass in deinem Traum noch mehr steckt, kannst
          du ihn in einer persönlichen Analyse gemeinsam vertiefen.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/90 to-night-900/90 px-6 py-10 ring-1 ring-glow-300/25 backdrop-blur-sm sm:px-10">
        <span
          aria-hidden="true"
          className="absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-glow-300/10 blur-3xl"
        />
        <div className="relative">
          <p className="text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase">
            Persönliche Analyse
          </p>
          <p className="mt-4 font-serif text-2xl font-light text-moon-50 sm:text-3xl">
            {PERSONAL_READING.name}
          </p>
          <p className="mt-3 text-moon-300">
            {PERSONAL_READING.durationLabel}
            <span aria-hidden="true" className="mx-2 text-glow-400/60">
              ·
            </span>
            {PERSONAL_READING.priceLabel}
          </p>
          {onRequest ? (
            <Button
              onClick={onRequest}
              className={buttonClass}
              data-cta="offer"
            >
              {label}
            </Button>
          ) : (
            <ButtonLink
              href={routes.conversation}
              className={buttonClass}
              data-cta="offer"
            >
              {label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
