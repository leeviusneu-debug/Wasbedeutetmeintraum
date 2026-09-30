import { analyzeDream } from "@/features/analysis/analyze";
import type { AnalysisApiResponse } from "@/features/analysis/contract";
import { AnalysisError } from "@/features/analysis/errors";
import { prepareDream } from "@/features/analysis/prepare";
import {
  analysisRequestSchema,
  EMAIL_ONLY_SECTIONS,
  toPreview,
} from "@/features/analysis/schema";
import { getAnalysisVault } from "@/features/analysis/vault";
import { errorResponse, noStoreJson, toAnalysisError } from "@/lib/server/api";
import {
  clientIp,
  createMemoryRateLimiter,
  envNumber,
} from "@/lib/server/rate-limit";

// KI-Antworten können dauern – Plattformen dürfen die Funktion länger laufen lassen.
export const maxDuration = 120;

const MAX_BODY_BYTES = 64 * 1024;

// Schutz vor Mehrfachaufrufen und hohen API-Kosten (kostenlose Deutungen pro IP).
const limiter = createMemoryRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: envNumber("ANALYSIS_RATE_LIMIT", 6),
});

export async function POST(request: Request) {
  if (!limiter.consume(clientIp(request))) {
    return errorResponse(new AnalysisError("rate_limited"));
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return errorResponse(new AnalysisError("invalid_input"));
  }

  try {
    const parsed = analysisRequestSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!parsed.success) {
      throw new AnalysisError("invalid_input", { cause: parsed.error });
    }

    const interpretation = await analyzeDream(parsed.data, {
      signal: request.signal,
    });

    // Die vollständige Deutung bleibt serverseitig (verschlüsselt referenziert);
    // an den Browser geht nur die Vorschau.
    const analysisRef = await getAnalysisVault().put({
      dream: prepareDream(parsed.data).dream,
      interpretation,
      createdAt: new Date().toISOString(),
    });

    return noStoreJson<AnalysisApiResponse>({
      preview: toPreview(interpretation),
      analysisRef,
      emailOnlySections: [...EMAIL_ONLY_SECTIONS],
    });
  } catch (error) {
    return errorResponse(toAnalysisError(error, "deutung"));
  }
}
