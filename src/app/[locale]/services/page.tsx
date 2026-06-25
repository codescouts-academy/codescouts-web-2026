import { JsonLd } from "@/components/JsonLd";
import Services from "@/components/sections/Services";
import { Language, LocaleProps } from "@/i18n";
import { getMessages } from "next-intl/server";
import {
  breadcrumbSchema,
  faqSchema,
  generateServicesMeta,
  serviceSchema,
} from "@/lib/meta";
import { Metadata } from "next";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  const messages = await getMessages({ locale });
  const servicesMessages = messages.services as Record<string, unknown>;

  const services = [
    "technicalCoaching",
    "acceleratedProgram",
    "ctoAsService",
    "softwareConsulting",
    "training",
  ];

  const faqQuestions = services.map((key) => {
    const service = servicesMessages[key] as Record<string, string> | undefined;
    return {
      question: service?.title ?? key,
      answer: service?.fullDescription ?? service?.description ?? "",
    };
  });

  return (
    <>
      <JsonLd data={serviceSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          {
            name: locale === "es" ? "Servicios" : "Services",
            url: `${process.env.SITE_URL ?? "https://www.codescouts.academy"}/${locale}/services`,
          },
        ])}
      />
      <JsonLd data={faqSchema(faqQuestions)} />
      <Services locale={locale as Language} />
    </>
  );
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateServicesMeta(locale);
}
