# Was bedeutet mein Traum?

KI-gestützte Traumdeutung – psychologisch, symbolisch und behutsam spirituell.

## Tech-Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS 4 (Design-Tokens in `src/app/globals.css`)
- Schriften über `next/font` (Fraunces, Inter) – selbst gehostet, keine Google-Anfragen
- ESLint + Prettier

## Traumdeutung einrichten

```bash
cp .env.example .env.local
# OPENAI_API_KEY eintragen – oder AI_PROVIDER=mock für die Beispieldeutung ohne Schlüssel
```

Der Schlüssel wird nur serverseitig gelesen und nie an den Browser ausgeliefert.

> **Sprachregel:** In allen sichtbaren Texten (Seiten, Buttons, Ladezustände,
> Fehlermeldungen, Metadaten) werden keine technischen Begriffe wie „KI“,
> „AI“ oder „Algorithmus“ verwendet. Die Verarbeitung über OpenAI ist ein
> internes Implementierungsdetail.

### Ablauf

1. `/` – Startseite mit Einstieg und „Wie funktioniert das?“ (Platz für das
   Erklärvideo: `siteConfig.explainerVideo` in `src/lib/site.ts`).
2. `/traum` – Traum erzählen und Fragen beantworten (lokal gespeichert).
3. `/traum/deutung` – `POST /api/deutung` erzeugt serverseitig die Deutung
   (`features/analysis/analyze.ts`). Sie ist als erste Orientierung aufgebaut
   und endet mit einem Übergang (`bridge`) zur persönlichen Ebene.
4. `/gespraech` – Platzhalter für das bezahlte persönliche Gespräch
   (Dauer, Preis, Kalender, Zahlung folgen).

### Demo für die Videoaufnahme

`/demo` zeigt den kompletten Ablauf mit einem fiktiven Traum – ohne
Server-Anfrage. Textfelder füllen sich beim Antippen wie von selbst getippt.
Drehbuch und Inhalte: `src/features/demo/content.ts`.

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
