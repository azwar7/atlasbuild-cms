import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import InitialSplashScreen from "@/components/InitialSplashScreen";

export const metadata: Metadata = {
  title: {
    default: "AtlasBuild CMS | Enterprise Civil Infrastructure Platform",
    template: "%s | AtlasBuild Enterprise",
  },
  description: "Systematic clarity for large-scale infrastructure projects, RFP estimating wizards, and enterprise civil engineering project lifecycle management.",
  keywords: [
    "Civil Engineering",
    "Construction Management Platform",
    "Infrastructure CMS",
    "RFP Estimating",
    "Safety EMR Compliance",
    "Bonding Limit",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://atlasbuild.com"),
  openGraph: {
    title: "AtlasBuild CMS Enterprise Systems",
    description: "Engineering Enterprise Civil Solutions & Infrastructure Platform.",
    url: "https://atlasbuild.com",
    siteName: "AtlasBuild CMS",
    images: [
      {
        url: "/images/hero-night-construction.jpg",
        width: 1200,
        height: 630,
        alt: "AtlasBuild Infrastructure Night Construction Site",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtlasBuild CMS Enterprise",
    description: "Systematic clarity for enterprise civil infrastructure.",
    images: ["/images/hero-night-construction.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
