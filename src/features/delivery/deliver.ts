import "server-only";

import { AnalysisError } from "@/features/analysis/errors";
import { getAnalysisVault } from "@/features/analysis/vault";
import { getContactRepository } from "@/features/contacts/repository";
import { createMemoryRateLimiter, envNumber } from "@/lib/server/rate-limit";
import { hashIdentifier } from "@/lib/server/seal";
import { NEWSLETTER_CONSENT } from "./consent";
import { getEmailSender } from "./email";
import { renderInterpretationEmail } from "./email/interpretation-email";
import type { DeliveryRequest } from "./schema";

// Kostenlose Zusendungen pro E-Mail-Adresse (gehasht) und Tag.
const perEmailLimiter = createMemoryRateLimiter({
  windowMs: 24 * 60 * 60 * 1000,
  max: envNumber("DELIVERY_LIMIT_PER_EMAIL", 3),
});

/**
 * Stellt die vollständige Deutung per E-Mail zu.
 * Die Deutung stammt ausschließlich aus dem serverseitigen Speicher (Vault) –
 * der Browser liefert nur die Referenz und die E-Mail-Adresse.
 */
export async function deliverInterpretation(
  request: DeliveryRequest,
  context: { ip: string },
): Promise<void> {
  const stored = await getAnalysisVault().get(request.analysisRef);
  if (!stored) throw new AnalysisError("expired");

  const emailHash = hashIdentifier(request.email);
  if (!perEmailLimiter.consume(emailHash)) {
    throw new AnalysisError("email_limit");
  }

  const message = renderInterpretationEmail({
    to: request.email,
    dream: stored.dream,
    interpretation: stored.interpretation,
    siteUrl: process.env.APP_URL?.trim() || undefined,
  });

  await getEmailSender().send({
    ...message,
    // Gleiche Deutung an gleiche Adresse → kein doppelter Versand.
    idempotencyKey: hashIdentifier(
      `${request.email}:${stored.createdAt}`,
    ).slice(0, 64),
  });

  const now = new Date().toISOString();
  const contacts = getContactRepository();
  await contacts.recordDelivery({
    email: request.email,
    analysisCreatedAt: stored.createdAt,
    deliveredAt: now,
  });

  // Newsletter-Einwilligung nur, wenn ausdrücklich angehakt – getrennt vom Versand.
  if (request.newsletterConsent) {
    await contacts.recordNewsletterConsent({
      email: request.email,
      status: "pending_confirmation",
      consentText: NEWSLETTER_CONSENT.text,
      consentVersion: NEWSLETTER_CONSENT.version,
      source: "dream-interpretation-form",
      requestedAt: now,
      ipHash: hashIdentifier(context.ip),
    });
    // TODO Double-Opt-In: Bestätigungs-E-Mail mit Link versenden und den
    // Status erst nach Klick auf „confirmed“ setzen.
  }
}
