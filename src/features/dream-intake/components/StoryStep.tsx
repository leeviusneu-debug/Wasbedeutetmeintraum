"use client";

import Link from "next/link";
import { useId, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, LockIcon } from "@/components/ui/icons";
import { routes } from "@/lib/site";
import { fieldClassName } from "./field-styles";

const MIN_LENGTH = 10;

type StoryStepProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
  /** Überschrift (Standard: „Erzähl mir deinen Traum.“). */
  title?: string;
  /** Hinweis zur Verarbeitung anzeigen (in der Demo ohne Übermittlung aus). */
  showProcessingNotice?: boolean;
};

export function StoryStep({
  value,
  onChange,
  onSubmit,
  onFocus,
  title = "Erzähl mir deinen Traum.",
  showProcessingNotice = true,
}: StoryStepProps) {
  const fieldId = useId();
  const hintId = useId();
  const noticeId = useId();
  const canSubmit = value.trim().length >= MIN_LENGTH;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (canSubmit) onSubmit();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (canSubmit) onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1
        tabIndex={-1}
        className="font-serif text-4xl leading-tight font-light tracking-tight text-balance text-moon-50 outline-none sm:text-5xl"
      >
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-pretty text-moon-300">
        Schreib einfach auf, woran du dich erinnerst. Du musst dich nicht an
        jedes Detail erinnern.
      </p>

      <label htmlFor={fieldId} className="sr-only">
        Dein Traum
      </label>
      <textarea
        id={fieldId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder="Ich habe geträumt, dass …"
        aria-describedby={
          showProcessingNotice ? `${hintId} ${noticeId}` : hintId
        }
        rows={8}
        className={`${fieldClassName} mt-8 min-h-56 font-serif text-lg sm:min-h-64 sm:text-xl`}
      />

      <div
        id={hintId}
        className="mt-3 flex items-center justify-between gap-4 text-xs text-moon-400"
      >
        <span className="flex items-center gap-1.5">
          <LockIcon />
          Anonym – ohne Anmeldung, ohne Konto.
        </span>
        <span className="hidden sm:inline">Strg + Enter zum Fortfahren</span>
      </div>

      {showProcessingNotice && (
        <p
          id={noticeId}
          className="mt-4 rounded-2xl bg-moon-50/[0.03] px-4 py-3.5 text-xs leading-relaxed text-pretty text-moon-400 ring-1 ring-moon-50/10"
        >
          <span className="text-moon-300">Hinweis:</span> Deine Traumdeutung
          wird automatisiert mithilfe künstlicher Intelligenz (KI) erstellt.
          Dafür werden dein Traum und deine Antworten an unseren Dienstleister
          OpenAI übermittelt. Bitte nenne keine vollständigen Namen oder andere
          Angaben, durch die du oder andere Personen erkennbar werden. Mehr dazu
          in der{" "}
          <Link
            href={routes.privacy}
            className="underline decoration-moon-400/40 underline-offset-2 hover:text-moon-100"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={!canSubmit}
          className="w-full sm:w-auto"
        >
          Weiter
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
      {!canSubmit && value.trim().length > 0 && (
        <p className="mt-3 text-center text-sm text-moon-400 sm:text-right">
          Ein, zwei Sätze reichen schon.
        </p>
      )}
    </form>
  );
}
