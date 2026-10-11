# Features

Fachliche Module der App. Jedes Feature bündelt seine Komponenten, Logik und
Typen in einem eigenen Ordner. Seiten unter `src/app` importieren nur aus diesen
Modulen und bleiben dadurch schlank.

| Ordner          | Inhalt                                        |
| --------------- | --------------------------------------------- |
| `dream-intake/` | Traumabfrage (Eingabe, Fragen, Einwilligung)  |
| `analysis/`     | Deutung (serverseitig über OpenAI, API-Keys!) |
| `symbols/`      | Traumsymbol-Lexikon (SEO-Inhalte)             |
| `demo/`         | Statische Demo für Videoaufnahmen             |
