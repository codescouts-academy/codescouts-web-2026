import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import { baseUrl, organizationSchema, websiteSchema } from "@/lib/meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "CodeScouts",
  title: {
    default: "CodeScouts",
    template: "%s",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={routing.defaultLocale}
      className="scrollbar-thin scrollbar-thumb-main-grey-1 hover:scrollbar-thumb-muted-foreground scrollbar-track-transparent"
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
