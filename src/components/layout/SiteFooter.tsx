import Link from "next/link";
import { DREAM_SYMBOLS, symbolPath } from "@/features/symbols/data";
import { routes, siteConfig } from "@/lib/site";

const mainLinks = [
  { href: routes.dream, label: "Traum deuten" },
  { href: routes.symbols, label: "Traumsymbole" },
];

const legalLinks = [
  { href: routes.imprint, label: "Impressum" },
  { href: routes.privacy, label: "Datenschutz" },
];

const linkClass = "transition-colors hover:text-moon-100";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-16 pb-8 text-xs text-moon-400 sm:px-8">
      <nav
        aria-label="Traumsymbole"
        className="border-t border-moon-50/10 pt-8"
      >
        <p className="mb-3 text-[0.65rem] tracking-[0.2em] text-moon-400/80 uppercase">
          Traumdeutung von A bis Z
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {DREAM_SYMBOLS.map((symbol) => (
            <li key={symbol.slug}>
              <Link href={symbolPath(symbol.slug)} className={linkClass}>
                {symbol.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav
          aria-label="Weitere Seiten"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {[...mainLinks, ...legalLinks].map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
