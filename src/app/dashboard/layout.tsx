import type { Metadata } from "next";
import { NOINDEX_METADATA } from "@/lib/seo/config";

export const metadata: Metadata = {
  ...NOINDEX_METADATA,
  title: "Admin Dashboard | AtlasBuild",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
