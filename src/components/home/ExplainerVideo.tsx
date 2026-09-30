import { siteConfig } from "@/lib/site";

/** Erklärvideo – bis es vorliegt, ein ruhiger Platzhalter im gleichen Format. */
export function ExplainerVideo() {
  const video = siteConfig.explainerVideo;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-night-900 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-moon-50/10">
      {video ? (
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Dein Browser kann dieses Video leider nicht abspielen.
        </video>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(80%_70%_at_50%_40%,var(--color-night-700)_0%,var(--color-night-900)_70%)]">
          <span
            aria-hidden="true"
            className="absolute h-40 w-40 animate-breathe rounded-full bg-glow-300/10 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="relative flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-glow-300/40 sm:h-20 sm:w-20"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-glow-300">
              <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" />
            </svg>
          </span>
          <p className="relative mt-5 text-sm text-moon-400">
            Das Video folgt in Kürze.
          </p>
        </div>
      )}
    </div>
  );
}
