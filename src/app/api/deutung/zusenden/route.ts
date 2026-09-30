import type { DeliveryApiResponse } from "@/features/analysis/contract";
import { AnalysisError } from "@/features/analysis/errors";
import { deliverInterpretation } from "@/features/delivery/deliver";
import { deliveryRequestSchema } from "@/features/delivery/schema";
import { errorResponse, noStoreJson, toAnalysisError } from "@/lib/server/api";
import {
  clientIp,
  createMemoryRateLimiter,
  envNumber,
} from "@/lib/server/rate-limit";

const MAX_BODY_BYTES = 64 * 1024;

const limiter = createMemoryRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: envNumber("DELIVERY_RATE_LIMIT", 5),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!limiter.consume(ip)) {
    return errorResponse(new AnalysisError("rate_limited"));
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return errorResponse(new AnalysisError("invalid_input"));
  }

  try {
    const parsed = deliveryRequestSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!parsed.success) {
      const emailInvalid = parsed.error.issues.some(
        (issue) => issue.path[0] === "email",
      );
      throw new AnalysisError(
        emailInvalid ? "invalid_email" : "invalid_input",
        {
          cause: new Error(
            parsed.error.issues.map((i) => i.path.join(".")).join(", "),
          ),
        },
      );
    }

    await deliverInterpretation(parsed.data, { ip });
    return noStoreJson<DeliveryApiResponse>({ status: "sent" });
  } catch (error) {
    return errorResponse(toAnalysisError(error, "zusenden"));
  }
}
