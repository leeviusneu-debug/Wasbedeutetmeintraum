import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

const links = [
  { href: routes.imprint, label: "Impressum" },
  { href: routes.privacy, label: "Datenschutz" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 pt-10 pb-8 text-xs text-moon-400 sm:flex-row sm:justify-between sm:px-8">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
      <nav aria-label="Rechtliches" className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-moon-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
