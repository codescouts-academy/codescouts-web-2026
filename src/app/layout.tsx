import { JsonLd } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import { organizationSchema, websiteSchema } from "@/lib/meta";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
