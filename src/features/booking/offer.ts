/**
 * Das einzige kostenpflichtige Angebot – an einer Stelle gepflegt und überall
 * (Deutung, Buchungsseite, Demo) gleich angezeigt.
 */
export const PERSONAL_READING = {
  name: "Persönliche Traumdeutung",
  durationLabel: "Bis zu 60 Minuten",
  /** Preis in Euro (brutto). Bei Änderung auch Stripe/Calendly anpassen. */
  priceEur: 149,
  priceLabel: "149 €",
} as const;

/**
 * Geplanter Buchungsablauf (noch nicht umgesetzt):
 *
 *   1. Termin auswählen        → Calendly (bookingConfig.calendlyUrl)
 *   2. Fragen zu dir & Traum   → Einladungsfragen im Calendly-Event
 *   3. Zahlung 149 €           → Stripe (z. B. über die Stripe-Anbindung von
 *                                Calendly oder Stripe Checkout)
 *   4. Termin bestätigt        → Bestätigungsseite mit WhatsApp-Kontakt
 *                                (siehe components/BookingConfirmation.tsx)
 */
export type BookingStep =
  "select-slot" | "questionnaire" | "payment" | "confirmed";

export const BOOKING_STEPS: { id: BookingStep; title: string; text: string }[] =
  [
    {
      id: "select-slot",
      title: "Termin auswählen",
      text: "Du wählst einen Zeitpunkt, der für dich gut passt.",
    },
    {
      id: "questionnaire",
      title: "Ein paar Fragen vorab",
      text: "Zu dir, deiner aktuellen Situation und deinem Traum.",
    },
    {
      id: "payment",
      title: "Sichere Bezahlung",
      text: `${PERSONAL_READING.priceLabel} – bequem online.`,
    },
    {
      id: "confirmed",
      title: "Persönliches Gespräch",
      text: `${PERSONAL_READING.durationLabel}, ganz in Ruhe.`,
    },
  ];
