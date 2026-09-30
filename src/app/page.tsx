import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Perspectives } from "@/components/home/Perspectives";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <HowItWorks />
      <Perspectives />
    </PageShell>
  );
}
