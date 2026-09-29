import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Impressum",
};

// TODO: Pflichtangaben nach § 5 DDG ergänzen.
export default function ImprintPage() {
  return (
    <SimplePage title="Impressum">
      <p>Die Angaben gemäß § 5 DDG werden in Kürze ergänzt.</p>
    </SimplePage>
  );
}
