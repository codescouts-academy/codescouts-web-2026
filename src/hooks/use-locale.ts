import { Language } from "@/i18n";
import { useParams } from "next/navigation";

export const useLocale = (): Language => {
  const { locale } = useParams();

  return locale as Language;
};
