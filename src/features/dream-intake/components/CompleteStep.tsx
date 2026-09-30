import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";

type CompleteStepProps = {
  onEdit: () => void;
  onRestart: () => void;
  /** Statt des Links zu /traum/deutung (z. B. in der Demo). */
  onInterpret?: () => void;
};

export function CompleteStep({
  onEdit,
  onRestart,
  onInterpret,
}: CompleteStepProps) {
  const interpretLabel = (
    <>
      Meinen Traum deuten
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  return (
    <div className="flex flex-col items-center text-center">
      <div
        aria-hidden="true"
        className="relative mb-10 flex h-20 w-20 items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full bg-glow-300/15 blur-xl" />
        <span className="absolute inset-3 rounded-full ring-1 ring-glow-300/30" />
        <span className="h-2 w-2 rounded-full bg-glow-300 shadow-[0_0_18px_4px_rgb(241_212_155/0.6)]" />
      </div>

      <h1
        tabIndex={-1}
        className="font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 outline-none sm:text-5xl"
      >
        Danke. Ich habe jetzt ein besseres Bild.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-moon-300">
        Aus deinen Antworten können wir verschiedene Perspektiven auf deinen
        Traum betrachten – psychologisch, symbolisch und auch aus traditioneller
        spiritueller Sicht.
      </p>

      {onInterpret ? (
        <Button
          onClick={onInterpret}
          className="mt-10 w-full max-w-xs sm:w-auto"
        >
          {interpretLabel}
        </Button>
      ) : (
        <ButtonLink
          href={routes.interpretation}
          className="mt-10 w-full max-w-xs sm:w-auto"
        >
          {interpretLabel}
        </ButtonLink>
      )}

      <div className="mt-6 flex flex-col items-center sm:flex-row sm:gap-2">
        <Button variant="quiet" onClick={onEdit}>
          Antworten ändern
        </Button>
        <span aria-hidden="true" className="hidden text-moon-400/50 sm:inline">
          ·
        </span>
        <Button variant="quiet" onClick={onRestart}>
          Neuen Traum erzählen
        </Button>
      </div>
    </div>
  );
}
