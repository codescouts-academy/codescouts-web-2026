import { generateContactMeta } from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LocaleProps } from "@/i18n";
import Contact from "@/components/sections/Contact";

const Page = () => {
  return <Contact />;
};

export default Page;

export async function generateMetadata({
  params,
}: LocaleProps): Promise<Metadata> {
  const { locale } = await params;

  return generateContactMeta(locale);
}
