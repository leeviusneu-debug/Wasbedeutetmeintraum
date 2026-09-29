import type { ReactNode } from "react";
import { Starfield } from "@/components/ui/Starfield";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-dvh flex-1 flex-col overflow-hidden">
      <Starfield />
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
