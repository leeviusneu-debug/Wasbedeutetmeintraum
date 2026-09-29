import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost";
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-300";

const variants = {
  primary:
    "min-h-14 px-8 text-base text-night-950 bg-gradient-to-b from-glow-300 to-glow-400 shadow-[0_0_0_1px_rgb(241_212_155/0.4),0_10px_40px_-10px_rgb(230_189_114/0.55)] hover:shadow-[0_0_0_1px_rgb(241_212_155/0.6),0_14px_50px_-8px_rgb(230_189_114/0.75)] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "min-h-11 px-5 text-sm text-moon-100 ring-1 ring-moon-50/15 hover:bg-moon-50/5 hover:ring-moon-50/30",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
