"use client";

import { useId, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, LockIcon } from "@/components/ui/icons";
import { fieldClassName } from "./field-styles";

const MIN_LENGTH = 10;

type StoryStepProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
};

export function StoryStep({
  value,
  onChange,
  onSubmit,
  onFocus,
}: StoryStepProps) {
  const fieldId = useId();
  const hintId = useId();
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
        Erzähl mir deinen Traum.
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
        aria-describedby={hintId}
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
