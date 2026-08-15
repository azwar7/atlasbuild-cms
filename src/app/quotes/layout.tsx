import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = createPageMetadata({
  title: "Submit RFP Proposal & Construction Estimating Intake | AtlasBuild",
  description:
    "Submit project specifications, CAD blueprints, and budget parameters for instant AI scope evaluation and commercial construction estimating.",
  path: "/quotes",
  keywords: [
    "Construction RFP Intake",
    "Commercial Quote Request",
    "AI Construction Estimating",
    "Contractor Bid Submission",
  ],
});

export default function QuotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
