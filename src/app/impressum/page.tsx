import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Impressum",
  // Rechtstexte nicht in Suchergebnissen anzeigen, Links aber folgen.
  robots: { index: false, follow: true },
};

// TODO: Pflichtangaben nach § 5 DDG ergänzen.
export default function ImprintPage() {
  return (
    <SimplePage title="Impressum">
      <p>Die Angaben gemäß § 5 DDG werden in Kürze ergänzt.</p>
    </SimplePage>
  );
}
