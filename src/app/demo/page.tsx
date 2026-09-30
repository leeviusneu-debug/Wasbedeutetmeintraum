import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DemoFlow } from "@/features/demo/DemoFlow";

export const metadata: Metadata = {
  title: "Traum erzählen",
  robots: { index: false, follow: false },
};

/**
 * Statische Demo für die Video-Aufnahme – ohne Server-Anfrage, immer mit
 * demselben Beispiel-Traum. Drehbuch: siehe src/features/demo/content.ts.
 */
export default function DemoPage() {
  return (
    <PageShell>
      <DemoFlow />
    </PageShell>
  );
}
