import type { Metadata } from "next";
import Link from "next/link";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import FaqAccordion, { FAQ_DATA } from "./FaqAccordion";
import { getPlannedPageMetadata } from "@/lib/seo/routes";
import { SITE_NAME, SITE_URL } from "@/lib/seo/config";

export const revalidate = 0;

export const metadata: Metadata = getPlannedPageMetadata("constructionWebsiteBuilder");

export default function ConstructionWebsiteBuilderPage() {
  const canonicalUrl = `${SITE_URL}/construction-website-builder`;

  // Page-level Structured Data (JSON-LD)
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Construction Website Builder | AtlasBuild",
    url: canonicalUrl,
    description:
      "Build and manage a professional construction company website with AtlasBuild, a specialized CMS for project portfolios, RFP intake, and client workflows.",
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
        name: "Construction Website Builder",
        item: canonicalUrl,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AtlasBuild Construction Website Builder & CMS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Specialized website builder and content management system for construction companies, general contractors, and civil engineering firms.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
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
              <span className="text-primary font-semibold">Construction Website Builder</span>
            </nav>

            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-8">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                  CONSTRUCTION WEBSITE PLATFORM
                </span>
              </div>

              <div className="max-w-4xl flex flex-col gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-white leading-[1.15] tracking-tight">
                  Construction Website Builder Built for Construction Companies
                </h1>

                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed font-body max-w-3xl mt-2">
                  AtlasBuild is the specialized <strong>construction website builder</strong> and CMS engineered for general contractors, civil engineering firms, and commercial builders. Manage your public digital presence, showcase dynamic project portfolios, qualify client RFP submissions, and provide real-time project transparency.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/quotes"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(125,211,252,0.35)]"
                >
                  <span>Build Your Construction Website</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/5 border border-white/15 text-white rounded-full font-label text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <span>Explore Project Portfolios</span>
                  <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                </Link>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs font-mono text-white/70">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>350+ Projects Showcased</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">health_and_safety</span>
                  <span>0.71 EMR Safety Index</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">folder_zip</span>
                  <span>CAD &amp; Blueprint Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">speed</span>
                  <span>Sub-Second Page Speeds</span>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: MORE THAN A GENERIC BUILDER */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                More Than a Generic Website Builder
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                Generic website builders provide static digital brochures designed for generic small businesses. AtlasBuild is architected specifically around the way commercial general contractors and civil engineering firms operate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">dataset</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Construction-Native Data Models</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Publish project square footage, sector tags, budget ranges, completion percentages, and safety metrics without configuring complex database plugins.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Integrated RFP Opportunity Channel</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Capture inbound project bids with structured parameter intake and CAD blueprint attachments, giving estimators direct access to actionable scopes.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Client Project Workspaces</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Extend your website beyond marketing by offering authorized clients access to milestone schedules, blueprint downloads, and daily field updates.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: CORE CAPABILITIES BUILT FOR CONSTRUCTION */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Core Capabilities Built for Construction Businesses
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                Everything commercial builders need to manage their public brand, win client trust, and streamline pre-construction workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Capability 1 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">view_quilt</span>
                  <h3 className="text-lg font-headline font-bold text-white">Showcase Construction Projects</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Present active and completed developments with sector filtering across Commercial, Civil, Healthcare, Infrastructure, and Residential builds.
                </p>
              </div>

              {/* Capability 2 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
                  <h3 className="text-lg font-headline font-bold text-white">Professional Company Presence</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Communicate corporate bonding limits, OSHA safety compliance records, and leadership credentials to win high-value institutional bids.
                </p>
              </div>

              {/* Capability 3 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">dashboard_customize</span>
                  <h3 className="text-lg font-headline font-bold text-white">Construction-Focused CMS</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Update project photos, publish project case studies, and manage careers without relying on fragile third-party page builder plugins.
                </p>
              </div>

              {/* Capability 4 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">request_quote</span>
                  <h3 className="text-lg font-headline font-bold text-white">Capture Project Opportunities</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Turn casual website visitors into qualified RFP submissions with tailored parameter sliders, blueprint attachments, and instant confirmation.
                </p>
              </div>

              {/* Capability 5 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">hub</span>
                  <h3 className="text-lg font-headline font-bold text-white">Client Project Workspaces</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Deliver dedicated portal access for stakeholders to review phase Gantt milestones, safety incident feeds, and authorized structural drawings.
                </p>
              </div>

              {/* Capability 6 */}
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">security</span>
                  <h3 className="text-lg font-headline font-bold text-white">Enterprise Security &amp; Speed</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Built on modern Next.js 16 and PostgreSQL with Role-Based Access Control (RBAC), strict Content Security Policy, and zero layout shift.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: SHOWCASE PROJECTS SECTION */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0f131c]/75 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10">
              <div className="max-w-2xl flex flex-col gap-2">
                <h2 className="text-3xl font-headline font-bold text-white tracking-tight">
                  Showcase Your Construction Projects and Experience
                </h2>
                <p className="text-sm sm:text-base font-body text-on-surface-variant leading-relaxed">
                  Prospective commercial clients and project owners want proof of engineering capacity. AtlasBuild provides interactive project case study templates with live completion metrics and sector filtering.
                </p>
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/15 rounded-full text-xs font-label font-bold text-white hover:bg-white/10 transition-colors group backdrop-blur-md whitespace-nowrap"
              >
                <span>Explore Master Portfolio</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform text-primary">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Visual Portfolio Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <Link
                href="/portfolio?query=Coastal"
                className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl"
              >
                <div className="relative w-full h-56 overflow-hidden bg-surface-dim">
                  <img
                    alt="Coastal Bridge Expansion — Transportation Infrastructure Build"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/suspension-bridge.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    Civil Infrastructure
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Coastal Bridge Expansion
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Heavy marine piling, structural steel erection, and seismic telemetry integration.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>West Coast Authority</span>
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
                    alt="Skyline Financial Center — High-Rise Commercial Construction"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/steel-framing.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    Commercial Core
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Skyline Financial Center
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    42-story commercial tower featuring double-glazed curtain walls and smart building controls.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>Metro District</span>
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
                    alt="Atlas Power Facility — Heavy Industrial and Utilities Facility"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    src="/images/power-plant.jpg"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary font-bold">
                    Infrastructure
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors">
                    Atlas Power Facility
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Clean energy grid integration, high-capacity sub-stations, and fortified switchgear housing.
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/5">
                    <span>Desert Region</span>
                    <span className="text-primary font-bold">100% Completed</span>
                  </div>
                </div>
              </Link>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <Link
                href="/portfolio"
                className="text-sm font-label font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <span>Explore our master construction project portfolio</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <span className="text-white/20 hidden sm:inline">•</span>
              <Link
                href="/features/project-portfolio"
                className="text-sm font-label font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
              >
                <span>Learn about construction project portfolio software</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 5: COMMUNICATE SERVICES */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Communicate Your Civil and Commercial Capabilities
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                A construction company website must clearly outline its specialized capabilities, machinery capacities, and sector certifications so potential clients know you have the exact credentials required for their build.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <span className="text-xs font-mono font-bold text-primary uppercase">Sector 01</span>
                <h3 className="text-lg font-headline font-bold text-white">Commercial Towers</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  High-density office towers, retail mixed-use spaces, and corporate campuses.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <span className="text-xs font-mono font-bold text-primary uppercase">Sector 02</span>
                <h3 className="text-lg font-headline font-bold text-white">Heavy Infrastructure</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Suspension bridges, transit interchanges, and municipal water treatment plants.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <span className="text-xs font-mono font-bold text-primary uppercase">Sector 03</span>
                <h3 className="text-lg font-headline font-bold text-white">Industrial Logistics</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Distribution centers, automated warehousing, and heavy manufacturing floors.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <span className="text-xs font-mono font-bold text-primary uppercase">Sector 04</span>
                <h3 className="text-lg font-headline font-bold text-white">Healthcare Facilities</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Hospital wings, specialized surgical centers, and biomedical cleanrooms.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 6: RFP / OPPORTUNITY CHANNEL */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-r from-[#0f1524] via-[#11192e] to-[#0f1524] p-8 lg:p-12 rounded-3xl border border-primary/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 w-fit">
                <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
                <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                  PROJECT OPPORTUNITY CHANNEL
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Turn Your Website Into an Intelligent RFP Opportunity Channel
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Rather than receiving vague contact emails, AtlasBuild equips your website with an integrated RFP intake wizard. Clients can submit project parameters, target budgets, and CAD drawings directly, allowing your pre-construction estimating team to evaluate opportunities quickly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              <Link
                href="/quotes"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(125,211,252,0.4)]"
              >
                <span>Submit RFP or Request Quote</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 7: CLIENT EXPERIENCE & TRANSPARENCY */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Connect Clients With Real-Time Project Transparency
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                When a project is awarded, AtlasBuild provides an authenticated client portal workspace. Clients can inspect phase milestones, download pre-signed CAD blueprints, and review safety compliance feeds directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">timeline</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">Phase Gantt Tracking</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Keep executive stakeholders aligned on site preparation, foundation pours, core framing, and building enclosure.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">Secure Blueprint Distribution</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Provide authorized engineers and clients with direct access to structural drawings, architectural plans, and MEP specs.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">Live EMR &amp; Safety Logs</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Demonstrate rigorous risk controls with real-time site inspection logs, safe work hours, and incident telemetry.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 8: HOW IT WORKS */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                How to Build Your Construction Website with AtlasBuild
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                A streamlined 4-step process to deploy a high-performance digital presence tailored for construction and civil engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4 relative">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">01</div>
                <h3 className="text-lg font-headline font-bold text-white">Establish Brand Profile</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Configure corporate licensing, safety credentials, bonding limits, and company history.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4 relative">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">02</div>
                <h3 className="text-lg font-headline font-bold text-white">Publish Case Studies</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Add completed builds with sector tagging, completion rates, and photography.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4 relative">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">03</div>
                <h3 className="text-lg font-headline font-bold text-white">Activate RFP Intake</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Enable structured client bidding forms with parameter sliders and blueprint upload support.
                </p>
              </div>

              <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-7 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4 relative">
                <div className="text-2xl font-headline font-extrabold text-primary font-mono">04</div>
                <h3 className="text-lg font-headline font-bold text-white">Scale &amp; Manage Workspaces</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Invite clients to private workspaces and track project milestones through the centralized CMS.
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 9: WHY ATLASBUILD DIFFERENTIATION */}
          {/* ========================================================================= */}
          <section className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-xl flex flex-col gap-6">
            <div className="max-w-3xl flex flex-col gap-3">
              <h2 className="text-3xl font-headline font-bold text-white tracking-tight">
                Why Choose a Specialized Construction Website Builder?
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Generic website builders are designed for restaurants, photographers, and generic e-commerce stores. When construction companies try to use them, they encounter rigid templates that cannot handle CAD file distribution, multi-phase civil schedules, or structured RFP parameter intake.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                AtlasBuild eliminates the need for expensive agency retainers and fragile plugin stacks by delivering a unified, high-performance construction CMS built on Next.js 16 and PostgreSQL.
              </p>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 10: FAQS ACCORDION */}
          {/* ========================================================================= */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                Frequently Asked Questions About Construction Website Builders
              </h2>
              <p className="text-base text-on-surface-variant font-body leading-relaxed">
                Common questions from commercial contractors, estimators, and construction marketing teams.
              </p>
            </div>

            <FaqAccordion />
          </section>

          {/* ========================================================================= */}
          {/* SECTION 11: FINAL CALL TO ACTION */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-br from-[#0f131c]/90 via-[#111827]/90 to-[#0f131c]/90 backdrop-blur-[20px] p-10 lg:p-16 rounded-3xl border border-white/15 shadow-2xl flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-white tracking-tight leading-tight max-w-2xl">
              Build a Better Digital Presence for Your Construction Company
            </h2>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Join leading civil engineering and commercial construction teams using AtlasBuild to showcase projects, streamline RFP intake, and provide client transparency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/quotes"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-primary text-black rounded-full font-label text-sm font-bold hover:bg-primary-fixed transition-all shadow-[0_0_25px_rgba(125,211,252,0.4)]"
              >
                <span>Submit RFP or Request Demo</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-white/5 border border-white/15 text-white rounded-full font-label text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <span>Contact Engineering Team</span>
                <span className="material-symbols-outlined text-[18px]">contact_support</span>
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
