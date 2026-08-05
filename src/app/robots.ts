import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://atlasbuild.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/portfolio", "/quotes", "/careers", "/about"],
      disallow: ["/dashboard/", "/portal/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
