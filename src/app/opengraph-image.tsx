import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ratelane Docs — SDK reference and guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getGeistMonoFont(weight: 400 | 700) {
  const res = await fetch(
    `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@${weight}&display=swap`,
  );
  const css = await res.text();
  const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!fontUrl)
    throw new Error(
      `Could not resolve Geist Mono font URL for weight ${weight}`,
    );
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export default async function Image() {
  const [geistRegular, geistBold] = await Promise.all([
    getGeistMonoFont(400),
    getGeistMonoFont(700),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        padding: "80px",
        gap: "80px",
        fontFamily: "Geist Mono",
      }}
    >
      {/* Left — wordmark + copy */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "24px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "48px",
              background: "#6366f1",
              borderRadius: "2px",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            Ratelane.
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-1px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span>Documentation&nbsp;</span>
          <span style={{ color: "#6366f1" }}>& guides.</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#71717a",
            lineHeight: 1.5,
            maxWidth: "520px",
            display: "flex",
          }}
        >
          Everything you need to integrate, configure, and scale with Ratelane.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          {["Quickstart", "SDK Reference", "Concepts", "Dashboard"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#a1a1aa",
                  display: "flex",
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Right — doc page panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "360px",
          background: "#111111",
          border: "1px solid #27272a",
          borderLeft: "3px solid #6366f1",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #27272a",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#71717a",
              letterSpacing: "0.05em",
            }}
          >
            CONTENTS
          </span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1" }}>
            docs
          </span>
        </div>

        {/* Doc section rows */}
        {[
          {
            section: "Getting Started",
            label: "Introduction & quickstart",
            active: true,
          },
          {
            section: "SDK Reference",
            label: "Python · JS · Config",
            active: false,
          },
          { section: "Concepts", label: "Policy · EP · Fleet", active: false },
          {
            section: "Dashboard",
            label: "Routes · Analytics · Billing",
            active: false,
          },
        ].map((row, i) => (
          <div
            key={row.section}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "14px 20px",
              borderBottom: i < 3 ? "1px solid #1c1c1c" : "none",
              borderLeft: row.active
                ? "2px solid #6366f1"
                : "2px solid transparent",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: row.active ? "#e4e4e7" : "#71717a",
              }}
            >
              {row.section}
            </span>
            <span
              style={{ fontSize: "11px", fontWeight: 400, color: "#3f3f46" }}
            >
              {row.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist Mono",
          data: geistRegular,
          weight: 400,
          style: "normal",
        },
        { name: "Geist Mono", data: geistBold, weight: 700, style: "normal" },
      ],
    },
  );
}
