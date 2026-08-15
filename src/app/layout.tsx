import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import InitialSplashScreen from "@/components/InitialSplashScreen";
import { AuthProvider } from "@/context/AuthContext";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  TITLE_TEMPLATE,
} from "@/lib/seo/config";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Construction CMS",
    "Construction Website CMS",
    "Construction Website Builder",
    "Construction Company Website Software",
    "Construction Project Portfolio",
    "Construction RFP Management",
    "Construction Client Portal",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "AtlasBuild Construction CMS Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <JsonLd />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body text-on-surface antialiased relative min-h-screen">
        <AuthProvider>
          <InitialSplashScreen />
          <NextTopLoader 
            color="#7dd3fc"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 12px #7dd3fc, 0 0 6px #7dd3fc"
            zIndex={99999}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
