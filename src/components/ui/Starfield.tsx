import type { CSSProperties } from "react";

type Star = {
  top: number;
  left: number;
  size: number;
  min: number;
  max: number;
  duration: number;
  delay: number;
};

// Deterministischer Zufall, damit Server- und Client-Rendering identisch sind.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const bright = rand() > 0.88;
    return {
      top: rand() * 100,
      left: rand() * 100,
      size: bright ? 1.5 + rand() * 1.2 : 0.6 + rand() * 0.9,
      min: 0.08 + rand() * 0.15,
      max: bright ? 0.75 + rand() * 0.25 : 0.35 + rand() * 0.35,
      duration: 4 + rand() * 7,
      delay: rand() * -10,
    };
  });
}

const stars = createStars(90, 20240611);

export function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Grundverlauf des Nachthimmels */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-night-700)_0%,var(--color-night-900)_45%,var(--color-night-950)_100%)]" />

      {/* Dezente, langsam treibende Lichtnebel */}
      <div className="absolute inset-[-20%] animate-drift">
        <div className="absolute top-[12%] left-[8%] h-[45vmax] w-[45vmax] rounded-full bg-dusk-500/20 blur-[120px]" />
        <div className="absolute top-[35%] right-[-5%] h-[35vmax] w-[35vmax] rounded-full bg-glow-500/[0.07] blur-[120px]" />
      </div>

      {/* Sterne */}
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-moon-50"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow:
                star.size > 1.5
                  ? "0 0 6px 1px rgb(247 242 232 / 0.35)"
                  : undefined,
              animationDelay: `${star.delay}s`,
              "--twinkle-duration": `${star.duration}s`,
              "--star-min": star.min,
              "--star-max": star.max,
            } as CSSProperties
          }
        />
      ))}

      {/* Warmes Leuchten am Horizont */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(70%_60%_at_50%_100%,rgb(212_162_78/0.12)_0%,transparent_70%)]" />
    </div>
  );
}
