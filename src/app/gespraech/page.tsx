import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Persönliches Gespräch",
};

// Platzhalter – hier entsteht später das Angebot für persönliche Gespräche.
export default function ConversationPage() {
  return (
    <SimplePage title="Persönliches Gespräch">
      <p>
        Manche Träume lassen einen nicht so schnell los. Bald kannst du hier ein
        persönliches Gespräch über deinen Traum vereinbaren – in Ruhe und in
        deinem Tempo.
      </p>
      <p className="text-sm text-moon-400">
        Dieses Angebot befindet sich gerade im Aufbau.
      </p>
    </SimplePage>
  );
}
