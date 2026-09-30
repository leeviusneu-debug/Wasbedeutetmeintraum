import "server-only";

/**
 * Speichert, wer eine Deutung angefordert hat und wer (getrennt davon)
 * in den Newsletter eingewilligt hat.
 *
 * Aktuell nur im Arbeitsspeicher – geht bei jedem Neustart verloren.
 * Vor dem Livegang durch eine Datenbank oder die Kontaktliste des
 * E-Mail-Dienstes ersetzen; die Schnittstelle bleibt gleich.
 */

export type DeliveryRecord = {
  email: string;
  analysisCreatedAt: string;
  deliveredAt: string;
};

export type NewsletterConsentStatus =
  /** Einwilligung erteilt, Bestätigungs-E-Mail (Double-Opt-In) steht aus. */
  "pending_confirmation" | "confirmed" | "revoked";

export type NewsletterConsentRecord = {
  email: string;
  status: NewsletterConsentStatus;
  /** Exakter Wortlaut und Version, denen zugestimmt wurde (Nachweis). */
  consentText: string;
  consentVersion: string;
  source: "dream-interpretation-form";
  requestedAt: string;
  /** Gehashte IP als Nachweis, ohne die Adresse selbst zu speichern. */
  ipHash: string;
  confirmedAt?: string;
};

export interface ContactRepository {
  recordDelivery(record: DeliveryRecord): Promise<void>;
  /**
   * Legt eine Newsletter-Einwilligung an. Erst nach Bestätigung per
   * Double-Opt-In (`confirmed`) dürfen Newsletter verschickt werden.
   */
  recordNewsletterConsent(record: NewsletterConsentRecord): Promise<void>;
}

function createMemoryContactRepository(): ContactRepository {
  const deliveries: DeliveryRecord[] = [];
  const consents = new Map<string, NewsletterConsentRecord>();

  return {
    async recordDelivery(record) {
      deliveries.push(record);
      if (deliveries.length > 10_000) deliveries.shift();
    },
    async recordNewsletterConsent(record) {
      // Eine bereits bestätigte Einwilligung nicht zurücksetzen.
      if (consents.get(record.email)?.status === "confirmed") return;
      consents.set(record.email, record);
    },
  };
}

const repository = createMemoryContactRepository();

export function getContactRepository(): ContactRepository {
  return repository;
}
