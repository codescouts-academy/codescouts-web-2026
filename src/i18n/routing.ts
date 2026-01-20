import { Languages } from "@/i18n";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: Languages,
  defaultLocale: "es",
});
