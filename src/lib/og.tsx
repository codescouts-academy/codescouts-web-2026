import { ImageResponse } from "next/og";

/**
 * Social preview cards (1200x630), one per page, served by
 * `src/app/og/[...path]/route.tsx`.
 *
 * Previews used to point at the 500x500 logo while declaring 1200x630, so
 * Facebook/LinkedIn/X cropped it or ignored it.
 *
 * They are NOT `opengraph-image.tsx` files: with `trailingSlash: true` those
 * URLs 308-redirect to a trailing-slash version, and several social crawlers
 * don't follow redirects for images. A path ending in `.png` is exempt.
 */
export const ogSize = { width: 1200, height: 630 };
export const OG_FILE = "og.png";

const BACKGROUND = "#090a0d";
const PRIMARY = "#facc15";
const MUTED = "#9ca3af";

export const renderOgImage = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BACKGROUND,
          color: "#f9fafb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 32 }}>
          <span style={{ color: PRIMARY, fontWeight: 700 }}>{"</>"}</span>
          <span style={{ marginLeft: 16, fontWeight: 700 }}>CodeScouts</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 28,
                color: PRIMARY,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 30, color: MUTED, marginTop: 28, lineHeight: 1.3 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>codescouts.academy</span>
          <span style={{ width: 120, height: 8, background: PRIMARY }} />
        </div>
      </div>
    ),
    ogSize,
  );
