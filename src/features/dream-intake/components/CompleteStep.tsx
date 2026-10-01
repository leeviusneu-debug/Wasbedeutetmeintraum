"use client";

import Link from "next/link";
import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";
import { PROCESSING_CONSENT } from "../consent";

type CompleteStepProps = {
  onEdit: () => void;
  onRestart: () => void;
  consentGiven: boolean;
  onConsentChange: (checked: boolean) => void;
  /** Einwilligung abfragen (in der Demo ohne Übermittlung aus). */
  requireConsent?: boolean;
  /** Statt des Links zu /traum/deutung (z. B. in der Demo). */
  onInterpret?: () => void;
};

export function CompleteStep({
  onEdit,
  onRestart,
  consentGiven,
  onConsentChange,
  onInterpret,
  requireConsent = true,
}: CompleteStepProps) {
  const consentId = useId();
  const canInterpret = consentGiven || !requireConsent;
  const hintId = useId();
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

      {requireConsent && (
        <div className="mt-10 flex w-full max-w-xl items-start gap-3 rounded-2xl bg-moon-50/[0.03] p-4 text-left ring-1 ring-moon-50/10 sm:p-5">
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
            <input
              id={consentId}
              type="checkbox"
              checked={consentGiven}
              onChange={(event) => onConsentChange(event.target.checked)}
              aria-describedby={canInterpret ? undefined : hintId}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md bg-night-950/60 ring-1 ring-moon-50/25 transition-colors checked:bg-glow-300/90 checked:ring-glow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow-300"
            />
            <CheckIcon className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-night-950 opacity-0 peer-checked:opacity-100" />
          </span>
          <label
            htmlFor={consentId}
            className="cursor-pointer text-xs leading-relaxed text-pretty text-moon-300 sm:text-sm"
          >
            {PROCESSING_CONSENT.text} Mehr dazu in der{" "}
            <Link
              href={routes.privacy}
              className="underline decoration-moon-400/40 underline-offset-2 hover:text-moon-100"
            >
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>
      )}

      {!canInterpret ? (
        <Button disabled className="mt-8 w-full max-w-xs sm:w-auto">
          {interpretLabel}
        </Button>
      ) : onInterpret ? (
        <Button
          onClick={onInterpret}
          className="mt-8 w-full max-w-xs sm:w-auto"
        >
          {interpretLabel}
        </Button>
      ) : (
        <ButtonLink
          href={routes.interpretation}
          className="mt-8 w-full max-w-xs sm:w-auto"
        >
          {interpretLabel}
        </ButtonLink>
      )}
      {!canInterpret && (
        <p id={hintId} className="mt-3 text-xs text-moon-400">
          Bitte bestätige zuerst die Einwilligung.
        </p>
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
