import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = createPageMetadata({
  title: "Contact AtlasBuild | Enterprise Construction CMS Solutions",
  description:
    "Get in touch with AtlasBuild's construction technology team for platform demonstrations, enterprise deployments, and civil engineering consultations.",
  path: "/contact",
  keywords: [
    "Contact AtlasBuild",
    "Construction CMS Consultation",
    "Enterprise ConTech Support",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
