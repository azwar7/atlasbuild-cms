import type { Metadata } from "next";
import { NOINDEX_METADATA } from "@/lib/seo/config";

export const metadata: Metadata = {
  ...NOINDEX_METADATA,
  title: "Account Login & Access | AtlasBuild",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
