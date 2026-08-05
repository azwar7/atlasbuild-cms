export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "AtlasBuild Enterprise Systems Inc.",
    "alternateName": "AtlasBuild CMS",
    "url": "https://atlasbuild.com",
    "logo": "https://atlasbuild.com/images/logo.png",
    "description": "Enterprise civil solutions and infrastructure platform delivering systematic clarity for large-scale construction data.",
    "telephone": "+1-800-555-ATLAS",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Infrastructure Blvd, Suite 500",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Commercial Construction",
      "Civil Infrastructure",
      "Industrial Plant Engineering",
      "Safety EMR Compliance",
      "Bonding and Project Controls"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Civil Engineering & RFP Estimating Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "RFP Estimating Wizard"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Client Portal Workspace Telemetry"
          }
        }
      ]
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AtlasBuild CMS",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
