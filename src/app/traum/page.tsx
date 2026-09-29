import type { Metadata } from "next";
import { SimplePage } from "@/components/layout/SimplePage";

export const metadata: Metadata = {
  title: "Traum erzählen",
};

// Platzhalter – hier entsteht als Nächstes die Traumabfrage (src/features/dream-intake).
export default function DreamPage() {
  return (
    <SimplePage title="Traum erzählen">
      <p>
        Hier kannst du uns bald deinen Traum erzählen. Wir arbeiten gerade daran
        – schau gern bald wieder vorbei.
      </p>
    </SimplePage>
  );
}
