import type { DreamInterpretation } from "@/features/analysis/schema";
import type { Answer, QuestionId } from "@/features/dream-intake/types";

/**
 * Fiktiver Beispiel-Traum für /demo (VSL-Aufnahme) und den Mock-Anbieter.
 * Die Demo läuft ohne Server-Anfrage und zeigt immer diese Inhalte.
 */
export const DEMO_DREAM =
  "Ich war wieder in dem Haus, in dem ich als Kind gewohnt habe, aber alles war größer und irgendwie still. Im Flur war eine hellblaue Tür, die mir früher nie aufgefallen ist. Dahinter lag ein Raum voller Wasser – ganz ruhig und klar, fast wie ein See. Am anderen Ende stand meine Großmutter und hat mir zugewinkt. Sie hat etwas gesagt, aber ich konnte es nicht verstehen. Ich wollte zu ihr, doch mit jedem Schritt ins Wasser wurde der Raum ein Stück länger. Dann hat es an der Haustür geklopft und ich bin aufgewacht.";

/**
 * Drehbuch für die Aufnahme – diese Optionen anklicken, Textfelder füllen
 * sich beim Antippen von selbst:
 *
 * 1. Gefühl: „Ruhe“
 * 2. Personen: Textfeld antippen
 * 3. Ort: „Vertraut“ + „Fremd“, Notizfeld antippen, „Weiter“
 * 4. Symbol: Textfeld antippen
 * 5. Ende: „Ich bin abrupt aufgewacht“
 * 6. Aufwachen: „Nachdenklich“
 * 7. Leben: „Eine Veränderung“ + „Arbeit oder Ausbildung“, Notizfeld antippen, „Weiter“
 */
export const DEMO_TEXT_ANSWERS: Partial<Record<QuestionId, string>> = {
  people:
    "Meine Oma ist vor drei Jahren gestorben. Im Traum wirkte sie jünger und ganz gelassen.",
  place: "Es war unser altes Haus, aber alles war viel weiter und heller.",
  symbol:
    "Die Tür war hellblau – genau wie das Gartentor bei meiner Oma früher.",
  life: "Ich überlege gerade, meinen Job zu kündigen und in eine andere Stadt zu ziehen.",
};

/** Vollständig ausgefüllte Antworten (z. B. für Tests). */
export const DEMO_ANSWERS: Partial<Record<QuestionId, Answer>> = {
  emotion: { selected: ["Ruhe"], text: "" },
  people: { selected: [], text: DEMO_TEXT_ANSWERS.people! },
  place: { selected: ["Vertraut", "Fremd"], text: DEMO_TEXT_ANSWERS.place! },
  symbol: { selected: [], text: DEMO_TEXT_ANSWERS.symbol! },
  ending: { selected: ["Abrupt aufgewacht"], text: "" },
  waking: { selected: ["Nachdenklich"], text: "" },
  life: {
    selected: ["Eine Veränderung", "Arbeit oder Ausbildung"],
    text: DEMO_TEXT_ANSWERS.life!,
  },
};

export const DEMO_INTERPRETATION: DreamInterpretation = {
  summary:
    "Ein Traum, der dich zurück an den Anfang führt – in das Haus deiner Kindheit – und dort eine Tür öffnet, die es früher nicht gab. Auffällig ist die tiefe Ruhe, die über allem liegt, obwohl du deine Großmutter nicht erreichst: Es wirkt weniger wie ein Traum über Verlust als wie einer über einen Übergang, der sich gerade vorbereitet.",
  observations: [
    {
      title: "Vertrautes, das weiter geworden ist",
      text: "Das Haus deiner Kindheit ist da, aber es wirkt größer und stiller als früher – als hätte ein alter Ort Platz für etwas Neues gemacht.",
    },
    {
      title: "Eine Tür, die neu erscheint",
      text: "Die hellblaue Tür war dir früher nie aufgefallen und trägt doch die Farbe des Gartentors deiner Großmutter. Neues und Erinnerung liegen hier ineinander.",
    },
    {
      title: "Nähe, die sich nicht erzwingen lässt",
      text: "Je entschlossener du auf deine Großmutter zugehst, desto länger wird der Raum. Die Begegnung bleibt aus – ihre Wärme aber nicht.",
    },
    {
      title: "Ein Klopfen von außen",
      text: "Der Traum endet nicht mit einer Lösung, sondern mit einem Geräusch an der Haustür – als würde der Alltag dich zurückrufen, bevor du antworten konntest.",
    },
  ],
  psychological: [
    "Vielleicht spiegelt der Traum eine Frage, die dich gerade beschäftigt: Wie viel von dem, was dir Halt gegeben hat, nimmst du mit, wenn du etwas Neues beginnst? Das Haus der Kindheit steht oft für das, was uns geprägt hat – und in deinem Traum ist es nicht verschwunden, sondern weiter geworden.",
    "Dass du vor allem Ruhe gespürt hast, obwohl du deine Großmutter nicht erreichst, ist bemerkenswert. Es könnte darauf hindeuten, dass die Trauer um sie inzwischen einen stilleren Platz gefunden hat und ihre Nähe für dich weniger mit Schmerz als mit Vertrauen verbunden ist.",
    "Gleichzeitig wird der Raum mit jedem Schritt länger. Manchmal zeigt sich darin eine innere Spannung: der Wunsch nach einer Antwort oder Bestätigung – und das Gefühl, dass sie sich nicht einfach herbeiführen lässt.",
  ],
  keyInsight:
    "Vielleicht ist es kein Zufall, dass die neue Tür die Farbe des Gartentors deiner Großmutter trägt: Der Weg, über den du gerade nachdenkst, fühlt sich womöglich weniger fremd an, als du glaubst – weil er etwas Vertrautes in sich trägt.",
  symbolic: [
    "Wasser gehört zu den vielschichtigsten Traumbildern. Klares, ruhiges Wasser wird häufig mit Gefühlen verbunden, die sich geklärt haben – es kann aber auch eine Grenze markieren, die sich nicht einfach überschreiten lässt. In deinem Traum ist beides zugleich da: Das Wasser trennt dich von deiner Großmutter, und doch wirkt es nicht bedrohlich.",
    "Auch die Tür lässt mehr als eine Lesart zu. Sie kann für eine Möglichkeit stehen, die plötzlich sichtbar wird, oder für einen Teil deiner Geschichte, den du neu betrachtest. Welche Bedeutung trägt, hängt davon ab, was dieses Hellblau für dich erzählt – Symbole bedeuten nicht für jeden Menschen dasselbe.",
  ],
  mystical: [
    "In vielen traditionellen Vorstellungen gelten Träume, in denen Verstorbene ruhig und zugewandt erscheinen, als Bilder der Verbundenheit – nicht als Ankündigung, sondern als stille Begleitung. Wenn du es so betrachten möchtest, wäre das Winken deiner Großmutter weniger ein Abschied als eine Geste, die sagt: Du darfst weitergehen.",
  ],
  bridge:
    "Eine mögliche Verbindung zu deiner Überlegung, den Job zu kündigen und die Stadt zu wechseln, zeichnet sich hier bereits ab – besonders im Bild des Raumes, der länger wird, je entschlossener du gehst. Um sie wirklich einzuordnen, wäre allerdings wichtig zu wissen, was deine Großmutter dir im Leben bedeutet hat, welche Rolle das Haus deiner Kindheit heute für dich spielt und was dich an dieser Entscheidung gerade zögern lässt.",
  careNote: "",
};
