import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Deine Traumdeutung",
};

// Platzhalter – hier entsteht als Nächstes die KI-Deutung (src/features/analysis).
export default function InterpretationPage() {
  return (
    <SimplePage title="Deine Deutung entsteht bald">
      <p>
        Danke für deine Geduld. Die Deutung deines Traums ist der nächste
        Schritt, an dem wir gerade arbeiten. Deine Antworten bleiben bis dahin
        auf diesem Gerät gespeichert.
      </p>
    </SimplePage>
  );
}
