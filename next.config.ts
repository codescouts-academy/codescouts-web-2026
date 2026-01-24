import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "dist",
  env: {
    SITE_URL: 'https://www.codescouts.academy',
  },
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/es/blog/:slug',
      },
      {
        source: '/services',
        destination: '/es/services',
      },
      {
        source: '/contact',
        destination: '/es/contact',
      },
      {
        source: '/courses',
        destination: '/es/courses',
      },
      {
        source: '/clients',
        destination: '/es/clients',
      },
      {
        source: '/',
        destination: '/es',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
