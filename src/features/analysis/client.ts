"use client";

import { createLocalStore } from "@/lib/local-store";
import type { DreamSession } from "@/features/dream-intake/types";
import { defaultErrorMessage } from "./errors";
import {
  analysisErrorCodes,
  type AnalysisApiResponse,
  type AnalysisErrorCode,
} from "./contract";
import type { AnalysisRequest, DreamInterpretation } from "./schema";

export class ClientAnalysisError extends Error {
  constructor(
    readonly code: AnalysisErrorCode,
    message = defaultErrorMessage(code),
  ) {
    super(message);
  }
}

/** Nur die Daten, die für die Deutung gebraucht werden. */
export function toAnalysisRequest(session: DreamSession): AnalysisRequest {
  return {
    dream: session.dream,
    flow: session.flow,
    answers: session.answers,
  };
}

/** Stabiler Fingerabdruck, um eine gespeicherte Deutung wiederzuerkennen. */
export function fingerprint(request: AnalysisRequest): string {
  const text = JSON.stringify([request.dream, request.flow, request.answers]);
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (Math.imul(hash, 33) ^ text.charCodeAt(i)) >>> 0;
  }
  return `${hash.toString(36)}-${text.length}`;
}

export async function requestInterpretation(
  request: AnalysisRequest,
  signal?: AbortSignal,
): Promise<DreamInterpretation> {
  let response: Response;
  try {
    response = await fetch("/api/deutung", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ClientAnalysisError(
      "unavailable",
      "Keine Verbindung. Bitte prüfe deine Internetverbindung und versuche es noch einmal.",
    );
  }

  const data = (await response
    .json()
    .catch(() => null)) as AnalysisApiResponse | null;

  if (response.ok && data && "interpretation" in data) {
    return data.interpretation;
  }
  if (data && "error" in data) {
    const code = analysisErrorCodes.includes(data.error.code)
      ? data.error.code
      : "unknown";
    throw new ClientAnalysisError(code, data.error.message);
  }
  throw new ClientAnalysisError(
    response.status === 504 ? "timeout" : "unknown",
  );
}

/* ------------------------------------------------------------------ */
/* Lokaler Cache der letzten Deutung                                   */
/* ------------------------------------------------------------------ */

type CachedInterpretation = {
  version: 1;
  fingerprint: string;
  interpretation: DreamInterpretation;
  createdAt: string;
} | null;

const cache = createLocalStore<CachedInterpretation>({
  key: "wbmt:interpretation:v1",
  initial: () => null,
  parse: (value) =>
    (value as CachedInterpretation)?.version === 1
      ? (value as CachedInterpretation)
      : null,
});

export function saveInterpretation(
  fingerprintValue: string,
  interpretation: DreamInterpretation,
) {
  cache.set(() => ({
    version: 1,
    fingerprint: fingerprintValue,
    interpretation,
    createdAt: new Date().toISOString(),
  }));
}

/**
 * Zuletzt gespeicherte Deutung (oder `null`). Ob der Browser-Speicher schon
 * geladen ist, zeigt `useDreamSession()` – beide Stores laden gleichzeitig.
 */
export const useCachedInterpretation = cache.useValue;
