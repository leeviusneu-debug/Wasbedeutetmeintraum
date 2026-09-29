"use client";

import { useSyncExternalStore } from "react";
import type { DreamSession } from "./types";

/**
 * Speichert die Traumabfrage vorerst nur lokal im Browser (localStorage).
 * Später kann dieser Store durch eine serverseitige Speicherung ersetzt werden,
 * ohne dass sich die Komponenten ändern müssen.
 */

const STORAGE_KEY = "wbmt:dream-session:v1";

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

let cache: DreamSession | undefined;
const listeners = new Set<() => void>();

function load(): DreamSession {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DreamSession;
      if (parsed?.version === 1) return parsed;
    }
  } catch {
    // Privater Modus oder blockierter Speicher – mit leerer Sitzung starten.
  }
  return createEmptySession();
}

function getSnapshot(): DreamSession {
  cache ??= load();
  return cache;
}

function getServerSnapshot(): null {
  return null;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Änderungen aus anderen Tabs übernehmen.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = undefined;
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function updateDreamSession(
  updater: (session: DreamSession) => DreamSession,
) {
  cache = { ...updater(getSnapshot()), updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Speichern nicht möglich – die Sitzung bleibt im Arbeitsspeicher erhalten.
  }
  emit();
}

export function resetDreamSession() {
  updateDreamSession(() => createEmptySession());
}

/** Liefert `null`, solange die Sitzung noch nicht im Browser geladen ist. */
export function useDreamSession(): DreamSession | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
