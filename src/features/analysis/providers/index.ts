import "server-only";

import { AnalysisError } from "../errors";
import { createMockProvider } from "./mock";
import { createOpenAIProvider } from "./openai";
import type { AIProvider } from "./types";

const PROVIDERS: Record<string, () => AIProvider> = {
  openai: createOpenAIProvider,
  mock: createMockProvider,
};

/** Wählt den KI-Anbieter über AI_PROVIDER (Standard: openai). */
export function getAIProvider(): AIProvider {
  const id = process.env.AI_PROVIDER?.trim().toLowerCase() || "openai";
  const create = PROVIDERS[id];
  if (!create) {
    throw new AnalysisError("not_configured", {
      cause: new Error(`Unbekannter AI_PROVIDER: "${id}"`),
    });
  }
  return create();
}
