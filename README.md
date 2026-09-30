# Was bedeutet mein Traum?

KI-gestützte Traumdeutung – psychologisch, symbolisch und behutsam spirituell.

## Tech-Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS 4 (Design-Tokens in `src/app/globals.css`)
- Schriften über `next/font` (Fraunces, Inter) – selbst gehostet, keine Google-Anfragen
- ESLint + Prettier

## Traumdeutung & E-Mail einrichten

```bash
cp .env.example .env.local
# Für die lokale Entwicklung ohne Schlüssel:
#   AI_PROVIDER=mock   → feste Beispieldeutung
#   EMAIL_PROVIDER=outbox → E-Mails landen als Dateien in .outbox/
```

Alle Schlüssel werden nur serverseitig gelesen und nie an den Browser ausgeliefert.

### Ablauf

1. `/traum` speichert Traum und Antworten lokal im Browser.
2. `/traum/deutung` sendet sie an `POST /api/deutung`. Der Server erzeugt die
   **vollständige** Deutung (`analyzeDream()`), gibt aber nur die Vorschau
   (~2/3) zurück. Die vollständige Deutung wird verschlüsselt
   (`features/analysis/vault.ts`) und nur als undurchsichtige Referenz
   übergeben – der Browser kann sie nicht lesen.
3. Mit E-Mail-Adresse und Referenz ruft der Browser `POST /api/deutung/zusenden`
   auf. Der Server entschlüsselt die Deutung, verschickt sie
   (`features/delivery/`) und erfasst Versand und – nur falls angehakt –
   die Newsletter-Einwilligung getrennt (`features/contacts/`).
4. Danach folgt `/traum/deutung/unterwegs` mit dem Hinweis auf `/gespraech`.

### Austauschbare Bausteine

| Baustein              | Datei                             | Heute                   | Später                    |
| --------------------- | --------------------------------- | ----------------------- | ------------------------- |
| KI-Anbieter           | `features/analysis/providers/`    | OpenAI, Mock            | weitere Anbieter          |
| Deutungs-Speicher     | `features/analysis/vault.ts`      | verschlüsselte Referenz | Datenbank-ID              |
| E-Mail-Versand        | `features/delivery/email/`        | Resend, lokale Outbox   | Postmark, Brevo, SMTP …   |
| Kontakte/Einwilligung | `features/contacts/repository.ts` | Arbeitsspeicher         | Datenbank + Double-Opt-In |
| Limits                | `lib/server/rate-limit.ts`        | Arbeitsspeicher         | Redis/Datenbank           |

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
