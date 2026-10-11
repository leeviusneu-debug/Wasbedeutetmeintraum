import type { MetadataRoute } from "next";
import { routes, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Persönliche Ergebnisse, Demo und API nicht indexieren.
      disallow: ["/api/", routes.interpretation, routes.demo],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
