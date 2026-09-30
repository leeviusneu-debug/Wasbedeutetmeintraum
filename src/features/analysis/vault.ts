import "server-only";

import { seal, unseal } from "@/lib/server/seal";
import { dreamInterpretationSchema, type DreamInterpretation } from "./schema";

/**
 * Bewahrt die vollständige Deutung serverseitig auf, bis sie per E-Mail
 * zugestellt wird. Der Browser erhält nur eine undurchsichtige Referenz.
 *
 * Aktuelle Umsetzung ohne Datenbank: Die Referenz ist die verschlüsselte
 * Deutung selbst (siehe `seal`). Mit einer Datenbank wird daraus später eine
 * zufällige ID – die Schnittstelle bleibt gleich.
 */
export type StoredAnalysis = {
  dream: string;
  interpretation: DreamInterpretation;
  createdAt: string;
};

export interface AnalysisVault {
  put(analysis: StoredAnalysis): Promise<string>;
  get(reference: string): Promise<StoredAnalysis | null>;
}

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_REFERENCE_LENGTH = 40_000;

const sealedVault: AnalysisVault = {
  async put(analysis) {
    return seal({ v: 1, ...analysis });
  },

  async get(reference) {
    if (reference.length > MAX_REFERENCE_LENGTH) return null;
    const data = unseal(reference) as (StoredAnalysis & { v: number }) | null;
    if (!data || data.v !== 1) return null;

    const age = Date.now() - Date.parse(data.createdAt);
    if (!(age >= 0 && age < MAX_AGE_MS)) return null;

    const interpretation = dreamInterpretationSchema.safeParse(
      data.interpretation,
    );
    if (!interpretation.success || typeof data.dream !== "string") return null;

    return {
      dream: data.dream,
      interpretation: interpretation.data,
      createdAt: data.createdAt,
    };
  },
};

export function getAnalysisVault(): AnalysisVault {
  return sealedVault;
}
