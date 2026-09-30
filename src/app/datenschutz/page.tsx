import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, routes, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung von „${siteConfig.name}“.`,
};

/*
 * Hinweis für die Betreiber: Diese Erklärung beschreibt den technischen
 * Stand der Website (Traumabfrage, Deutung über OpenAI, lokale Speicherung,
 * keine Cookies/Tracking). Sie ersetzt keine Rechtsberatung – bitte vor dem
 * Livegang prüfen lassen und bei jeder Änderung (z. B. Buchung, Zahlung,
 * Analyse-Tools) aktualisieren.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro={
        <p>
          Träume sind persönlich. Deshalb erklären wir hier offen und
          verständlich, welche Daten beim Besuch dieser Website verarbeitet
          werden, wozu – und welche Rechte du hast.
        </p>
      }
    >
      <section>
        <h2>Auf einen Blick</h2>
        <ul>
          <li>Du brauchst kein Konto und musst dich nicht anmelden.</li>
          <li>
            Deine Deutung wird nur erstellt, wenn du vorher ausdrücklich in die
            Verarbeitung eingewilligt hast.
          </li>
          <li>
            Wir setzen keine Cookies, kein Tracking und keine Analyse-Tools ein.
          </li>
          <li>
            Deine Traumdeutung wird automatisiert mithilfe künstlicher
            Intelligenz (KI) erstellt. Dafür werden dein Traum und deine
            Antworten an unseren Dienstleister OpenAI übermittelt.
          </li>
          <li>
            Wir speichern deinen Traum nicht auf unserem Server. Traum,
            Antworten und Deutung bleiben lokal in deinem Browser gespeichert,
            bis du sie löschst.
          </li>
        </ul>
      </section>

      <section>
        <h2>1. Verantwortlicher</h2>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <p>
          <Fill value={legalConfig.operatorName} />
          <br />
          {legalConfig.address.length > 0 ? (
            legalConfig.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))
          ) : (
            <>
              <Fill />
              <br />
            </>
          )}
          E-Mail:{" "}
          {legalConfig.email ? (
            <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>
          ) : (
            <Fill />
          )}
        </p>
      </section>

      <section>
        <h2>2. Aufruf der Website und Hosting</h2>
        <p>
          Wenn du diese Website aufrufst, verarbeitet unser Hosting-Anbieter
          technisch notwendige Daten, damit die Seite ausgeliefert werden kann –
          insbesondere deine IP-Adresse, Datum und Uhrzeit des Abrufs, die
          aufgerufene Seite sowie Browser- und Geräteinformationen
          (Server-Logfiles).
        </p>
        <p>
          Hosting-Anbieter: <Fill value={legalConfig.hostingProvider} />
        </p>
        <p>
          Zum Schutz vor Missbrauch und übermäßig vielen Anfragen verwenden wir
          deine IP-Adresse außerdem kurzzeitig, um die Anzahl der Deutungen pro
          Anschluss zu begrenzen. Diese Information liegt nur im Arbeitsspeicher
          des Servers und wird nach spätestens zehn Minuten verworfen.
        </p>
        <p>
          Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und
          stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section>
        <h2>3. Traumdeutung mithilfe künstlicher Intelligenz</h2>
        <h3>Welche Daten verarbeitet werden</h3>
        <p>
          Wenn du deine Traumdeutung anforderst, werden die Beschreibung deines
          Traums und deine Antworten auf die Fragen (z. B. zu Gefühlen,
          Personen, Orten und deiner aktuellen Lebenssituation) an unseren
          Server und von dort an OpenAI übermittelt. Dort wird daraus
          automatisiert ein Deutungstext erstellt, den wir dir anzeigen.
        </p>
        <p>
          Deine IP-Adresse und andere technische Merkmale deines Geräts geben
          wir dabei nicht an OpenAI weiter. Bitte nenne in deinem Traum und
          deinen Antworten keine vollständigen Namen, Adressen oder andere
          Angaben, durch die du oder andere Personen erkennbar werden.
        </p>

        <h3>Empfänger: OpenAI</h3>
        <p>
          Anbieter des KI-Dienstes ist OpenAI Ireland Ltd., 1st Floor, The
          Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43,
          Irland. OpenAI verarbeitet die Daten in unserem Auftrag auf Grundlage
          eines Auftragsverarbeitungsvertrags (Art. 28 DSGVO). Dabei kann eine
          Verarbeitung auch in den USA durch die OpenAI, L.L.C. erfolgen. Die
          Übermittlung stützt sich auf die von der EU-Kommission erlassenen
          Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) bzw. – soweit
          anwendbar – auf den Angemessenheitsbeschluss zum EU-US Data Privacy
          Framework (Art. 45 DSGVO).
        </p>

        <h3>Speicherdauer</h3>
        <p>
          Wir selbst speichern deinen Traum, deine Antworten und die Deutung
          nicht auf unserem Server; auch in unseren Fehlerprotokollen erscheinen
          diese Inhalte nicht. Wir rufen den Dienst von OpenAI so auf, dass
          Anfragen dort nicht für spätere Abrufe gespeichert werden. OpenAI kann
          Anfragen jedoch bis zu 30 Tage aufbewahren, um Missbrauch zu erkennen,
          und löscht sie danach. Die übermittelten Daten werden nicht zum
          Training der KI-Modelle von OpenAI verwendet.
        </p>

        <h3>Rechtsgrundlage</h3>
        <p>
          Die Verarbeitung erfolgt, um dir die von dir angeforderte Traumdeutung
          bereitzustellen (Art. 6 Abs. 1 lit. b DSGVO). Träume können sehr
          persönliche Inhalte berühren, etwa Angaben zu Gesundheit, Sexualität
          oder religiösen Überzeugungen. Solche Angaben verarbeiten wir nur auf
          Grundlage deiner ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a
          DSGVO). Diese erteilst du, indem du vor dem Erstellen der Deutung die
          entsprechende Checkbox aktivierst; ohne diese Einwilligung wird keine
          Deutung erstellt und nichts an OpenAI übermittelt. Der Nachweis
          (Version des Einwilligungstextes und Zeitpunkt) wird zusammen mit
          deinen Eingaben lokal in deinem Browser gespeichert.
        </p>
        <p>
          Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft
          widerrufen – etwa indem du den Haken wieder entfernst, mit „Neuen
          Traum erzählen“ neu beginnst oder deine lokal gespeicherten Daten
          löschst (siehe Abschnitt 5). Die Rechtmäßigkeit der bis zum Widerruf
          erfolgten Verarbeitung bleibt davon unberührt; bereits an OpenAI
          übermittelte Anfragen werden dort spätestens nach 30 Tagen gelöscht.
        </p>

        <h3>Was die Deutung ist – und was nicht</h3>
        <p>
          Die Deutung wird vollständig automatisiert erstellt und vor der
          Anzeige nicht von einem Menschen gelesen oder geprüft. Sie ist eine
          Einladung zur Selbstreflexion – keine Tatsachenbehauptung, keine
          Diagnose und kein Ersatz für psychologische, medizinische oder
          therapeutische Beratung. KI-generierte Texte können ungenau sein. Es
          findet keine automatisierte Entscheidung im Sinne von Art. 22 DSGVO
          statt, die dir gegenüber rechtliche Wirkung entfaltet.
        </p>
      </section>

      <section>
        <h2>4. Demo-Seite</h2>
        <p>
          Unter <Link href={routes.demo}>{routes.demo}</Link> zeigen wir den
          Ablauf mit einem erfundenen Beispiel-Traum. Dort werden keine Eingaben
          an unseren Server oder an OpenAI übermittelt und nichts gespeichert.
        </p>
      </section>

      <section>
        <h2>5. Speicherung auf deinem Gerät</h2>
        <p>
          Damit du nicht von vorn beginnen musst, wenn du die Seite neu lädst,
          speichern wir deinen Traum, deine Antworten und deine letzte Deutung
          im lokalen Speicher deines Browsers („Local Storage“). Diese Daten
          verbleiben auf deinem Gerät und werden von uns nicht ausgelesen; an
          unseren Server gehen sie nur, wenn du eine Deutung anforderst (siehe
          Abschnitt 3).
        </p>
        <p>
          Du kannst diese Daten jederzeit löschen, indem du in deinem Browser
          die Website-Daten für diese Seite entfernst. Mit „Neuen Traum
          erzählen“ setzt du außerdem deine Eingaben zurück. Rechtsgrundlage ist
          § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für den von dir
          gewünschten Dienst) sowie Art. 6 Abs. 1 lit. b DSGVO.
        </p>
      </section>

      <section>
        <h2>6. Keine Cookies, kein Tracking</h2>
        <p>
          Wir verwenden keine Cookies, keine Analyse- oder Marketing-Tools und
          keine Social-Media-Plugins. Die Schriftarten dieser Website werden von
          unserem eigenen Server geladen; beim Aufruf entsteht keine Verbindung
          zu Google oder anderen Schriftanbietern.
        </p>
      </section>

      <section>
        <h2>7. Persönliches Gespräch</h2>
        <p>
          Die Buchung persönlicher Gespräche ist derzeit noch nicht möglich; auf
          der Seite{" "}
          <Link href={routes.conversation}>Persönliches Gespräch</Link> werden
          keine Daten erhoben. Sobald Terminbuchung und Zahlung verfügbar sind,
          ergänzen wir diese Erklärung.
        </p>
      </section>

      <section>
        <h2>8. Verschlüsselung</h2>
        <p>
          Die Übertragung zwischen deinem Browser und unserem Server sowie
          zwischen unserem Server und OpenAI erfolgt verschlüsselt (TLS).
        </p>
      </section>

      <section>
        <h2>9. Deine Rechte</h2>
        <p>Du hast jederzeit das Recht auf</p>
        <ul>
          <li>Auskunft über deine verarbeiteten Daten (Art. 15 DSGVO),</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
          <li>Löschung (Art. 17 DSGVO),</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
          <li>
            Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
            Interessen (Art. 21 DSGVO),
          </li>
          <li>
            Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
            (Art. 7 Abs. 3 DSGVO).
          </li>
        </ul>
        <p>
          Da wir deinen Traum nicht auf unserem Server speichern und dich nicht
          identifizieren können, können wir einzelne Einträge in der Regel nicht
          zuordnen. Wende dich für alle Anliegen gern an die oben genannte
          Adresse.
        </p>
        <p>
          Außerdem hast du das Recht, dich bei einer
          Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), etwa bei
          der Behörde deines Wohnorts oder der für uns zuständigen Behörde.
        </p>
      </section>

      <p className="text-xs text-moon-400">
        Stand: {legalConfig.privacyUpdated}
      </p>
    </LegalPage>
  );
}
