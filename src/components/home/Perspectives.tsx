const perspectives = [
  {
    title: "Psychologisch",
    text: "Welche Gefühle, Themen und Erfahrungen aus deinem Alltag könnten sich im Traum zeigen?",
  },
  {
    title: "Symbolisch",
    text: "Was können Bilder, Orte und Figuren deines Traums bedeuten – über Kulturen und Zeiten hinweg?",
  },
  {
    title: "Behutsam spirituell",
    text: "Eine offene, vorsichtige Einladung zum Nachspüren – ohne Versprechen, ohne Dogma.",
  },
];

export function Perspectives() {
  return (
    <section
      aria-labelledby="perspectives-heading"
      className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8 sm:pb-24"
    >
      <h2 id="perspectives-heading" className="sr-only">
        Drei Perspektiven auf deinen Traum
      </h2>
      <ul className="grid gap-px overflow-hidden rounded-2xl bg-moon-50/10 ring-1 ring-moon-50/10 sm:grid-cols-3">
        {perspectives.map((item) => (
          <li
            key={item.title}
            className="bg-night-900/80 p-6 backdrop-blur-sm sm:p-8"
          >
            <h3 className="font-serif text-xl text-moon-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-moon-400">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
