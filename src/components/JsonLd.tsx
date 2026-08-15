import { SITE_NAME, SITE_URL } from "@/lib/seo/config";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "AtlasBuild Enterprise Systems",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Enterprise construction CMS and client project portal platform for general contractors and civil engineering firms.",
    knowsAbout: [
      "Construction Management Software",
      "Content Management Systems for Construction",
      "Civil Infrastructure Project Portfolios",
      "Construction RFP Management",
      "Contractor Client Portals",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Enterprise construction CMS platform for managing construction company websites, dynamic project showcases, and client portals.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/portfolio?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Specialized construction CMS and project lifecycle platform featuring interactive blueprint distribution, AI RFP risk scoring, and milestone tracking.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
