import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // NOTE: `output: "export"` was removed on purpose.
  // Next.js silently ignores `redirects()` and `rewrites()` in static export
  // mode, which meant every legacy URL returned a 404 and no authority was
  // ever transferred. On Vercel the pages are still statically generated via
  // `generateStaticParams` + `dynamic = "force-static"`, so we keep the same
  // performance while regaining real server-side redirects.
  trailingSlash: true,
  env: {
    SITE_URL: 'https://www.codescouts.academy',
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE,
  },
  async redirects() {
    return [
      // ---------------------------------------------------------------
      // Legacy Hugo URLs (no locale prefix) -> Spanish site.
      // These MUST be `permanent: true` (308). The previous `permanent: false`
      // (307) tells Google the move is temporary, so it keeps the old URL
      // indexed and transfers no ranking signal.
      // Retired detail pages are listed BEFORE their index so the more
      // specific pattern wins.
      // ---------------------------------------------------------------
      // Every destination keeps its trailing slash on purpose: with
      // `trailingSlash: true` a slashless destination costs a SECOND 308 hop
      // (/blog/solid/ -> /es/blog/solid -> /es/blog/solid/). Redirect chains
      // dilute signals and waste crawl budget.
      { source: '/courses/:slug+', destination: '/es/courses/', permanent: true },
      { source: '/clients/:slug+', destination: '/es/clients/', permanent: true },
      { source: '/services/training', destination: '/es/courses/', permanent: true },
      { source: '/blog/:slug+', destination: '/es/blog/:slug+/', permanent: true },
      { source: '/blog', destination: '/es/blog/', permanent: true },
      { source: '/services', destination: '/es/services/', permanent: true },
      { source: '/contact', destination: '/es/contact/', permanent: true },
      { source: '/courses', destination: '/es/courses/', permanent: true },
      { source: '/clients', destination: '/es/clients/', permanent: true },

      // Domain root. Must be permanent so the authority of the most-linked URL
      // of the site consolidates into /es/ instead of being split.
      { source: '/', destination: '/es/', permanent: true },

      // ---------------------------------------------------------------
      // Retired sections inside an already-localized path.
      // ---------------------------------------------------------------
      { source: '/es/services/training', destination: '/es/courses/', permanent: true },
      { source: '/en/services/training', destination: '/en/courses/', permanent: true },
      { source: '/es/courses/:slug+', destination: '/es/courses/', permanent: true },
      { source: '/en/courses/:slug+', destination: '/en/courses/', permanent: true },
      { source: '/es/clients/:slug+', destination: '/es/clients/', permanent: true },
      { source: '/en/clients/:slug+', destination: '/en/clients/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
