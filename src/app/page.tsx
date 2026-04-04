import { routing } from "@/i18n/routing";
import { generateRootRedirectMeta } from "@/lib/meta";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/" + routing.defaultLocale);
}

export async function generateMetadata(): Promise<Metadata> {
  return generateRootRedirectMeta();
}
