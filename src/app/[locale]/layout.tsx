import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/meta";
import { DynamicLang } from "@/components/DynamicLang";
import "../index.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "es" ? "es-ES" : "en-US";

  return {
    alternates: {
      languages: {
        "x-default": `${baseUrl}/es`,
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    other: {
      language: lang,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <DynamicLang lang={locale === "es" ? "es" : "en"} />
      {children}
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
