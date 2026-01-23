export const Languages = ["es", "en"];
export type Language = (typeof Languages)[number];

export type LocaleProps = {
  params: Promise<{ locale: Language }>;
};
