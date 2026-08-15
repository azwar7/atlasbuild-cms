import type { Metadata } from "next";
import prisma from "@/shared/lib/db";
import Link from "next/link";
import { ProjectSector } from "@/generated/client";
import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import CookiePreferencesModal from "@/components/CookiePreferencesModal";
import { createPageMetadata } from "@/lib/seo/config";

export const revalidate = 0;

export const metadata: Metadata = createPageMetadata({
  title: "Project Portfolio & Case Studies | AtlasBuild",
  description:
    "Explore heavy civil engineering, commercial high-rises, and industrial infrastructure projects managed across the AtlasBuild construction CMS platform.",
  path: "/portfolio",
  keywords: [
    "Construction Project Portfolio",
    "Civil Infrastructure Case Studies",
    "Commercial Construction Projects",
    "Contractor Showcase",
  ],
});

export default async function PublicPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; sector?: string }>;
}) {
  const params = await searchParams;
  const activeQuery = params.query || '';
  const activeSector = params.sector || '';

  // Query filtering setups
  const whereClauses: any = {
    deletedAt: null,
  };

  if (activeQuery) {
    whereClauses.OR = [
      { title: { contains: activeQuery, mode: 'insensitive' } },
      { location: { contains: activeQuery, mode: 'insensitive' } },
    ];
  }

  if (activeSector) {
    whereClauses.sector = activeSector as ProjectSector;
  }

  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: whereClauses,
      orderBy: { startDate: 'desc' },
    });
  } catch (e) {
    // Fallback Mock elements during building/linting
    projects = [
      {
        id: 'proj-1',
        title: 'Eastside Logistics Hub & Terminal',
        sector: 'COMMERCIAL',
        location: 'Boston, MA',
        completionRate: 75
      },
      {
        id: 'proj-2',
        title: 'Columbia River Span Expansion',
        sector: 'CIVIL',
        location: 'Portland, OR',
        completionRate: 90
      },
      {
        id: 'proj-3',
        title: 'Metro High-Rise Tower Phase 2',
        sector: 'INFRASTRUCTURE',
        location: 'Austin, TX',
        completionRate: 45
      }
    ];
  }

  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Full-Screen Fixed Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/suspension-bridge.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0f131c]/80 to-[#0a0e1a]/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Container above background */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        <LandingHeader />

        {/* Main Content */}
        <main className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-10">
          
          {/* Hero Headline Glass Card */}
          <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-primary/20 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                HEAVY CIVIL ENGINEERING PORTFOLIO
              </span>
            </div>
            <h1 className="font-headline text-3xl lg:text-5xl text-white font-extrabold tracking-tight">
              Enterprise Project Registry
            </h1>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Examine live structural builds, commercial logistics hubs, and civil bridge developments managed by AtlasBuild's engineering units.
            </p>
          </div>

          {/* Filter Toolbar Form */}
          <form 
            method="GET" 
            action="/portfolio" 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-white/10 bg-[#0f131c]/75 backdrop-blur-[20px] shadow-xl select-none"
          >
            <div>
              <label className="block text-xs font-label uppercase tracking-wider text-primary font-bold mb-2">
                Search Location / Title
              </label>
              <input
                type="text"
                name="query"
                defaultValue={activeQuery}
                placeholder="e.g. Boston, Airport, Hub..."
                className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs font-mono text-white outline-none focus:border-primary transition-all placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="block text-xs font-label uppercase tracking-wider text-primary font-bold mb-2">
                Sector Filter
              </label>
              <select
                name="sector"
                defaultValue={activeSector}
                className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs font-mono text-white outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="" className="bg-[#0f131c]">All Industrial Sectors</option>
                <option value="COMMERCIAL" className="bg-[#0f131c]">Commercial</option>
                <option value="RESIDENTIAL" className="bg-[#0f131c]">Residential</option>
                <option value="CIVIL" className="bg-[#0f131c]">Civil</option>
                <option value="HEALTHCARE" className="bg-[#0f131c]">Healthcare</option>
                <option value="EDUCATION" className="bg-[#0f131c]">Education</option>
                <option value="INFRASTRUCTURE" className="bg-[#0f131c]">Infrastructure</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-11 flex items-center justify-center rounded-xl bg-primary text-black text-xs font-label font-bold uppercase tracking-wider hover:bg-primary-fixed transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                Update Search Filters
              </button>
            </div>
          </form>

          {/* Results grid */}
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#0f131c]/60 p-12 text-center text-sm text-on-surface-variant font-mono">
              No projects found matching the specified query filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-white/10 bg-[#0f131c]/75 backdrop-blur-[20px] p-6 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-label font-bold uppercase tracking-widest text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                        {project.sector}
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                        {project.location}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-headline font-bold text-white group-hover:text-primary transition-colors mt-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs font-body text-on-surface-variant leading-relaxed line-clamp-2">
                      Active heavy development execution under local safety frameworks.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Build Progress</span>
                      <span className="font-bold text-primary">{project.completionRate || 75}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${project.completionRate || 75}%` }}></div>
                    </div>
                    <Link
                      href={`/portal/${project.id}`}
                      className="flex w-full h-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xs font-label font-bold text-white hover:bg-primary hover:text-black hover:border-primary transition-all shadow-md mt-2"
                    >
                      Open Member Workspace
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <CookiePreferencesModal />
        <LandingFooter />

      </div>
    </div>
  );
}
