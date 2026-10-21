import { baseUrl } from "@/lib/meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "CodeScouts",
  title: {
    default: "CodeScouts",
    template: "%s",
  },
  description:
    "Technical coaching, consultoría de software y cursos para equipos de desarrollo.",
  // Only rendered when the env var is set (Search Console HTML-tag method).
  // Not needed if the domain is already verified via DNS.
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Minimal pass-through root layout.
 *
 * With `output: "export"` + `localePrefix: "always"`, every real page lives
 * under /[locale]/, so `<html lang>` and `<body>` are rendered there instead.
 * This is the pattern next-intl documents for static export, and it also stops
 * `not-found.tsx` (which renders its own <html>) from producing nested
 * <html>/<body> tags.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
