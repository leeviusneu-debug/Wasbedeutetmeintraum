import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { BookingPage } from "@/features/booking/components/BookingPage";
import { PERSONAL_READING } from "@/features/booking/offer";

export const metadata: Metadata = {
  title: PERSONAL_READING.name,
  description: `${PERSONAL_READING.name} im persönlichen Gespräch – ${PERSONAL_READING.durationLabel.toLowerCase()}, ${PERSONAL_READING.priceLabel}. Dein Traum, verbunden mit dem, was dich gerade wirklich beschäftigt.`,
};

export default function BookingRoute() {
  return (
    <PageShell>
      <BookingPage />
    </PageShell>
  );
}
