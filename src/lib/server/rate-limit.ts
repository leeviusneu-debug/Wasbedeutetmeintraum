import "server-only";

/**
 * Einfache Begrenzung im Arbeitsspeicher (gleitendes Zeitfenster).
 *
 * Hinweis: gilt pro Server-Instanz. Bei mehreren Instanzen (z. B. Serverless)
 * durch eine Implementierung mit gemeinsamem Speicher (z. B. Redis, Datenbank)
 * ersetzen – die Schnittstelle `RateLimiter` bleibt gleich.
 */
export interface RateLimiter {
  /** Zählt einen Versuch und gibt `false` zurück, wenn das Limit erreicht ist. */
  consume(key: string): boolean;
}

export function createMemoryRateLimiter(options: {
  windowMs: number;
  max: number;
}): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    consume(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter(
        (t) => now - t < options.windowMs,
      );
      if (recent.length >= options.max) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);

      if (hits.size > 5000) {
        for (const [k, times] of hits) {
          if (times.every((t) => now - t >= options.windowMs)) hits.delete(k);
        }
      }
      return true;
    },
  };
}

export function envNumber(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

/** Client-IP aus den üblichen Proxy-Headern. */
export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
