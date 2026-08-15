import type { Metadata } from "next";
import Link from "next/link";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import PortfolioFaqAccordion, { PORTFOLIO_FAQ_DATA } from "./PortfolioFaqAccordion";
import { getPlannedPageMetadata } from "@/lib/seo/routes";
import { SITE_NAME, SITE_URL } from "@/lib/seo/config";

export const revalidate = 0;

export const metadata: Metadata = getPlannedPageMetadata("projectPortfolioFeature");

export default function ProjectPortfolioFeaturePage() {
  const canonicalUrl = `${SITE_URL}/features/project-portfolio`;

  // Page-level Structured Data (JSON-LD)
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Construction Project Portfolio Software | AtlasBuild",
    url: canonicalUrl,
    description:
      "Showcase construction projects with AtlasBuild's project portfolio software. Organize project experience, highlight capabilities, and build a professional construction portfolio.",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: `${SITE_URL}/features/project-portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Project Portfolio",
        item: canonicalUrl,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AtlasBuild Construction Project Portfolio Software",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Construction project portfolio management system for general contractors, civil engineers, and commercial builders to showcase projects and track completion metrics.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PORTFOLIO_FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Full-Screen Fixed Background Image with Dark Gradient Overlay */}
      <div
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-night-construction.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0f131c]/85 to-[#0a0e1a]/95 backdrop-blur-[2px]" />
      </div>

      {/* Main Page Layout Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        <LandingHeader />

        <main className="w-full pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex-1 flex flex-col gap-24">
          
          {/* ========================================================================= */}
          {/* SECTION 1: HERO & BREADCRUMBS */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-6">
            
            {/* Accessible Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-white/50">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Features</span>
              <span>/</span>
              <span className="text-primary font-semibold">Project Portfolio</span>
            </nav>

            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-8">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                  CONSTRUCTION PROJECT PORTFOLIO
                </span>
              </div>

              <div className="max-w-4xl flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-white leading-[1.15] tracking-tight">
                  Construction Project Portfolio Built to Showcase Your Work
                </h1>

                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed font-body max-w-3xl mt-2">
                  General contractors, civil engineers, and commercial builders need more than a generic photo gallery. AtlasBuild provides specialized <strong>construction project portfolio software</strong> to organize complex project experience, highlight engineering capabilities across diverse sectors, and turn completed builds into credible business assets.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(125,211,252,0.35)]"
                >
                  <span>Explore Project Portfolio</span>
                  <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                </Link>

                <Link
                  href="/construction-website-builder"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/5 border border-white/15 text-white rounded-full font-label text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <span>Build Your Construction Website</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              {/* Verified Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs font-mono text-white/70">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">donut_large</span>
                  <span>Live Completion Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">category</span>
                  <span>6 Industrial Sectors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">travel_explore</span>
                  <span>Location &amp; Title Filter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                  <span>Direct RFP Lead Capture</span>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: WHY CONSTRUCTION PROJECT PORTFOLIOS MATTER */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Turn Your Construction Experience Into a Digital Portfolio
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                When developers, institutional owners, and public agencies evaluate contractors, they require clear evidence of engineering competency, safety compliance, and past delivery. A structured construction company portfolio provides the essential validation required during the pre-qualification phase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Demonstrate Scale &amp; Capacity</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Present documented square footage, structural parameters, and budget milestones to prove your capacity to execute complex builds on schedule.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">domain</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Highlight Sector Specialization</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Categorize work by industry — from heavy civil transit and marine infrastructure to commercial office towers and healthcare facilities.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">auto_stories</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Build Credibility &amp; Trust</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Replace disjointed PDF lookbooks with high-performance digital case studies that prospective clients can explore on any desktop or mobile device.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: CORE PORTFOLIO CAPABILITIES */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Core Capabilities of Construction Project Portfolio Software
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                AtlasBuild equips contractors with specialized tooling to showcase construction projects online while preserving data integrity and systematic clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Capability 1 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">category</span>
                  <h3 className="text-lg font-headline font-bold text-white">Organize Projects by Sector</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Group projects across Commercial, Residential, Civil, Infrastructure, Healthcare, and Education sectors with unified schema taxonomy.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">percent</span>
                  <h3 className="text-lg font-headline font-bold text-white">Live Completion Tracking</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Display current progress percentage bars for active construction projects, providing transparent progress metrics to stakeholders.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">photo_library</span>
                  <h3 className="text-lg font-headline font-bold text-white">High-Resolution Visual Media</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Present structural steel framing, concrete pours, building envelopes, and finished interiors with optimized WebP image rendering.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">search</span>
                  <h3 className="text-lg font-headline font-bold text-white">Instant Title &amp; Location Search</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Allow clients and procurement boards to quickly filter projects by geographic market, project title, or specific civil facility type.
                </p>
              </div>

              {/* Capability 5 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">edit_note</span>
                  <h3 className="text-lg font-headline font-bold text-white">Native CMS Management</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Marketing and estimation teams can update project statuses, upload new site photography, and publish new case studies in seconds.
                </p>
              </div>

              {/* Capability 6 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">arrow_forward</span>
                  <h3 className="text-lg font-headline font-bold text-white">Direct RFP Conversion Path</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Turn impressed portfolio visitors into inbound RFP leads with direct conversion links to your structured quote intake wizard.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: REAL PROJECT SHOWCASE */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10">
              <div className="max-w-2xl flex flex-col gap-2">
                <h2 className="text-3xl font-headline font-bold text-white tracking-tight">
                  Real Construction Projects Showcased on AtlasBuild
                </h2>
                <p className="text-sm sm:text-base font-body text-on-surface-variant leading-relaxed">
                  Discover how general contractors present commercial, civil infrastructure, and energy builds using AtlasBuild's public project registry.
                </p>
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/15 rounded-full text-xs font-label font-bold text-white hover:bg-white/10 transition-colors group backdrop-blur-md whitespace-nowrap"
              >
                <span>View Full Portfolio</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform text-primary">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Public Project Showcase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <Link
                href="/portfolio?query=Coastal"
                className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl"
              >
                <div className="relative w-full h-56 overflow-hidden bg-surface-dim">
                  <img
                    alt="Coastal Bridge Expansion — Heavy Civil Infrastructure Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/suspension-bridge.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    CIVIL INFRASTRUCTURE
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Coastal Bridge Expansion
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Heavy marine piling, structural steel bridge erection, and seismic telemetry monitoring systems.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>Portland, OR</span>
                    <span className="text-primary font-bold">90% Complete</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/portfolio?query=Skyline"
                className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl"
              >
                <div className="relative w-full h-56 overflow-hidden bg-surface-dim">
                  <img
                    alt="Skyline Financial Center — Commercial High-Rise Tower Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/steel-framing.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    COMMERCIAL CORE
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Skyline Financial Center
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    42-story commercial tower featuring double-glazed curtain walls, LEED Gold HVAC, and automated controls.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>Boston, MA</span>
                    <span className="text-primary font-bold">45% Complete</span>
                  </div>
                </div>
              </Link>

              <Link
                href="/portfolio?query=Atlas"
                className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl"
              >
                <div className="relative w-full h-56 overflow-hidden bg-surface-dim">
                  <img
                    alt="Atlas Power Facility — Heavy Industrial and Clean Energy Build"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/power-plant.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    ENERGY &amp; UTILITIES
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Atlas Power Facility
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Clean energy grid integration, high-capacity electrical switchgear housing, and fortified control substations.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>Austin, TX</span>
                    <span className="text-primary font-bold">100% Completed</span>
                  </div>
                </div>
              </Link>

            </div>

            <div className="text-center pt-2">
              <Link
                href="/portfolio"
                className="text-sm font-label font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <span>Explore all projects in the master construction project portfolio</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 5: PROJECT SHOWCASE & ATTRIBUTES */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Showcase the Work Behind Your Construction Company
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                AtlasBuild's project schema supports the specific attributes construction buyers look for when reviewing past performance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 01</span>
                <h3 className="text-base font-headline font-bold text-white">Project Scope &amp; Overview</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Detailed technical narrative outlining civil engineering methods, structural challenges, and execution timeline.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 02</span>
                <h3 className="text-base font-headline font-bold text-white">Sector Classification</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Strict categorization across Commercial, Infrastructure, Civil, Residential, Healthcare, and Education.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 03</span>
                <h3 className="text-base font-headline font-bold text-white">Completion Status</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Real-time percentage progress indicators and project phase delivery milestones.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 04</span>
                <h3 className="text-base font-headline font-bold text-white">Geographic Location</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  City and regional indexing to demonstrate local subcontractor coordination and permitting experience.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 05</span>
                <h3 className="text-base font-headline font-bold text-white">Square Footage &amp; Scale</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Documented floor area and structural dimensions to illustrate project scale and heavy machinery capacity.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-primary">FIELD 06</span>
                <h3 className="text-base font-headline font-bold text-white">Budget &amp; Schedule Window</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Estimated budget brackets and project commencement dates to demonstrate fiscal responsibility.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 6: CASE STUDY POSITIONING */}
          {/* ========================================================================= */}
          <section className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-xl flex flex-col gap-6">
            <div className="max-w-3xl flex flex-col gap-3">
              <h2 className="text-3xl font-headline font-bold text-white tracking-tight">
                From Simple Project Lists to Structured Construction Case Studies
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Generic contractor websites often publish basic unorganized photo grids with no context. AtlasBuild organizes every build into a structured construction case study format, providing technical details on engineering milestones, sector requirements, and structural specifications.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                This structured storytelling enables prospective developers to quickly verify that you have successfully completed projects of similar complexity in their exact industry.
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 7: SECTORS */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Showcase Civil &amp; Commercial Work Across Every Sector
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                Filter and showcase your construction project portfolio across the core industry sectors supported by the AtlasBuild platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Link
                href="/portfolio?sector=COMMERCIAL"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 01</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Commercial</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  High-rise office buildings, retail centers, and mixed-use commercial developments.
                </p>
              </Link>

              <Link
                href="/portfolio?sector=CIVIL"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 02</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Civil Engineering</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Earthwork, municipal utility systems, dams, and deep foundation engineering.
                </p>
              </Link>

              <Link
                href="/portfolio?sector=INFRASTRUCTURE"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 03</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Infrastructure</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Highways, suspension bridges, rail transit hubs, and aviation facilities.
                </p>
              </Link>

              <Link
                href="/portfolio?sector=HEALTHCARE"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 04</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Healthcare</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Hospital wings, specialized surgical units, and medical research cleanrooms.
                </p>
              </Link>

              <Link
                href="/portfolio?sector=RESIDENTIAL"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 05</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Residential Multi-Family</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Multi-story residential complexes, condominium towers, and master-planned communities.
                </p>
              </Link>

              <Link
                href="/portfolio?sector=EDUCATION"
                className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">SECTOR 06</span>
                  <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">Education</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  University campuses, specialized research laboratories, and athletic facilities.
                </p>
              </Link>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 8: CONNECT PORTFOLIO TO WEBSITE & RFPS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-r from-[#0f1524] via-[#11192e] to-[#0f1524] p-8 lg:p-12 rounded-3xl border border-primary/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 w-fit">
                <span className="material-symbols-outlined text-[16px] text-primary">route</span>
                <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                  EXPERIENCE TO OPPORTUNITY
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Connect Your Portfolio to Inbound Project Opportunities
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                A project portfolio should not be an isolated gallery. Within AtlasBuild, your portfolio connects directly with our <Link href="/construction-website-builder" className="text-primary underline">construction website builder</Link> and quote intake engine, allowing prospective clients to move seamlessly from discovering past builds to submitting an RFP.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <Link
                href="/quotes"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(125,211,252,0.4)]"
              >
                <span>Submit an RFP or Estimate</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 9: HOW IT WORKS */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                How to Showcase Your Projects with AtlasBuild
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                A structured 4-step workflow to publish and manage your construction project portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">01</div>
                <h3 className="text-lg font-headline font-bold text-white">Create Project Profile</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Enter project title, geographical location, square footage, and budget parameters in the CMS.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">02</div>
                <h3 className="text-lg font-headline font-bold text-white">Assign Sector &amp; Status</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Tag the project by sector (Commercial, Civil, Infrastructure) and set the live completion percentage.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">03</div>
                <h3 className="text-lg font-headline font-bold text-white">Upload Visual Assets</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Attach high-resolution photography showcasing site work, structural core framing, and final handover.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">04</div>
                <h3 className="text-lg font-headline font-bold text-white">Publish to Live Registry</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Deploy instantly to your searchable public project portfolio with automated SEO indexing and mobile responsiveness.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 10: PORTFOLIO VS GENERIC GALLERY */}
          {/* ========================================================================= */}
          <section className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-xl flex flex-col gap-6">
            <div className="max-w-3xl flex flex-col gap-3">
              <h2 className="text-3xl font-headline font-bold text-white tracking-tight">
                More Than a Gallery of Construction Photos
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Generic website builders treat construction projects as simple photo albums. But construction buyers need structured engineering data: square footage, sector taxonomy, progress metrics, and regional experience.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                AtlasBuild's dedicated construction CMS models real civil parameters, allowing your company to demonstrate authentic competency without wrestling with brittle third-party photo gallery plugins.
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 11: FAQS */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Frequently Asked Questions About Construction Project Portfolios
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                Common questions regarding construction portfolio software, project filtering, and showcase management.
              </p>
            </div>

            <PortfolioFaqAccordion />
          </section>

          {/* ========================================================================= */}
          {/* SECTION 12: FINAL CTA */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-br from-[#0f131c]/90 via-[#111827]/90 to-[#0f131c]/90 backdrop-blur-[20px] p-10 lg:p-16 rounded-3xl border border-white/15 shadow-2xl flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">view_kanban</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-white tracking-tight leading-tight max-w-2xl">
              Build a Professional Project Portfolio for Your Construction Business
            </h2>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Showcase your civil and commercial builds with AtlasBuild's specialized construction CMS platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_25px_rgba(125,211,252,0.4)]"
              >
                <span>Explore Project Registry</span>
                <span className="material-symbols-outlined text-[18px]">view_kanban</span>
              </Link>

              <Link
                href="/construction-website-builder"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white/5 border border-white/15 text-white rounded-full font-label text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <span>Construction Website Builder</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </section>

        </main>

        <CookiePreferencesModal />
        <LandingFooter />

      </div>
    </div>
  );
}
