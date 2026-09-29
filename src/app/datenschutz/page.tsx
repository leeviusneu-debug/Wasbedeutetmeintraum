import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Datenschutz",
};

// TODO: Datenschutzerklärung nach DSGVO ergänzen.
export default function PrivacyPage() {
  return (
    <SimplePage title="Datenschutz">
      <p>Die Datenschutzerklärung wird in Kürze ergänzt.</p>
    </SimplePage>
  );
}
