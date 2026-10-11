import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Traumdeutung",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07080f",
    theme_color: "#07080f",
    lang: "de",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
