import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/construction-website-builder",
        "/portfolio",
        "/quotes",
        "/careers",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
      ],
      disallow: [
        "/dashboard",
        "/dashboard/",
        "/portal",
        "/portal/",
        "/api",
        "/api/",
        "/login",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

