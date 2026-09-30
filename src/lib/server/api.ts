import "server-only";

import type { ApiError } from "@/features/analysis/contract";
import { AnalysisError } from "@/features/analysis/errors";

export function noStoreJson<T>(body: T, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function errorResponse(error: AnalysisError) {
  return noStoreJson<ApiError>(
    { error: { code: error.code, message: error.userMessage } },
    error.status,
  );
}

/**
 * Vereinheitlicht Fehler und protokolliert technische Details –
 * ohne Trauminhalte oder E-Mail-Adressen.
 */
export function toAnalysisError(error: unknown, scope: string): AnalysisError {
  const analysisError =
    error instanceof AnalysisError
      ? error
      : new AnalysisError("unknown", { cause: error });

  console.error(
    `[${scope}] ${analysisError.code}:`,
    analysisError.cause instanceof Error
      ? analysisError.cause.message
      : (analysisError.cause ?? ""),
  );
  return analysisError;
}
