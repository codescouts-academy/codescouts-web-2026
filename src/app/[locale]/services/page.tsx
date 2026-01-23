import Services from "@/components/sections/Services";
import { LocaleProps } from "@/i18n";
import { generateServicesMeta } from "@/lib/meta";
import { Metadata } from "next";

const Page = async ({ params }: LocaleProps) => {
  const { locale } = await params;

  return <Services locale={locale} />;
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateServicesMeta(locale);
}
