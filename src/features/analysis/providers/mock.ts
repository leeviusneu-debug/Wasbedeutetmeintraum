import "server-only";

import { DEMO_INTERPRETATION } from "@/features/demo/content";
import type { AIProvider } from "./types";

/**
 * Beispiel-Anbieter für die lokale Entwicklung ohne API-Schlüssel
 * (AI_PROVIDER=mock). Liefert immer die Beispieldeutung aus der Demo.
 */
export function createMockProvider(): AIProvider {
  return {
    id: "mock",
    async generateStructured({ signal }) {
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 2500);
        signal?.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(signal.reason);
        });
      });
      return DEMO_INTERPRETATION;
    },
  };
}
