export type ButtonVariant = "primary" | "ghost" | "quiet";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow-300 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary:
    "min-h-14 px-6 text-[0.95rem] text-night-950 sm:px-8 sm:text-base bg-gradient-to-b from-glow-300 to-glow-400 shadow-[0_0_0_1px_rgb(241_212_155/0.4),0_10px_40px_-10px_rgb(230_189_114/0.55)] hover:shadow-[0_0_0_1px_rgb(241_212_155/0.6),0_14px_50px_-8px_rgb(230_189_114/0.75)] hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none",
  ghost:
    "min-h-11 px-5 text-sm text-moon-100 ring-1 ring-moon-50/15 hover:bg-moon-50/5 hover:ring-moon-50/30",
  quiet: "min-h-11 px-3 text-sm text-moon-400 hover:text-moon-100",
};

export function buttonClassName(variant: ButtonVariant, className = "") {
  return `${base} ${variants[variant]} ${className}`;
}
