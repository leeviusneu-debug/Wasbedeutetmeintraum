import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InterpretationView } from "@/features/analysis";

export const metadata: Metadata = {
  title: "Deine Traumdeutung",
  robots: { index: false },
};

export default function InterpretationPage() {
  return (
    <PageShell>
      <InterpretationView />
    </PageShell>
  );
}
