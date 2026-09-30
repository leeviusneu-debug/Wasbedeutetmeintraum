/**
 * Gemeinsame Schnittstelle aller KI-Anbieter.
 * Ein neuer Anbieter (z. B. Anthropic, Mistral, lokal) implementiert nur
 * `generateStructured` und wird in `./index.ts` registriert.
 */
export type StructuredGenerationRequest = {
  system: string;
  user: string;
  /** Name und JSON-Schema der erwarteten Ausgabe. */
  schemaName: string;
  jsonSchema: Record<string, unknown>;
  signal?: AbortSignal;
};

export interface AIProvider {
  readonly id: string;
  /**
   * Liefert die (noch ungeprüfte) JSON-Antwort des Modells.
   * Fehler werden als `AnalysisError` geworfen.
   */
  generateStructured(request: StructuredGenerationRequest): Promise<unknown>;
}
