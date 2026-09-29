/**
 * Einfache, regelbasierte Erkennung von Traum-Motiven.
 * Dient nur dazu, die Folgefragen persönlicher zu formulieren –
 * die eigentliche Deutung übernimmt später die KI.
 */

export type DetectedMotifs = {
  people: string[];
  places: string[];
  symbols: string[];
  /** Handlungsmotiv als substantivierter Ausdruck, z. B. „Das Fallen“. */
  actions: string[];
};

const PEOPLE =
  /^(mutter|mama|vater|papa|eltern|bruder|brüder|schwester|schwestern|oma|opa|großmutter|großvater|freund|freunde|freundin|freundinnen|partner|partnerin|ehemann|ehefrau|ex|chef|chefin|lehrer|lehrerin|kollege|kollegin|kind|kinder|baby|tochter|sohn|mann|frau|mädchen|junge|fremde|fremder|fremden|tante|onkel|cousin|cousine|nachbar|nachbarin|arzt|ärztin|polizist|polizistin)$/;

const PLACES =
  /^(haus|hauses|wohnung|zimmer|keller|dachboden|schule|klassenzimmer|uni|universität|büro|wald|waldes|meer|see|strand|fluss|berg|berge|gebirge|stadt|straße|zug|bahnhof|flughafen|krankenhaus|kirche|garten|brücke|höhle|labyrinth|hotel|kinderzimmer|flur|aufzug|fahrstuhl|insel|wüste|friedhof|dorf|feld|wiese)$/;

const SYMBOLS =
  /^(schlange|schlangen|spinne|spinnen|hund|hunde|katze|katzen|pferd|pferde|vogel|vögel|wolf|wölfe|bär|wasser|feuer|zahn|zähne|tür|türen|schlüssel|spiegel|treppe|treppen|geld|blut|messer|waffe|ring|brief|handy|telefon|uhr|auto|flugzeug|licht|mond|sonne|sterne|blume|blumen|baum|bäume|koffer|tasche|kerze|fenster|welle|wellen|sturm|regen|schnee|eis)$/;

const ACTIONS: { pattern: RegExp; phrase: string }[] = [
  { pattern: /^(verfolg|gejagt|jagte)/, phrase: "Das Verfolgtwerden" },
  {
    pattern: /^(fall(e|en|st|t)?$|fiel|gefallen|stürz|abgestürzt)/,
    phrase: "Das Fallen",
  },
  { pattern: /^(flieg|flog|geflogen|schweb)/, phrase: "Das Fliegen" },
  { pattern: /^(flieh|floh|geflohen|flucht|flücht)/, phrase: "Die Flucht" },
  { pattern: /^(such|gesucht)/, phrase: "Das Suchen" },
  { pattern: /^(verlor|verlier|verirr)/, phrase: "Das Verlieren" },
  { pattern: /^(kämpf|gekämpft|streit|gestritten)/, phrase: "Der Konflikt" },
  { pattern: /^(ertrink|ertrank|ertrunken)/, phrase: "Das Ertrinken" },
  { pattern: /^(prüfung|klausur|examen)/, phrase: "Die Prüfung" },
  { pattern: /^(gestorben|starb|stirbt|sterben|tot)$/, phrase: "Der Tod" },
  { pattern: /^(renn|rannte|gerannt|lief|lauf)/, phrase: "Das Rennen" },
];

function capitalize(word: string) {
  return word.charAt(0).toLocaleUpperCase("de-DE") + word.slice(1);
}

function unique(values: string[]) {
  return [...new Set(values)];
}

export function detectMotifs(dream: string): DetectedMotifs {
  const tokens = dream
    .toLocaleLowerCase("de-DE")
    .split(/[^\p{L}]+/u)
    .filter(Boolean);

  return {
    people: unique(tokens.filter((t) => PEOPLE.test(t)).map(capitalize)),
    places: unique(tokens.filter((t) => PLACES.test(t)).map(capitalize)),
    symbols: unique(tokens.filter((t) => SYMBOLS.test(t)).map(capitalize)),
    actions: unique(
      tokens.flatMap((t) =>
        ACTIONS.filter((a) => a.pattern.test(t)).map((a) => a.phrase),
      ),
    ),
  };
}

/** „„Mutter““, „„Mutter“ und „Bruder““ – höchstens zwei Begriffe. */
export function quoteList(words: string[]) {
  const quoted = words.slice(0, 2).map((w) => `„${w}“`);
  return quoted.join(" und ");
}
