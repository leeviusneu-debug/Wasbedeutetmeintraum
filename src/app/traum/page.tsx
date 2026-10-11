import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DreamIntake } from "@/features/dream-intake";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Traum deuten – kostenlos und anonym",
  description:
    "Traum online deuten: Erzähl deinen Traum, beantworte ein paar Fragen und erhalte eine persönliche Traumdeutung – kostenlos, anonym, ohne Anmeldung.",
  alternates: { canonical: routes.dream },
};

export default function DreamPage() {
  return (
    <PageShell>
      <DreamIntake />
    </PageShell>
  );
}
