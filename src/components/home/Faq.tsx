import { HOME_FAQ } from "./faq";

export function Faq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8 sm:pb-32"
    >
      <h2
        id="faq-heading"
        className="text-center font-serif text-3xl font-light text-balance text-moon-50 sm:text-4xl"
      >
        Häufige Fragen zur Traumdeutung
      </h2>
      <div className="mt-10 divide-y divide-moon-50/10 rounded-2xl bg-night-900/60 ring-1 ring-moon-50/10 backdrop-blur-sm">
        {HOME_FAQ.map((item) => (
          <details key={item.question} className="group px-5 sm:px-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-serif text-lg text-moon-50 marker:hidden [&::-webkit-details-marker]:hidden">
              <h3>{item.question}</h3>
              <span
                aria-hidden="true"
                className="text-glow-300 transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 leading-relaxed text-pretty text-moon-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
