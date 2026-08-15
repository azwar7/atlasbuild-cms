import { createPageMetadata, PageMetadataOptions } from "./config";

/**
 * Pre-configured SEO Metadata Architecture for AtlasBuild Planned Target Pages
 */
export const PLANNED_SEO_PAGES: Record<string, PageMetadataOptions> = {
  // 1. Core Builder Page
  constructionWebsiteBuilder: {
    title: "Construction Website Builder & CMS Platform | AtlasBuild",
    description:
      "Build a high-performance construction company website with native project portfolios, client portals, and AI RFP intake. Engineered for general contractors.",
    path: "/construction-website-builder",
    keywords: [
      "construction website builder",
      "website builder for construction companies",
      "construction company website software",
      "contractor website builder",
    ],
  },

  // 2. Project Portfolio Feature
  projectPortfolioFeature: {
    title: "Construction Project Portfolio & Showcase Software | AtlasBuild",
    description:
      "Showcase heavy civil builds, commercial developments, and industrial case studies with sector filtering, completion rates, and CAD blueprint distribution.",
    path: "/features/project-portfolio",
    keywords: [
      "construction project portfolio software",
      "construction project showcase",
      "construction case study CMS",
      "contractor project gallery software",
    ],
  },

  // 3. AI RFP Management Feature
  rfpManagementFeature: {
    title: "AI Construction RFP Intake & Lead Risk Scoring Software | AtlasBuild",
    description:
      "Automate commercial RFP qualification, technical scope extraction, and lead risk scoring with multi-provider AI on your construction website.",
    path: "/features/rfp-management",
    keywords: [
      "construction RFP software for contractors",
      "construction RFP management",
      "AI RFP analyzer for construction",
      "automated lead scoring for contractors",
    ],
  },

  // 4. Client Portal Feature
  clientPortalFeature: {
    title: "Construction Client Portal & Project Workspace Software | AtlasBuild",
    description:
      "Provide executive clients and field engineers with authenticated project workspaces, CAD drawing distribution, phase Gantt timelines, and live EMR safety feeds.",
    path: "/features/client-portal",
    keywords: [
      "construction client portal software",
      "contractor client portal",
      "construction project dashboard",
      "construction blueprint viewer for clients",
    ],
  },

  // 5. Commercial Construction Solution
  commercialConstructionSolution: {
    title: "Commercial Construction Website Software & CMS | AtlasBuild",
    description:
      "Custom CMS and marketing website platform built specifically for commercial general contractors, high-rise developers, and tenant improvement firms.",
    path: "/solutions/commercial-construction",
    keywords: [
      "commercial construction website software",
      "commercial contractor website design",
      "general contractor CMS",
    ],
  },

  // 6. Civil Infrastructure Solution
  civilInfrastructureSolution: {
    title: "Civil Infrastructure Project Management & Showcase Platform | AtlasBuild",
    description:
      "Enterprise web platform for civil engineering firms, transportation authorities, and heavy industrial contractors to manage public projects and tenders.",
    path: "/solutions/civil-infrastructure",
    keywords: [
      "civil infrastructure project website",
      "civil engineering company website",
      "heavy civil CMS platform",
    ],
  },

  // 7. WordPress Comparison
  compareWordPress: {
    title: "AtlasBuild CMS vs WordPress: Dedicated Construction Platform | AtlasBuild",
    description:
      "Compare AtlasBuild's modern construction-specific CMS with legacy WordPress. Zero plugin maintenance, native client portals, sub-second Next.js speeds.",
    path: "/compare/atlasbuild-vs-wordpress",
    keywords: [
      "construction CMS vs WordPress",
      "why WordPress fails for contractor websites",
      "headless construction CMS vs WordPress",
    ],
  },

  // 8. Wix Comparison
  compareWix: {
    title: "AtlasBuild CMS vs Wix: Construction Website Builder Comparison | AtlasBuild",
    description:
      "See why commercial contractors choose AtlasBuild over generic website builders like Wix for enterprise CAD distribution, EMR tracking, and AI RFP scoring.",
    path: "/compare/atlasbuild-vs-wix",
    keywords: [
      "construction website builder vs Wix",
      "Wix for construction companies review",
      "specialized contractor CMS vs Wix",
    ],
  },
};

/**
 * Helper to generate page metadata for any of the planned routes
 */
export function getPlannedPageMetadata(key: keyof typeof PLANNED_SEO_PAGES) {
  const options = PLANNED_SEO_PAGES[key];
  if (!options) {
    throw new Error(`Planned SEO page key "${String(key)}" not found in registry.`);
  }
  return createPageMetadata(options);
}
