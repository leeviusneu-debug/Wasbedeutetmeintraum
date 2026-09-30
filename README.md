# Was bedeutet mein Traum?

KI-gestützte Traumdeutung – psychologisch, symbolisch und behutsam spirituell.

## Tech-Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS 4 (Design-Tokens in `src/app/globals.css`)
- Schriften über `next/font` (Fraunces, Inter) – selbst gehostet, keine Google-Anfragen
- ESLint + Prettier

## KI-Traumdeutung einrichten

```bash
cp .env.example .env.local
# OPENAI_API_KEY eintragen – oder AI_PROVIDER=mock für eine Beispieldeutung ohne Schlüssel
```

Die Schlüssel werden nur serverseitig gelesen (`src/features/analysis/providers/`)
und nie an den Browser ausgeliefert. Der Ablauf:

1. `/traum` speichert Traum und Antworten lokal im Browser.
2. `/traum/deutung` sendet sie an `POST /api/deutung`.
3. `analyzeDream()` (`src/features/analysis/analyze.ts`) prüft die Eingabe,
   bereitet sie auf (`prepare.ts`), baut den Prompt (`prompt.ts`), ruft den
   Anbieter auf und validiert die strukturierte Antwort (`schema.ts`).

Ein weiterer KI-Anbieter wird in `providers/` ergänzt und in
`providers/index.ts` registriert – der Rest der App bleibt unverändert.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run format
npm run build
```

## Struktur

```
src/
  app/                 Routen (Startseite, /traum, /impressum, /datenschutz)
  components/
    home/              Bereiche der Startseite
    layout/            Seitenrahmen, Header, Footer
    ui/                Wiederverwendbare Bausteine (Button, Sternenhimmel)
  features/            Fachmodule (Traumabfrage, Analyse, Konten, Buchung, Zahlung)
  lib/                 Konfiguration & Hilfsfunktionen
```
