import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { EmailSender } from "./types";

/**
 * Nur für die Entwicklung: speichert E-Mails als HTML-Datei in `.outbox/`,
 * statt sie zu verschicken. So lässt sich die Vorlage im Browser ansehen.
 */
export function createDevOutboxSender(): EmailSender {
  return {
    id: "outbox",
    async send(message) {
      const dir = path.join(process.cwd(), ".outbox");
      await mkdir(dir, { recursive: true });
      const file = path.join(dir, `${Date.now()}.html`);
      await writeFile(
        file,
        `<!-- An: ${message.to} | Betreff: ${message.subject} -->\n${message.html}`,
        "utf8",
      );
      await writeFile(file.replace(/\.html$/, ".txt"), message.text, "utf8");
      console.info(
        `[outbox] E-Mail gespeichert: ${path.relative(process.cwd(), file)}`,
      );
    },
  };
}
