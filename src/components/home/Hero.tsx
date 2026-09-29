import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-28">
      <p className="animate-fade-up text-[0.7rem] font-medium tracking-[0.3em] text-glow-300/80 uppercase sm:text-xs">
        Traumdeutung mit Tiefgang
      </p>

      <h1 className="mt-6 animate-fade-up font-serif text-[2.6rem] leading-[1.05] font-light tracking-tight text-balance text-moon-50 [animation-delay:120ms] sm:text-6xl md:text-7xl">
        Was bedeutet mein{" "}
        <em className="font-normal text-glow-300 not-italic [font-variation-settings:'SOFT'_100]">
          Traum
        </em>
        ?
      </h1>

      <p className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-pretty text-moon-300 [animation-delay:240ms] sm:mt-8 sm:max-w-xl sm:text-xl">
        Erzähle uns deinen Traum – wir schauen gemeinsam genauer hin.
      </p>

      <div className="mt-10 flex w-full animate-fade-up flex-col items-center gap-4 [animation-delay:360ms] sm:mt-12">
        <ButtonLink href={routes.dream} className="w-full max-w-xs sm:w-auto">
          Traum erzählen
          <ArrowIcon />
        </ButtonLink>
        <p className="text-sm text-moon-400">
          Kostenlos <Dot /> anonym <Dot /> in wenigen Minuten
        </p>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span aria-hidden="true" className="mx-1.5 text-glow-400/60">
      •
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
