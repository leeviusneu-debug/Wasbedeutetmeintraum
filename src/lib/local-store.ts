"use client";

import { useSyncExternalStore } from "react";

/**
 * Kleiner, typisierter Store auf Basis von localStorage.
 * Liefert im Server-Rendering `null`, damit es keine Hydration-Fehler gibt,
 * und synchronisiert Änderungen zwischen Tabs.
 */
export function createLocalStore<T>(options: {
  key: string;
  initial: () => T;
  /** Prüft gespeicherte Daten; ungültige Daten werden verworfen. */
  parse: (value: unknown) => T | null;
}) {
  const { key, initial, parse } = options;
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function load(): T {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = parse(JSON.parse(raw));
        if (parsed !== null) return parsed;
      }
    } catch {
      // Privater Modus oder blockierter Speicher – mit Startwert beginnen.
    }
    return initial();
  }

  function get(): T {
    cache ??= load();
    return cache;
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      cache = undefined;
      emit();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function set(updater: (value: T) => T) {
    cache = updater(get());
    try {
      window.localStorage.setItem(key, JSON.stringify(cache));
    } catch {
      // Speichern nicht möglich – der Wert bleibt im Arbeitsspeicher erhalten.
    }
    emit();
  }

  function useValue(): T | null {
    return useSyncExternalStore(subscribe, get, () => null);
  }

  return { get, set, useValue };
}
