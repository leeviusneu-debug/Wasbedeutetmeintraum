"use client";

import { createLocalStore } from "@/lib/local-store";
import type { DreamSession } from "@/features/dream-intake/types";
import { defaultErrorMessage } from "./errors";
import {
  analysisErrorCodes,
  type AnalysisApiResponse,
  type AnalysisErrorCode,
  type ApiError,
  type DeliveryApiRequest,
  type DeliveryApiResponse,
} from "./contract";
import type { AnalysisRequest, InterpretationPreview } from "./schema";

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

export type PreviewResult = {
  preview: InterpretationPreview;
  analysisRef: string;
  emailOnlySections: string[];
};

async function postJson<T extends object>(
  url: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<Exclude<T, ApiError>> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ClientAnalysisError(
      "unavailable",
      "Keine Verbindung. Bitte prüfe deine Internetverbindung und versuche es noch einmal.",
    );
  }

  const data = (await response.json().catch(() => null)) as T | null;
  if (data && "error" in data) {
    const { code, message } = (data as ApiError).error;
    throw new ClientAnalysisError(
      analysisErrorCodes.includes(code) ? code : "unknown",
      message,
    );
  }
  if (!response.ok || !data) {
    throw new ClientAnalysisError(
      response.status === 504 ? "timeout" : "unknown",
    );
  }
  return data as Exclude<T, ApiError>;
}

export function requestInterpretation(
  request: AnalysisRequest,
  signal?: AbortSignal,
): Promise<PreviewResult> {
  return postJson<AnalysisApiResponse>("/api/deutung", request, signal);
}

/** Die E-Mail-Adresse wird nur an den Server übergeben, nie gespeichert. */
export async function requestDelivery(request: DeliveryApiRequest) {
  await postJson<DeliveryApiResponse>("/api/deutung/zusenden", request);
}

/* ------------------------------------------------------------------ */
/* Lokaler Cache der letzten Vorschau (nie die vollständige Deutung)   */
/* ------------------------------------------------------------------ */

type CachedPreview = {
  version: 2;
  fingerprint: string;
  result: PreviewResult;
  createdAt: string;
  /** Zeitpunkt des Versands – ohne E-Mail-Adresse. */
  deliveredAt?: string;
} | null;

const cache = createLocalStore<CachedPreview>({
  key: "wbmt:interpretation:v2",
  initial: () => null,
  parse: (value) =>
    (value as CachedPreview)?.version === 2 ? (value as CachedPreview) : null,
});

export function savePreview(fingerprintValue: string, result: PreviewResult) {
  try {
    // Frühere Version speicherte die vollständige Deutung lokal – entfernen.
    window.localStorage.removeItem("wbmt:interpretation:v1");
  } catch {}
  cache.set(() => ({
    version: 2,
    fingerprint: fingerprintValue,
    result,
    createdAt: new Date().toISOString(),
  }));
}

export function markDelivered(fingerprintValue: string) {
  cache.set((current) =>
    current?.fingerprint === fingerprintValue
      ? { ...current, deliveredAt: new Date().toISOString() }
      : current,
  );
}

/** Nach Ablauf der Referenz: Vorschau verwerfen, damit neu gedeutet wird. */
export function clearPreview() {
  cache.set(() => null);
}

/**
 * Zuletzt gespeicherte Vorschau (oder `null`). Ob der Browser-Speicher schon
 * geladen ist, zeigt `useDreamSession()` – beide Stores laden gleichzeitig.
 */
export const useCachedPreview = cache.useValue;
