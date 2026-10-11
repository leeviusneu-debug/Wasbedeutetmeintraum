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

> **Sprachregel:** In den Texten der Seiten (Buttons, Ladezustände, Deutung,
> Fehlermeldungen, Metadaten) werden keine technischen Begriffe wie „KI“ oder
> „Algorithmus“ verwendet. **Ausnahme – Transparenzhinweise:** Der Hinweis
> unter dem Traum-Textfeld (`StoryStep.tsx`) und die Datenschutzerklärung
> nennen ausdrücklich, dass die Deutung mithilfe von KI (OpenAI) erstellt wird.

### Ablauf

1. `/` – Startseite: Einstieg, Leitidee, „Wie funktioniert das?“ (Platz für das
   Erklärvideo: `siteConfig.explainerVideo` in `src/lib/site.ts`).
2. `/traum` – Traum erzählen, Fragen beantworten, Einwilligung (lokal gespeichert).
3. `/traum/deutung` – `POST /api/deutung` erzeugt serverseitig die
   **vollständige** Deutung (`features/analysis/analyze.ts`). Danach folgt eine
   ruhige Einladung zur persönlichen Traumdeutung.
4. `/traumdeutung` – Traumsymbol-Lexikon mit Einzelseiten
   (`/traumdeutung/[symbol]`, Inhalte in `src/features/symbols/`) – die
   wichtigste Quelle für Suchmaschinen-Traffic.

### SEO

- Domain/URL: `siteConfig.url` in `src/lib/site.ts` (für Canonical, Sitemap,
  Open Graph).
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`.
- Strukturierte Daten (JSON-LD): `src/lib/seo.ts`.
- Neue Traumsymbole: Eintrag in `src/features/symbols/data.ts` ergänzen –
  Seite, Sitemap und Verlinkung entstehen automatisch.

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
