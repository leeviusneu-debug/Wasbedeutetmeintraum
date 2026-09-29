import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DreamIntake } from "@/features/dream-intake";

export const metadata: Metadata = {
  title: "Traum erzählen",
  description:
    "Erzähl deinen Traum in deinen eigenen Worten – danach führen dich ein paar ruhige Fragen tiefer hinein.",
};

export default function DreamPage() {
  return (
    <PageShell>
      <DreamIntake />
    </PageShell>
  );
}
