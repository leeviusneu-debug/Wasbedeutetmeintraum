import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Einheitliches Vorschaubild (Social Media, Suchergebnisse) im Seitenstil. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        background:
          "radial-gradient(120% 80% at 50% 0%, #1b1f3a 0%, #0b0d1a 50%, #07080f 100%)",
        color: "#f7f2e8",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "#f1d49b",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 76,
          lineHeight: 1.1,
          fontFamily: "Georgia, serif",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 32,
          color: "#c9bda6",
          maxWidth: 900,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 96,
          display: "flex",
          fontSize: 26,
          color: "#a89c86",
        }}
      >
        wasbedeutetmeintraum.de
      </div>
    </div>,
    OG_SIZE,
  );
}
