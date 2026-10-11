import type { Metadata } from "next";
import { Faq } from "@/components/home/Faq";
import { HOME_FAQ } from "@/components/home/faq";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Leitidee } from "@/components/home/Leitidee";
import { Perspectives } from "@/components/home/Perspectives";
import { PopularSymbols } from "@/components/home/PopularSymbols";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, webApplicationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd
        data={[websiteJsonLd(), webApplicationJsonLd(), faqJsonLd(HOME_FAQ)]}
      />
      <Hero />
      <Leitidee />
      <HowItWorks />
      <PopularSymbols />
      <Perspectives />
      <Faq />
    </PageShell>
  );
}
