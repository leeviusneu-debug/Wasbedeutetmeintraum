"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon, LockIcon } from "@/components/ui/icons";
import {
  ClientAnalysisError,
  requestDelivery,
} from "@/features/analysis/client";
import { routes } from "@/lib/site";
import { DELIVERY_NOTICE, NEWSLETTER_CONSENT } from "../consent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type EmailCaptureProps = {
  analysisRef: string;
  emailOnlySections: string[];
  alreadyDelivered: boolean;
  onDelivered: () => void;
  onExpired: () => void;
};

export function EmailCapture({
  analysisRef,
  emailOnlySections,
  alreadyDelivered,
  onDelivered,
  onExpired,
}: EmailCaptureProps) {
  const emailId = useId();
  const consentId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(!alreadyDelivered);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      await requestDelivery({
        analysisRef,
        email: value,
        newsletterConsent,
      });
      onDelivered();
    } catch (reason) {
      const clientError =
        reason instanceof ClientAnalysisError
          ? reason
          : new ClientAnalysisError("unknown");
      if (clientError.code === "expired") {
        onExpired();
        return;
      }
      setError(clientError.message);
      setPending(false);
    }
  }

  return (
    <section
      aria-labelledby={`${emailId}-title`}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-night-800/80 to-night-900/80 p-5 ring-1 ring-glow-300/20 backdrop-blur-sm sm:p-10"
    >
      <span
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-glow-300/10 blur-3xl"
      />

      <div className="relative">
        <h2
          id={`${emailId}-title`}
          className="font-serif text-2xl leading-snug font-light text-balance text-moon-50 sm:text-3xl"
        >
          Möchtest du die vollständige Deutung lesen?
        </h2>
        <p className="mt-4 leading-relaxed text-pretty text-moon-300">
          Ich habe noch einen weiteren Teil deiner Traumdeutung für dich. Lass
          dir deine vollständige persönliche Analyse kostenlos per E-Mail
          zusenden.
        </p>

        {emailOnlySections.length > 0 && (
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Außerdem enthalten"
          >
            {emailOnlySections.map((section) => (
              <li
                key={section}
                className="rounded-full bg-moon-50/5 px-3.5 py-1.5 text-xs text-moon-300 ring-1 ring-moon-50/10"
              >
                {section}
              </li>
            ))}
          </ul>
        )}

        {!showForm ? (
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl bg-glow-300/5 p-5 ring-1 ring-glow-300/20">
            <p className="flex items-center gap-2 text-moon-100">
              <CheckIcon className="h-4 w-4 text-glow-300" />
              Deine vollständige Deutung ist bereits unterwegs.
            </p>
            <Button
              variant="quiet"
              className="-ml-3"
              onClick={() => setShowForm(true)}
            >
              An eine andere Adresse senden
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="mt-8">
            <label htmlFor={emailId} className="sr-only">
              Deine E-Mail-Adresse
            </label>
            <input
              id={emailId}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              placeholder="Deine E-Mail-Adresse"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={`block min-h-14 w-full rounded-2xl bg-night-950/60 px-5 text-base text-moon-50 ring-1 transition-shadow duration-300 placeholder:text-moon-400/70 focus:shadow-[0_0_40px_-12px_rgb(230_189_114/0.35)] focus:outline-none ${
                error
                  ? "ring-[#e39a8c]/60"
                  : "ring-moon-50/15 hover:ring-moon-50/25 focus:ring-glow-300/50"
              }`}
            />

            <div className="mt-5 flex items-start gap-3">
              <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
                <input
                  id={consentId}
                  type="checkbox"
                  checked={newsletterConsent}
                  onChange={(event) =>
                    setNewsletterConsent(event.target.checked)
                  }
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md bg-night-950/60 ring-1 ring-moon-50/25 transition-colors checked:bg-glow-300/90 checked:ring-glow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow-300"
                />
                <CheckIcon className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-night-950 opacity-0 peer-checked:opacity-100" />
              </span>
              <label
                htmlFor={consentId}
                className="cursor-pointer text-sm leading-relaxed text-pretty text-moon-300"
              >
                {NEWSLETTER_CONSENT.text}{" "}
                <span className="text-moon-400">(optional)</span>
              </label>
            </div>

            {error && (
              <p
                id={errorId}
                role="alert"
                className="mt-4 text-sm text-[#f0b7ab]"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="mt-7 w-full sm:w-auto"
            >
              {pending ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-night-950/30 border-t-night-950"
                  />
                  Wird verschickt …
                </>
              ) : (
                <>
                  Vollständige Deutung erhalten
                  <ArrowRightIcon className="hidden h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 min-[400px]:block" />
                </>
              )}
            </Button>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-pretty text-moon-400">
              <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {DELIVERY_NOTICE} Mehr dazu in der{" "}
                <Link
                  href={routes.privacy}
                  className="underline decoration-moon-400/40 underline-offset-2 hover:text-moon-100"
                >
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
