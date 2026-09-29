type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p
        aria-live="polite"
        className="text-[0.7rem] font-medium tracking-[0.25em] text-glow-300/80 uppercase"
      >
        Frage {current} von {total}
      </p>
      <div aria-hidden="true" className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-700 ${
              i < current ? "bg-glow-300/80" : "bg-moon-50/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
