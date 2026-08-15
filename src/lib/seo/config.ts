import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://atlasbuild.com").replace(/\/+$/, "");
export const SITE_NAME = "AtlasBuild CMS";
export const DEFAULT_TITLE = "Construction CMS | AtlasBuild";
export const TITLE_TEMPLATE = "%s | AtlasBuild";
export const DEFAULT_DESCRIPTION =
  "AtlasBuild is an enterprise construction CMS designed for general contractors and civil engineering firms to manage public websites, project portfolios, client portals, and AI RFP intake.";
export const DEFAULT_OG_IMAGE = "/images/hero-night-construction.jpg";

export const NOINDEX_METADATA: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export interface PageMetadataOptions {
  title?: string | { default: string; template: string };
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: Metadata["robots"];
}

/**
 * Creates standardized, canonical-compliant Metadata for Next.js App Router pages.
 */
export function createPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    keywords,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    robots = { index: true, follow: true },
  } = options;

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = cleanPath === "/" ? SITE_URL : `${SITE_URL}${cleanPath}`;
  const titleString = typeof title === "string" ? title : title.default;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: titleString,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Platform`,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: titleString,
      description,
      images: [ogImage],
    },
    robots,
  };
}
