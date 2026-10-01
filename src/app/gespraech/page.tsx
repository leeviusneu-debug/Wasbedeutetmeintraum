import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ConversationOffer } from "@/features/conversation/ConversationOffer";

export const metadata: Metadata = {
  title: "Persönliches Gespräch",
  description:
    "Dein Traum ist persönlich. Deine Deutung auch. Verbinde deinen Traum im persönlichen Gespräch mit dem, was dich gerade wirklich beschäftigt.",
};

export default function ConversationPage() {
  return (
    <PageShell>
      <ConversationOffer />
    </PageShell>
  );
}
