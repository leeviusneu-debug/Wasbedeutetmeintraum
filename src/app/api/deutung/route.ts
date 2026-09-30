import { analyzeDream } from "@/features/analysis/analyze";
import type { AnalysisApiResponse } from "@/features/analysis/contract";
import { AnalysisError } from "@/features/analysis/errors";
import { errorResponse, noStoreJson, toAnalysisError } from "@/lib/server/api";
import {
  clientIp,
  createMemoryRateLimiter,
  envNumber,
} from "@/lib/server/rate-limit";

// Die Deutung kann dauern – Plattformen dürfen die Funktion länger laufen lassen.
export const maxDuration = 120;

const MAX_BODY_BYTES = 64 * 1024;

// Schutz vor Mehrfachaufrufen und hohen API-Kosten (Deutungen pro IP).
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
    const body: unknown = await request.json().catch(() => null);
    const interpretation = await analyzeDream(body, {
      signal: request.signal,
    });
    return noStoreJson<AnalysisApiResponse>({ interpretation });
  } catch (error) {
    return errorResponse(toAnalysisError(error, "deutung"));
  }
}
