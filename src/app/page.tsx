import { Hero } from "@/components/home/Hero";
import { Perspectives } from "@/components/home/Perspectives";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Perspectives />
    </PageShell>
  );
}
