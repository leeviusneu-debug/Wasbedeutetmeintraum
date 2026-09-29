# Features

Fachliche Module der App. Jedes Feature bündelt seine Komponenten, Logik und
Typen in einem eigenen Ordner. Seiten unter `src/app` importieren nur aus diesen
Modulen und bleiben dadurch schlank.

Geplante Module:

| Ordner          | Inhalt                                   |
| --------------- | ---------------------------------------- |
| `dream-intake/` | Traumabfrage (Formular, Schritte)        |
| `analysis/`     | KI-Analyse (nur serverseitig, API-Keys!) |
| `auth/`         | Nutzerkonten                             |
| `booking/`      | Terminbuchung                            |
| `payments/`     | Bezahlung                                |
