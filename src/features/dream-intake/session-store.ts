"use client";

import { createLocalStore } from "@/lib/local-store";
import type { DreamSession } from "./types";

/**
 * Speichert die Traumabfrage vorerst nur lokal im Browser (localStorage).
 * Später kann dieser Store durch eine serverseitige Speicherung ersetzt werden,
 * ohne dass sich die Komponenten ändern müssen.
 */

export function createEmptySession(): DreamSession {
  return {
    version: 1,
    phase: "story",
    dream: "",
    flow: [],
    step: 0,
    answers: {},
    updatedAt: new Date().toISOString(),
  };
}

const store = createLocalStore<DreamSession>({
  key: "wbmt:dream-session:v1",
  initial: createEmptySession,
  parse: (value) =>
    (value as DreamSession | null)?.version === 1
      ? (value as DreamSession)
      : null,
});

export function updateDreamSession(
  updater: (session: DreamSession) => DreamSession,
) {
  store.set((session) => ({
    ...updater(session),
    updatedAt: new Date().toISOString(),
  }));
}

export function resetDreamSession() {
  store.set(() => createEmptySession());
}

/** Liefert `null`, solange die Sitzung noch nicht im Browser geladen ist. */
export const useDreamSession = store.useValue;
