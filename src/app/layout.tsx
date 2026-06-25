import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { baseUrl, organizationSchema, websiteSchema } from "@/lib/meta";
import { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "CodeScouts",
  title: {
    default: "CodeScouts",
    template: "%s",
  },
  description:
    "Technical coaching, consultoría de software y formación técnica para equipos de desarrollo. Mejora la calidad de tu software con CodeScouts.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable} scrollbar-thin scrollbar-thumb-main-grey-1 hover:scrollbar-thumb-muted-foreground scrollbar-track-transparent`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
