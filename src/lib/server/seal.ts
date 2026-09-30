import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";

/**
 * Verschlüsselt Daten so, dass sie gefahrlos beim Client zwischengelagert
 * werden können: Der Browser kann sie weder lesen noch verändern
 * (AES-256-GCM, Schlüssel nur auf dem Server).
 */

let devSecret: string | undefined;

function secretKey(): Buffer {
  let secret = process.env.APP_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("APP_SECRET ist nicht gesetzt.");
    }
    // Nur für die Entwicklung: pro Prozess ein zufälliger Schlüssel.
    devSecret ??= randomBytes(32).toString("hex");
    secret = devSecret;
  }
  return createHash("sha256").update(secret).digest();
}

export function seal(data: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", secretKey(), iv);
  const plain = deflateRawSync(Buffer.from(JSON.stringify(data), "utf8"));
  const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

/** Liefert `null`, wenn der Token ungültig, manipuliert oder unlesbar ist. */
export function unseal(token: string): unknown {
  try {
    const buffer = Buffer.from(token, "base64url");
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", secretKey(), iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(inflateRawSync(plain).toString("utf8")) as unknown;
  } catch {
    return null;
  }
}

/** Einweg-Hash, z. B. um E-Mail-Adressen für Limits zu vergleichen. */
export function hashIdentifier(value: string): string {
  return createHash("sha256")
    .update(`${process.env.APP_SECRET ?? ""}:${value}`)
    .digest("hex");
}
