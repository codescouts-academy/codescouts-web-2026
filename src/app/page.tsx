import { permanentRedirect } from "next/navigation";

/**
 * Fallback only. `/` is already handled by a permanent redirect in
 * next.config.ts, which runs at the edge before rendering. This keeps the
 * route safe if that config entry is ever removed.
 *
 * Uses `permanentRedirect` (308) rather than `redirect` (307) so the domain
 * root consolidates its authority into /es/ instead of staying indexed as a
 * separate URL.
 */
export default function RootPage() {
  permanentRedirect("/es/");
}
