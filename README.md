# Was bedeutet mein Traum?

KI-gestützte Traumdeutung – psychologisch, symbolisch und behutsam spirituell.

## Tech-Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS 4 (Design-Tokens in `src/app/globals.css`)
- Schriften über `next/font` (Fraunces, Inter) – selbst gehostet, keine Google-Anfragen
- ESLint + Prettier

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
