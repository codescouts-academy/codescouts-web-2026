import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "dist",
  env: {
    SITE_URL: 'https://www.codescouts.academy',
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE,
  },
  async redirects() {
    return [
      {
        source: '/services/:slug+',
        destination: '/services',
        permanent: false,
      },
      {
        source: 'es/services/:slug+',
        destination: '/es/services',
        permanent: false,
      },
      {
        source: 'en/services/:slug+',
        destination: '/en/services',
        permanent: false,
      },
      {
        source: '/clients/:slug+',
        destination: '/clients',
        permanent: false,
      },
      {
        source: 'es/clients/:slug+',
        destination: '/es/clients',
        permanent: false,
      },
      {
        source: 'en/clients/:slug+',
        destination: '/en/clients',
        permanent: false,
      },
      {
        source: '/courses/:slug+',
        destination: '/courses',
        permanent: false,
      },
      {
        source: 'es/courses/:slug+',
        destination: '/es/courses',
        permanent: false,
      },
      {
        source: 'en/courses/:slug+',
        destination: '/en/courses',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/services', destination: '/es/services' },
      { source: '/contact', destination: '/es/contact' },
      { source: '/courses', destination: '/es/courses' },
      { source: '/clients', destination: '/es/clients' },
      { source: '/blog', destination: '/es/blog' },
      { source: '/blog/:slug', destination: '/es/blog/:slug' },
      { source: '/', destination: '/es' },
    ];
  },
};

export default withNextIntl(nextConfig);
