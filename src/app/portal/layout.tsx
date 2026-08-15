import type { Metadata } from "next";
import { NOINDEX_METADATA } from "@/lib/seo/config";

export const metadata: Metadata = {
  ...NOINDEX_METADATA,
  title: "Client Workspace Portal | AtlasBuild",
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
