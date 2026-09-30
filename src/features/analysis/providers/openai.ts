import "server-only";

import OpenAI, {
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
} from "openai";
import { AnalysisError } from "../errors";
import type { AIProvider, StructuredGenerationRequest } from "./types";

const DEFAULT_MODEL = "gpt-5.4-mini";
const REASONING_EFFORTS = ["minimal", "low", "medium", "high"] as const;
type ReasoningEffort = (typeof REASONING_EFFORTS)[number];

function readReasoningEffort(): ReasoningEffort | undefined {
  const value = process.env.OPENAI_REASONING_EFFORT?.trim();
  return REASONING_EFFORTS.find((effort) => effort === value);
}

export function createOpenAIProvider(): AIProvider {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new AnalysisError("not_configured", {
      cause: new Error("OPENAI_API_KEY ist nicht gesetzt."),
    });
  }

  const client = new OpenAI({ apiKey, timeout: 90_000, maxRetries: 1 });
  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
  const reasoningEffort = readReasoningEffort();

  return {
    id: `openai:${model}`,

    async generateStructured({
      system,
      user,
      schemaName,
      jsonSchema,
      signal,
    }: StructuredGenerationRequest) {
      let response: OpenAI.Responses.Response;
      try {
        response = await client.responses.create(
          {
            model,
            instructions: system,
            input: user,
            text: {
              format: {
                type: "json_schema",
                name: schemaName,
                schema: jsonSchema,
                strict: true,
              },
            },
            max_output_tokens: 8000,
            // Träume sind persönlich – nicht bei OpenAI speichern lassen.
            store: false,
            ...(reasoningEffort && { reasoning: { effort: reasoningEffort } }),
          },
          { signal },
        );
      } catch (error) {
        throw mapOpenAIError(error);
      }

      const refusal = response.output
        .flatMap((item) => (item.type === "message" ? item.content : []))
        .find((part) => part.type === "refusal");
      if (refusal) {
        throw new AnalysisError("refused", { cause: refusal.refusal });
      }

      if (response.status === "incomplete") {
        throw new AnalysisError("invalid_output", {
          cause: new Error(
            `Antwort unvollständig: ${response.incomplete_details?.reason ?? "unbekannt"}`,
          ),
        });
      }

      try {
        return JSON.parse(response.output_text) as unknown;
      } catch (error) {
        throw new AnalysisError("invalid_output", { cause: error });
      }
    },
  };
}

function mapOpenAIError(error: unknown): AnalysisError {
  if (error instanceof APIUserAbortError) {
    return new AnalysisError("timeout", { cause: error });
  }
  if (error instanceof APIConnectionTimeoutError) {
    return new AnalysisError("timeout", { cause: error });
  }
  if (error instanceof APIError) {
    if (error.status === 401 || error.status === 403) {
      return new AnalysisError("not_configured", { cause: error });
    }
    if (error.status === 429) {
      return new AnalysisError("rate_limited", { cause: error });
    }
    if (error.status === 400 || error.status === 404) {
      // Meist falscher Modellname oder nicht unterstützter Parameter.
      return new AnalysisError("not_configured", { cause: error });
    }
    return new AnalysisError("unavailable", { cause: error });
  }
  return new AnalysisError("unavailable", { cause: error });
}
