import "server-only";

import type { DreamInterpretation } from "@/features/analysis/schema";
import { routes, siteConfig } from "@/lib/site";
import { DELIVERY_NOTICE } from "../consent";
import type { EmailMessage } from "./types";

const C = {
  page: "#efe9dd",
  card: "#fffdf8",
  text: "#2b2833",
  muted: "#6f6878",
  gold: "#a87b2c",
  line: "#e6ddcc",
  soft: "#f6f0e4",
  dusk: "#efeaf6",
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraph(text: string, style = "") {
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.65;color:${C.text};${style}">${escape(text)}</p>`;
}

function heading(text: string) {
  return `<h2 style="margin:36px 0 14px;font-family:${SERIF};font-size:22px;font-weight:normal;line-height:1.3;color:${C.text};">${escape(text)}</h2>`;
}

export function renderInterpretationEmail(options: {
  to: string;
  dream: string;
  interpretation: DreamInterpretation;
  siteUrl?: string;
}): EmailMessage {
  const { dream, interpretation: i, siteUrl } = options;
  const conversationUrl = siteUrl
    ? new URL(routes.conversation, siteUrl).toString()
    : null;

  const observations = i.observations
    .map(
      (o) => `
      <tr><td style="padding:0 0 14px;">
        <p style="margin:0 0 4px;font-family:${SERIF};font-size:17px;color:${C.text};"><span style="color:${C.gold};">✦</span>&nbsp; ${escape(o.title)}</p>
        <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.muted};">${escape(o.text)}</p>
      </td></tr>`,
    )
    .join("");

  const careNote = i.careNote
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;"><tr><td style="padding:16px 18px;background:${C.soft};border-radius:12px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.text};">${escape(i.careNote)}</td></tr></table>`
    : "";

  const cta = conversationUrl
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0 0;border-top:1px solid ${C.line};">
        <tr><td style="padding:32px 0 0;text-align:center;">
          <p style="margin:0 0 8px;font-family:${SERIF};font-size:20px;color:${C.text};">Du möchtest noch tiefer gehen?</p>
          <p style="margin:0 0 22px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.muted};">Wenn dich dein Traum weiter beschäftigt, kannst du deine Gedanken auch persönlich mit mir besprechen.</p>
          <a href="${escape(conversationUrl)}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${C.gold};color:#ffffff;font-family:${SANS};font-size:15px;text-decoration:none;">Persönliches Gespräch entdecken</a>
        </td></tr>
      </table>`
    : "";

  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>Deine Traumdeutung</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(i.summary.slice(0, 140))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:20px;">
<tr><td style="padding:40px 32px 36px;">

  <p style="margin:0 0 28px;font-family:${SERIF};font-size:15px;color:${C.muted};">🌙&nbsp; ${escape(siteConfig.name)}</p>
  <h1 style="margin:0 0 24px;font-family:${SERIF};font-size:30px;font-weight:normal;line-height:1.2;color:${C.text};">Deine vollständige Traumdeutung</h1>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;"><tr>
    <td style="padding:4px 0 4px 16px;border-left:2px solid ${C.gold};">
      <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};">Dein Traum</p>
      <p style="margin:0;font-family:${SERIF};font-size:16px;font-style:italic;line-height:1.6;color:${C.muted};">${escape(dream)}</p>
    </td>
  </tr></table>

  ${careNote}
  ${paragraph(i.summary, `font-family:${SERIF};font-size:19px;line-height:1.55;`)}

  ${heading("Was in deinem Traum auffällt")}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${observations}</table>

  ${heading("Eine mögliche psychologische Perspektive")}
  ${i.psychological.map((p) => paragraph(p)).join("")}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;"><tr>
    <td style="padding:20px 22px;background:${C.soft};border-radius:14px;">
      <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};">Ein Gedanke, der bleibt</p>
      <p style="margin:0;font-family:${SERIF};font-size:18px;line-height:1.5;color:${C.text};">${escape(i.keyInsight)}</p>
    </td>
  </tr></table>

  ${heading("Die symbolische Ebene")}
  ${i.symbolic.map((p) => paragraph(p)).join("")}

  ${heading("Wenn du auch die mystische Seite betrachten möchtest")}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="padding:22px 22px 6px;background:${C.dusk};border-radius:14px;">${i.mystical.map((p) => paragraph(p)).join("")}</td>
  </tr></table>

  <p style="margin:40px 0 10px;text-align:center;font-family:${SERIF};font-size:17px;font-style:italic;color:${C.muted};">Die interessanteste Frage ist vielleicht …</p>
  <p style="margin:0;text-align:center;font-family:${SERIF};font-size:23px;line-height:1.4;color:${C.gold};">${escape(i.reflectionQuestion)}</p>

  ${cta}

  <p style="margin:40px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};">Diese Deutung ist eine Einladung zur Selbstreflexion – keine Tatsachenbehauptung und kein Ersatz für psychologische oder medizinische Beratung.</p>
</td></tr>
</table>
<p style="max-width:560px;margin:20px auto 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};text-align:center;">Du erhältst diese E-Mail, weil du auf „${escape(siteConfig.name)}“ deine Traumdeutung angefordert hast. ${escape(DELIVERY_NOTICE)}</p>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    "DEINE VOLLSTÄNDIGE TRAUMDEUTUNG",
    "",
    "Dein Traum:",
    dream,
    "",
    ...(i.careNote ? [i.careNote, ""] : []),
    i.summary,
    "",
    "WAS IN DEINEM TRAUM AUFFÄLLT",
    ...i.observations.map((o) => `– ${o.title}: ${o.text}`),
    "",
    "EINE MÖGLICHE PSYCHOLOGISCHE PERSPEKTIVE",
    ...i.psychological,
    "",
    `Ein Gedanke, der bleibt: ${i.keyInsight}`,
    "",
    "DIE SYMBOLISCHE EBENE",
    ...i.symbolic,
    "",
    "WENN DU AUCH DIE MYSTISCHE SEITE BETRACHTEN MÖCHTEST",
    ...i.mystical,
    "",
    "Die interessanteste Frage ist vielleicht …",
    i.reflectionQuestion,
    "",
    ...(conversationUrl
      ? [
          "Du möchtest noch tiefer gehen? Wenn dich dein Traum weiter beschäftigt, kannst du deine Gedanken auch persönlich mit mir besprechen:",
          conversationUrl,
          "",
        ]
      : []),
    "Diese Deutung ist eine Einladung zur Selbstreflexion – keine Tatsachenbehauptung und kein Ersatz für psychologische oder medizinische Beratung.",
    "",
    `Du erhältst diese E-Mail, weil du auf „${siteConfig.name}“ deine Traumdeutung angefordert hast. ${DELIVERY_NOTICE}`,
  ].join("\n");

  return {
    to: options.to,
    subject: "Deine Traumdeutung 🌙",
    html,
    text,
  };
}
