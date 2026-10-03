import type { DreamInterpretation } from "@/features/analysis/schema";
import type { Answer, QuestionId } from "@/features/dream-intake/types";

/**
 * Fiktiver Beispiel-Traum für /demo (VSL-Aufnahme) und den Mock-Anbieter.
 * Die Demo läuft ohne Server-Anfrage und zeigt immer diese Inhalte.
 *
 * Ablauf in der Demo:
 * - Per Klick: Traum-Textfeld antippen → Text tippt sich selbst. Bei jeder
 *   Frage wird die vorbereitete Antwort automatisch ausgewählt bzw. getippt,
 *   danach nur noch „Weiter“ klicken.
 * - Automatisch: /demo?autoplay – der komplette Ablauf läuft von selbst bis
 *   zur Buchungsseite.
 */
export const DEMO_DREAM =
  "Ich träume, dass ich durch ein altes Haus gehe. Ich kenne das Haus nicht, aber irgendwie fühlt es sich vertraut an. Im oberen Stock höre ich jemanden meinen Namen rufen. Ich bekomme Angst und suche nach einem Ausgang. Als ich eine Tür öffne, stehe ich plötzlich draußen an einem See. Dort ist es völlig still. Dann wache ich auf.";

/** Vorbereitete Antworten – passend zur Fragenfolge dieses Traums. */
export const DEMO_ANSWERS: Partial<Record<QuestionId, Answer>> = {
  emotion: { selected: ["Angst"], text: "" },
  place: {
    selected: ["Vertraut", "Fremd"],
    text: "Ich war noch nie dort – und wusste trotzdem, wo jedes Zimmer ist.",
  },
  symbol: {
    selected: [],
    text: "Die Tür war alt und schwer, ging aber ganz leicht auf. Dahinter war plötzlich Licht.",
  },
  action: {
    selected: ["other"],
    text: "Ich bin eher weggelaufen.",
  },
  ending: {
    selected: ["other"],
    text: "Ich stand plötzlich an einem stillen See.",
  },
  waking: {
    selected: ["other"],
    text: "Nachdenklich und etwas erleichtert.",
  },
  life: {
    selected: ["Eine Veränderung", "Arbeit oder Ausbildung"],
    text: "Ich muss mich bald entscheiden, ob ich meine sichere Stelle aufgebe, um etwas Eigenes zu beginnen.",
  },
};

export const DEMO_INTERPRETATION: DreamInterpretation = {
  summary:
    "Ein Traum, der wie eine Flucht beginnt und in vollkommener Stille endet. Du gehst durch ein Haus, das du nicht kennst und das sich trotzdem vertraut anfühlt – und als jemand deinen Namen ruft, suchst du nicht nach der Stimme, sondern nach dem Ausgang. Gerade dieser Moment macht deinen Traum so aufschlussreich.",
  observations: [
    {
      title: "Fremd und doch vertraut",
      text: "Das Haus ist dir unbekannt, und doch weißt du, wo jedes Zimmer liegt. Oft zeigt sich in solchen Bildern etwas Eigenes, das man noch nicht ganz betreten hat.",
    },
    {
      title: "Ein Ruf von oben",
      text: "Jemand ruft deinen Namen aus dem oberen Stock – von einem Ort, den du noch nicht erreicht hast. Der Ruf ist persönlich gemeint, nicht zufällig.",
    },
    {
      title: "Ausweichen statt antworten",
      text: "Statt nachzusehen, wer dich ruft, suchst du den Ausgang. Die Angst führt dich nicht zur Stimme, sondern hinaus.",
    },
    {
      title: "Eine Tür, die alles verändert",
      text: "Die alte, schwere Tür öffnet sich überraschend leicht – und aus der Enge des Hauses wird plötzlich Weite, Licht und Stille.",
    },
  ],
  thread:
    "Durch den ganzen Traum zieht sich eine Bewegung von der Enge in die Weite: vom unbekannten Haus über den Ruf, dem du ausweichst, bis zur Tür, hinter der plötzlich Stille liegt. Was als Flucht beginnt, endet nicht im Chaos, sondern an einem ruhigen Ort – als hätte der Weg nach draußen dich genau dorthin geführt, wo du klarer sehen kannst.",
  psychological: [
    "Vielleicht beschreibt das Haus einen inneren Raum, in dem du gerade unterwegs bist: neu, aber nicht fremd – so, als würdest du einen Teil von dir betreten, der schon lange da ist. Dass dich genau dort jemand beim Namen ruft, könnte darauf hindeuten, dass eine Frage dringlicher wird, die bisher eher im Hintergrund lag.",
    "Deine Reaktion ist sehr menschlich: Angst, Unruhe, der Wunsch nach einem Ausweg. Manchmal zeigt sich darin weniger eine Bedrohung als die Sorge, was es bedeuten würde, wirklich hinzuhören. Wer vor einer wichtigen Entscheidung steht, kennt dieses Gefühl – der Ruf ist deutlich, und gleichzeitig möchte man noch einen Moment Abstand.",
    "Bemerkenswert ist, dass du nachdenklich und etwas erleichtert aufgewacht bist. Es könnte sein, dass die Stille am See etwas ausdrückt, wonach du dich gerade sehnst: einen Ort, an dem nichts drängt und du in Ruhe klar sehen kannst.",
  ],
  keyInsight:
    "Vielleicht ist es kein Zufall, dass dich die Flucht nicht ins Leere führt, sondern an einen stillen See: Die Ruhe, die du suchst, liegt womöglich nicht darin, dem Ruf auszuweichen – sondern auf der anderen Seite der Tür, die du selbst geöffnet hast.",
  symbolic: [
    "Häuser stehen in vielen Deutungstraditionen für das eigene Selbst, einzelne Stockwerke für unterschiedliche Ebenen des Erlebens. Ein Ruf aus dem oberen Stock kann daher als etwas gelesen werden, das noch nicht ganz bewusst ist – oder als etwas, das höher hinaus möchte. Welche Lesart trägt, hängt davon ab, wie sich dieser Ruf für dich angefühlt hat.",
    "Die Tür ist der Wendepunkt des Traums. Sie kann für einen Übergang stehen, den man lange für schwer gehalten hat und der sich dann überraschend leicht anfühlt. Sie kann aber auch eine Grenze markieren: zwischen dem, was drinnen ungeklärt bleibt, und dem, was draußen schon möglich ist.",
    "Auch der See lässt mehrere Deutungen zu. Stilles Wasser wird häufig mit innerer Klarheit verbunden, manchmal aber auch mit einer Pause vor etwas Neuem. Symbole bedeuten nicht für jeden Menschen dasselbe – entscheidend ist, was dieser stille Ort in dir auslöst.",
  ],
  mystical: [
    "In manchen traditionellen Vorstellungen gilt es als bedeutsam, im Traum beim eigenen Namen gerufen zu werden – nicht als Ankündigung, sondern als Einladung, aufmerksam zu sein. Wenn du es so betrachten möchtest, wäre der Ruf weniger eine Bedrohung als eine Erinnerung daran, dass da etwas ist, das gehört werden möchte.",
    "Wasser gilt in vielen Kulturen als Ort der Reinigung und des Innehaltens. In diesem Bild wäre der stille See kein Ziel, sondern ein Ort, an dem du hören kannst, was vorher zu laut oder zu beängstigend war.",
  ],
  reflection:
    "Vielleicht lohnt es sich, in den nächsten Tagen einmal bewusst an diesen stillen See zurückzudenken. Wenn du dir vorstellst, dort noch einmal deinen Namen zu hören – wessen Stimme wäre es, und was würdest du ihr heute antworten?",
  careNote: "",
};
