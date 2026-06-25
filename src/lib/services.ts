export const SERVICE_SLUGS = [
  "technical-coaching",
  "accelerated-program",
  "cto-as-service",
  "software-consulting",
  "training",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const slugToTranslationKey: Record<ServiceSlug, string> = {
  "technical-coaching": "technicalCoaching",
  "accelerated-program": "acceleratedProgram",
  "cto-as-service": "ctoAsService",
  "software-consulting": "softwareConsulting",
  "training": "training",
};
