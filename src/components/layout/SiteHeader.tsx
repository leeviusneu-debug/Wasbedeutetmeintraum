import Link from "next/link";
import { routes, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <Link
        href={routes.home}
        className="flex items-center gap-2.5 rounded-full font-serif text-[0.95rem] text-moon-100 transition-colors hover:text-moon-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-300"
      >
        <MoonMark />
        <span>{siteConfig.name}</span>
      </Link>
    </header>
  );
}

function MoonMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-glow-300"
      fill="none"
    >
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
