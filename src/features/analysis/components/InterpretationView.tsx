"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowLeftIcon } from "@/components/ui/icons";
import {
  resetDreamSession,
  useDreamSession,
} from "@/features/dream-intake/session-store";
import { routes } from "@/lib/site";
import {
  ClientAnalysisError,
  fingerprint,
  requestInterpretation,
  saveInterpretation,
  toAnalysisRequest,
  useCachedInterpretation,
} from "../client";
import { AnalysisLoading } from "./AnalysisLoading";
import { InterpretationResult } from "./InterpretationResult";

type FailedRequest = { fingerprint: string; error: ClientAnalysisError };

export function InterpretationView() {
  const router = useRouter();
  const session = useDreamSession();
  const cached = useCachedInterpretation();
  const [failed, setFailed] = useState<FailedRequest | null>(null);

  const request = useMemo(
    () =>
      session?.phase === "complete" && session.dream.trim()
        ? toAnalysisRequest(session)
        : null,
    [session],
  );
  const key = request ? fingerprint(request) : null;
  const interpretation =
    key && cached?.fingerprint === key ? cached.interpretation : null;
  const error = key && failed?.fingerprint === key ? failed.error : null;

  // Deutung anfordern, sofern für genau diese Antworten noch keine vorliegt.
  useEffect(() => {
    if (!request || !key || interpretation || error) return;
    const controller = new AbortController();
    requestInterpretation(request, controller.signal)
      .then((result) => saveInterpretation(key, result))
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setFailed({
          fingerprint: key,
          error:
            reason instanceof ClientAnalysisError
              ? reason
              : new ClientAnalysisError("unknown"),
        });
      });
    return () => controller.abort();
  }, [request, key, interpretation, error]);

  function startNewDream() {
    resetDreamSession();
    router.push(routes.dream);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-10 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
      {!session ? (
        <div aria-busy="true" className="min-h-[60vh]" />
      ) : !request ? (
        <NotReady inProgress={session.phase !== "story" || !!session.dream} />
      ) : interpretation ? (
        <InterpretationResult
          interpretation={interpretation}
          actions={
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <Button variant="ghost" onClick={startNewDream}>
                Einen neuen Traum erzählen
              </Button>
              <ButtonLink href={routes.dream} variant="quiet">
                Zurück zu meinen Antworten
              </ButtonLink>
            </div>
          }
        />
      ) : error ? (
        <ErrorState error={error} onRetry={() => setFailed(null)} />
      ) : (
        <AnalysisLoading />
      )}
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: ClientAnalysisError;
  onRetry: () => void;
}) {
  const canRetry = error.code !== "not_configured";
  const editInstead =
    error.code === "invalid_input" || error.code === "refused";

  return (
    <div
      role="alert"
      className="flex min-h-[60vh] animate-step-in flex-col items-center justify-center text-center"
    >
      <div
        aria-hidden="true"
        className="mb-10 h-3 w-3 rounded-full bg-moon-300/60 shadow-[0_0_24px_6px_rgb(201_189_166/0.25)]"
      />
      <h1 className="font-serif text-3xl leading-tight font-light text-balance text-moon-50 sm:text-4xl">
        Hier ist gerade etwas ins Stocken geraten.
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-pretty text-moon-300">
        {error.message}
      </p>
      <p className="mt-2 max-w-md text-sm text-pretty text-moon-400">
        Deine Antworten sind sicher auf diesem Gerät gespeichert.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        {canRetry && !editInstead && (
          <Button onClick={onRetry}>Noch einmal versuchen</Button>
        )}
        {editInstead && (
          <ButtonLink href={routes.dream}>Traum bearbeiten</ButtonLink>
        )}
        <ButtonLink href={routes.dream} variant="quiet">
          <ArrowLeftIcon />
          Zurück zu meinen Antworten
        </ButtonLink>
      </div>
    </div>
  );
}

function NotReady({ inProgress }: { inProgress: boolean }) {
  return (
    <div className="flex min-h-[60vh] animate-step-in flex-col items-center justify-center text-center">
      <h1 className="font-serif text-3xl leading-tight font-light text-balance text-moon-50 sm:text-4xl">
        {inProgress
          ? "Du bist fast so weit."
          : "Hier erscheint bald deine Traumdeutung."}
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-pretty text-moon-300">
        {inProgress
          ? "Beantworte noch die letzten Fragen – dann entsteht deine persönliche Deutung."
          : "Erzähl zuerst deinen Traum. Danach schauen wir gemeinsam genauer hin."}
      </p>
      <ButtonLink href={routes.dream} className="mt-10">
        {inProgress ? "Abfrage fortsetzen" : "Traum erzählen"}
      </ButtonLink>
    </div>
  );
}
