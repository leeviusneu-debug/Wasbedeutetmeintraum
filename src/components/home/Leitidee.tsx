/** Die Leitidee der Website – ruhig, ohne Versprechen. */
export function Leitidee() {
  return (
    <section
      aria-labelledby="leitidee-heading"
      className="mx-auto w-full max-w-3xl px-5 pb-24 text-center sm:px-8 sm:pb-32"
    >
      <span
        aria-hidden="true"
        className="mx-auto block h-px w-16 bg-gradient-to-r from-transparent via-glow-300/60 to-transparent"
      />
      <h2
        id="leitidee-heading"
        className="mx-auto mt-10 max-w-2xl font-serif text-3xl leading-snug font-light text-balance text-moon-50 sm:text-[2.6rem]"
      >
        Träume können Schlüssel zu unserer{" "}
        <em className="text-glow-300 not-italic">Seele</em> sein.
      </h2>
      <div className="mx-auto mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-pretty text-moon-300">
        <p>
          Manche Träume begleiten uns noch Tage später. Sie zeigen Bilder,
          Gefühle und Fragen, für die im Alltag oft wenig Raum bleibt – und
          manchmal berühren sie etwas, das uns gerade wirklich beschäftigt.
        </p>
        <p>
          Hier betrachtest du deinen Traum aus psychologischer, symbolischer und
          traditioneller Sicht. Nicht als feste Wahrheit, sondern als Einladung,
          dich selbst ein Stück besser zu verstehen.
        </p>
      </div>
    </section>
  );
}
