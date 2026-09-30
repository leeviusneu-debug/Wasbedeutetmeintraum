import "server-only";

/**
 * Einfache Begrenzung pro IP-Adresse im Arbeitsspeicher – schützt vor
 * versehentlichen Mehrfachaufrufen und hohen API-Kosten.
 * Hinweis: gilt pro Server-Instanz. Für mehrere Instanzen (z. B. Serverless)
 * später durch einen gemeinsamen Speicher (z. B. Redis) ersetzen.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = Number(process.env.ANALYSIS_RATE_LIMIT ?? 6);

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Speicher gelegentlich aufräumen.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}
