import type { Metadata } from "next";
import { baseUrl } from "@/lib/meta";
import { LocaleProps } from "@/i18n";
import { LegalContent } from "./LegalContent";

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "es"
        ? "CodeScouts | Aviso Legal"
        : "CodeScouts | Legal Notice",
    description:
      locale === "es"
        ? "Aviso legal, condiciones de uso y política de privacidad de CodeScouts."
        : "Legal notice, terms of use and privacy policy of CodeScouts.",
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/legal`,
      languages: {
        es: `${baseUrl}/es/legal`,
        en: `${baseUrl}/en/legal`,
        "x-default": `${baseUrl}/es/legal`,
      },
    },
  };
}

const Page = () => <LegalContent />;

export default Page;
