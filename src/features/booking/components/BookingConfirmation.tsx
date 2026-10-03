import { bookingConfig } from "@/lib/site";
import { PERSONAL_READING } from "../offer";

/**
 * Bestätigung nach erfolgreicher Buchung und Zahlung – noch nicht eingebunden.
 * Später auf der Erfolgsseite von Stripe/Calendly anzeigen, erst NACH der
 * Zahlung. Der WhatsApp-Kontakt ist bewusst nur hier sichtbar, damit vor dem
 * Kauf keine kostenlosen Beratungen per Chat entstehen.
 */
export function BookingConfirmation() {
  const whatsappUrl = bookingConfig.whatsappNumber
    ? `https://wa.me/${bookingConfig.whatsappNumber}`
    : null;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-20 text-center sm:px-8">
      <h1 className="font-serif text-4xl leading-tight font-light text-balance text-moon-50 sm:text-5xl">
        Dein Termin ist bestätigt.
      </h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-pretty text-moon-300">
        Danke für dein Vertrauen. Ich freue mich auf unsere{" "}
        {PERSONAL_READING.name.toLowerCase()}.
      </p>

      <section className="mt-12 rounded-3xl bg-night-900/60 p-6 text-left ring-1 ring-moon-50/10 sm:p-8">
        <h2 className="font-serif text-2xl font-light text-moon-50">
          Persönlicher WhatsApp-Kontakt
        </h2>
        <p className="mt-3 leading-relaxed text-pretty text-moon-300">
          Nach deiner Buchung kannst du mich bei Bedarf über WhatsApp
          kontaktieren, wenn du vor unserem Gespräch noch etwas ergänzen
          möchtest.
        </p>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center rounded-full px-6 text-sm font-medium text-moon-100 ring-1 ring-moon-50/20 hover:bg-moon-50/5"
          >
            WhatsApp öffnen
          </a>
        )}
      </section>
    </div>
  );
}
