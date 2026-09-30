import { analyzeDream } from "@/features/analysis/analyze";
import { AnalysisError } from "@/features/analysis/errors";
import { checkRateLimit } from "@/features/analysis/rate-limit";
import type { AnalysisApiResponse } from "@/features/analysis/contract";

// KI-Antworten können dauern – Plattformen dürfen die Funktion länger laufen lassen.
export const maxDuration = 120;

const MAX_BODY_BYTES = 64 * 1024;

function json(body: AnalysisApiResponse, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function errorResponse(error: AnalysisError) {
  return json(
    { error: { code: error.code, message: error.userMessage } },
    error.status,
  );
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!checkRateLimit(clientKey(request))) {
    return errorResponse(new AnalysisError("rate_limited"));
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return errorResponse(new AnalysisError("invalid_input"));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(new AnalysisError("invalid_input"));
  }

  try {
    const interpretation = await analyzeDream(body, {
      signal: request.signal,
    });
    return json({ interpretation });
  } catch (error) {
    const analysisError =
      error instanceof AnalysisError
        ? error
        : new AnalysisError("unknown", { cause: error });

    // Technische Details nur ins Server-Log – ohne Trauminhalte.
    console.error(
      `[deutung] ${analysisError.code}:`,
      analysisError.cause instanceof Error
        ? analysisError.cause.message
        : analysisError.cause,
    );
    return errorResponse(analysisError);
  }
}
