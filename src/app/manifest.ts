import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeScouts",
    short_name: "CodeScouts",
    description:
      "Technical coaching, consultoría de software y cursos para equipos de desarrollo.",
    start_url: "/es/",
    display: "browser",
    background_color: "#090a0d",
    theme_color: "#090a0d",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
