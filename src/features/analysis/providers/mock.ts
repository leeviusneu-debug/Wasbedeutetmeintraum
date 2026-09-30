import "server-only";

import type { DreamInterpretation } from "../schema";
import type { AIProvider } from "./types";

/**
 * Beispiel-Anbieter für die lokale Entwicklung ohne API-Schlüssel
 * (AI_PROVIDER=mock). Liefert immer dieselbe Beispieldeutung.
 */
export function createMockProvider(): AIProvider {
  return {
    id: "mock",
    async generateStructured({ signal }) {
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 2500);
        signal?.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(signal.reason);
        });
      });
      return MOCK_INTERPRETATION;
    },
  };
}

const MOCK_INTERPRETATION: DreamInterpretation = {
  summary:
    "(Beispieldeutung) In deinem Traum suchst du nach jemandem, der dir nah ist, und findest ihn nicht – und gerade in diesem Moment der Unsicherheit taucht ein Bild auf, das dich innehalten lässt. Die Angst im Traum und das Gefühl danach erzählen von etwas, das dich wohl gerade wirklich beschäftigt.",
  observations: [
    {
      title: "Eine Stimme ohne Gesicht",
      text: "Du hörst, wie nach dir gerufen wird, kannst die Person aber nicht erreichen. Nähe und Abstand liegen in diesem Traum dicht beieinander.",
    },
    {
      title: "Der Wald als Zwischenraum",
      text: "Der dunkle Wald ist weder vertraut noch ganz fremd – ein Ort, an dem Orientierung erst gefunden werden muss.",
    },
    {
      title: "Ein Ende ohne Auflösung",
      text: "Der Traum bricht ab, bevor sich etwas klärt. Das offene Ende passt zu dem, was du über deine aktuelle Situation erzählt hast.",
    },
  ],
  psychological: [
    "Vielleicht spiegelt der Traum eine Phase, in der du nach Halt suchst, während sich um dich herum etwas verändert. Die Stimme, die dich ruft, könnte für ein Bedürfnis nach Verbundenheit stehen, das gerade nicht ganz erfüllt wird.",
    "Dass du im Traum Angst hattest und nach dem Aufwachen eher nachdenklich warst, kann ein Hinweis sein, dass dich das Thema nicht nur erschreckt, sondern auch beschäftigt – als würdest du innerlich schon nach einer Antwort suchen.",
  ],
  symbolic: [
    "Der Wald gilt in vielen Erzählungen als Ort des Übergangs: Man verliert den Weg, um einen neuen zu finden. In deinem Traum wirkt er zugleich fremd und vertraut – vielleicht ein Hinweis darauf, dass das Neue schon Teile von dir enthält.",
    "Die Schlange kann ganz unterschiedlich gelesen werden: als etwas Bedrohliches, dem du ausweichen möchtest, oder – wie in vielen Traditionen – als Zeichen von Wandlung und Häutung. Entscheidend ist, wie sie auf dich gewirkt hat.",
  ],
  mystical: [
    "Wenn du es so betrachten möchtest, erinnert dieser Traum an die alte Vorstellung, dass wir im Schlaf Orte betreten, an denen sich Innen und Außen begegnen. Der Ruf aus dem Dunkeln wäre dann weniger eine Warnung als eine Einladung, genauer hinzuhören.",
  ],
  reflectionQuestion:
    "Wessen Stimme würdest du gerade am liebsten hören – und was müsste geschehen, damit du ihr näherkommst?",
  careNote: "",
};
