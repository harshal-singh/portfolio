import { ImageResponse } from "next/og";
import { getPortfolioContent } from "@/lib/content/getContent";

export const alt = "Harshal Singh — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { profile } = await getPortfolioContent();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2B6BDC",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 36, color: "#a1a1aa", marginTop: 20 }}>
          {profile.role}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#71717a",
            marginTop: 32,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {profile.shortBio}
        </div>
      </div>
    ),
    { ...size },
  );
}
