import prisma from "@/shared/lib/db";
import Link from "next/link";
import { PhaseStatus } from "@/generated/client";
import AccountProfileDropdown from "@/components/AccountProfileDropdown";

export const revalidate = 0;

export default async function ClientWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project: any = null;

  try {
    project = await prisma.project.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        projectManager: {
          select: { name: true, email: true },
        },
        phases: {
          where: { deletedAt: null },
          orderBy: { sortOrder: 'asc' },
        },
        feedUpdates: {
          where: { deletedAt: null },
          include: {
            assets: {
              where: { deletedAt: null },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        assets: {
          where: { deletedAt: null },
        },
      },
    });
  } catch (e) {
    console.warn("Database query failed in ClientWorkspacePage, using visual fallback state.", e);
  }

  // Fallback demo data matching Stitch design if DB is unpopulated or disconnected
  if (!project) {
    project = {
      id: id || "proj-eastside-01",
      title: "Eastside Logistics Center",
      location: "Boston, MA",
      sector: "INDUSTRIAL",
      budget: "18500000",
      emrScore: "0.72",
      squareFootage: 450000,
      projectManager: {
        name: "Elena Rostova",
        email: "elena.r@atlasbuild.com",
      },
      phases: [
        { id: "1", title: "Site Prep", status: PhaseStatus.COMPLETED, description: "Excavation and grading completed." },
        { id: "2", title: "Foundation", status: PhaseStatus.COMPLETED, description: "Concrete slab poured and cured." },
        { id: "3", title: "Structural", status: PhaseStatus.IN_PROGRESS, description: "Steel framing installation active." },
        { id: "4", title: "Dry-In", status: PhaseStatus.PENDING, description: "Roofing and exterior cladding." },
        { id: "5", title: "MEP", status: PhaseStatus.PENDING, description: "Mechanical, electrical, plumbing integration." },
      ],
      feedUpdates: [],
    };
  }

  // Format budget display
  const formattedBudget = project.budget
    ? `$${(Number(project.budget) / 1000000).toFixed(1)}M`
    : "$18.5M";

  // Calculate timelines percent progress
  const completedPhases = project.phases.filter((p: any) => p.status === PhaseStatus.COMPLETED).length;
  const progressPercent = project.phases.length > 0
    ? Math.round((completedPhases / project.phases.length) * 100)
    : 50;

  return (
    <div className="font-body-md text-on-surface antialiased relative min-h-screen selection:bg-[#7dd3fc] selection:text-[#001f2e] bg-[#0a0e1a]">
      
      {/* Fixed Glass Facade Background Image - z-0 Stacking Context */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          alt="Architectural Glass Facade Background" 
          className="w-full h-full object-cover opacity-45 contrast-110 brightness-110" 
          src="/images/glass-facade-bg.jpg" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/70 via-[#0f1524]/50 to-[#0a0e1a]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0f131c]/80 backdrop-blur-[24px] border-b border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.05)]">
        <div className="h-full w-full px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo & Brand Name (Navigates to Landing Page) */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <img 
                alt="AtlasBuild Logo" 
                className="h-8 w-8 object-contain transition-transform group-hover:scale-105" 
                src="/images/logo.png" 
              />
              <span className="font-headline-md text-[20px] text-white font-bold tracking-tight group-hover:text-[#7dd3fc] transition-colors">
                AtlasBuild
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-md">
            <Link 
              href={`/portal/${id}`} 
              className="px-4 py-1.5 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 font-bold text-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
              Project Overview
            </Link>
            <Link 
              href={`/portal/${id}/blueprints`} 
              className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
            >
              Documents
            </Link>
            <Link 
              href={`/portal/${id}/schedule`} 
              className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
            >
              Schedule
            </Link>
            <Link 
              href={`/portal/${id}/safety`} 
              className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
            >
              Safety Logs
            </Link>
          </nav>

          {/* Account Profile Dropdown Menu */}
          <div className="flex items-center gap-4">
            <AccountProfileDropdown 
              userName={project.projectManager?.name || "Elena Rostova"} 
              userRole="PROJECT DIRECTOR" 
              userEmail={project.projectManager?.email || "elena.r@atlasbuild.com"} 
              organization="AtlasBuild Engineering"
              portalId={id}
            />
          </div>

        </div>
      </header>

      {/* Left Navigation Sidebar */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 bg-[#7dd3fc]/5 backdrop-blur-[24px] border-r border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.1)] z-40 p-base hidden md:block select-none">
        <nav className="flex flex-col gap-2 mt-8">
          <div className="px-4 py-2 text-label-sm font-label-sm text-[#7dd3fc] uppercase tracking-widest font-semibold">
            Workspace Admin
          </div>
          <Link 
            href={`/portal/${id}/settings`} 
            className="flex items-center px-6 py-4 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all gap-4"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
          <Link 
            href={`/portal/${id}/support`} 
            className="flex items-center px-6 py-4 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all gap-4"
          >
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-body-md text-body-md">Support</span>
          </Link>
          <Link 
            href={`/portal/${id}/feedback`} 
            className="flex items-center px-6 py-4 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all gap-4"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-body-md text-body-md">Feedback</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <div className="md:pl-72 w-full">
        <main className="relative pt-20 w-full min-h-screen">
          <div className="flex flex-col w-full h-full p-6 lg:p-margin-desktop gap-8 lg:gap-10">
            
            {/* Project Banner Header Card */}
            <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 lg:p-8 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7dd3fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <h1 className="font-headline-md text-[32px] text-white font-bold tracking-tight">
                  {project.title || "Eastside Logistics Center"}
                </h1>
                <div className="flex items-center gap-2 text-[#7dd3fc]">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span className="font-body-md text-body-md">{project.location || "Boston, MA"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="px-4 py-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/20 text-[#f59e0b] font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_8px_rgba(245,158,11,0.2)] font-bold">
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></div>
                  Status: Active Framing
                </div>
              </div>
            </section>

            {/* Split Content Grid: Left Parameters & Right Feed */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              
              {/* Left Column: Project Parameters */}
              <aside className="w-full lg:w-4/12 flex flex-col gap-8 shrink-0">
                <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 relative overflow-hidden h-full flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="flex flex-col gap-8 relative z-10">
                    <h2 className="font-headline-sm text-[24px] leading-[32px] font-semibold text-white font-headline-md">
                      Project Details
                    </h2>
                    
                    <div className="flex flex-col gap-6">
                      {/* Project Manager */}
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm text-[#7dd3fc] uppercase tracking-wider font-semibold">
                          Project Manager
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="w-10 h-10 rounded-full bg-[#7dd3fc]/20 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
                            <span className="material-symbols-outlined">person</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-body-md text-body-md text-white font-medium">
                              {project.projectManager?.name || "Elena Rostova"}
                            </span>
                            <span className="text-[12px] text-white/60">
                              {project.projectManager?.email || "elena.r@atlasbuild.com"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-px bg-[#7dd3fc]/20"></div>

                      {/* Total Budget */}
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm text-[#7dd3fc] uppercase tracking-wider font-semibold">
                          Total Budget
                        </span>
                        <span className="font-metric-lg text-metric-lg text-[#f59e0b] font-bold">
                          {formattedBudget}
                        </span>
                      </div>

                      <div className="w-full h-px bg-[#7dd3fc]/20"></div>

                      {/* EMR Safety Rating */}
                      <div className="flex flex-col gap-1">
                        <span className="font-label-sm text-label-sm text-[#7dd3fc] uppercase tracking-wider font-semibold">
                          EMR Safety Rating
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-metric-lg text-[32px] font-bold text-[#7dd3fc]">
                            {project.emrScore?.toString() || "0.72"}
                          </span>
                          <span className="px-2 py-1 bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] rounded-md font-label-sm text-[10px] uppercase tracking-widest ml-2 shadow-[0_0_8px_rgba(125,211,252,0.2)] font-bold">
                            Excellent
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secure Blueprints Folder CTA Button */}
                  <Link 
                    href={`/portal/${id}/blueprints`}
                    className="mt-8 w-full group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-label-sm text-label-sm font-bold uppercase tracking-wider py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(125,211,252,0.1)]"
                  >
                    <span className="material-symbols-outlined relative z-10 group-hover:scale-110 transition-transform text-[#7dd3fc]">
                      picture_as_pdf
                    </span>
                    <span className="relative z-10">Secure Blueprints Folder</span>
                    <div className="absolute inset-0 bg-[#7dd3fc]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  </Link>
                </div>
              </aside>

              {/* Right Column: Phase Progression & Operations Feed */}
              <main className="w-full lg:w-8/12 flex flex-col gap-8 lg:gap-10">
                
                {/* Phase Progression Card */}
                <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-8 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
                  <h2 className="font-headline-sm text-[24px] leading-[32px] font-semibold text-white font-headline-md mb-8">
                    Phase Progression
                  </h2>

                  <div className="relative w-full overflow-x-auto pb-4 custom-scrollbar">
                    <div className="min-w-[600px] relative flex justify-between items-center px-4">
                      
                      {/* Background Progress Line */}
                      <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#7dd3fc]/20 -translate-y-1/2 z-0 rounded-full">
                        <div 
                          className="h-full bg-[#7dd3fc] rounded-full drop-shadow-[0_0_6px_rgba(125,211,252,0.6)]" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>

                      {/* Phase 1: Site Prep */}
                      <div className="flex flex-col items-center gap-3 relative z-10 w-24">
                        <div className="w-8 h-8 rounded-full bg-[#7dd3fc]/20 border border-[#7dd3fc]/50 text-[#7dd3fc] flex items-center justify-center shadow-[0_0_10px_rgba(125,211,252,0.5)] backdrop-blur-md">
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-[#7dd3fc] uppercase text-center tracking-wide font-semibold">
                          Site Prep
                        </span>
                      </div>

                      {/* Phase 2: Foundation */}
                      <div className="flex flex-col items-center gap-3 relative z-10 w-24">
                        <div className="w-8 h-8 rounded-full bg-[#7dd3fc]/20 border border-[#7dd3fc]/50 text-[#7dd3fc] flex items-center justify-center shadow-[0_0_10px_rgba(125,211,252,0.5)] backdrop-blur-md">
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-[#7dd3fc] uppercase text-center tracking-wide font-semibold">
                          Foundation
                        </span>
                      </div>

                      {/* Phase 3: Structural (Active) */}
                      <div className="flex flex-col items-center gap-3 relative z-10 w-24">
                        <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/50 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] ring-4 ring-[#f59e0b]/20 animate-[pulse_2s_ease-in-out_infinite] backdrop-blur-md">
                          <div className="w-3 h-3 bg-[#f59e0b] rounded-full drop-shadow-[0_0_4px_rgba(245,158,11,0.8)]"></div>
                        </div>
                        <span className="font-label-sm text-[11px] text-[#f59e0b] uppercase text-center tracking-wide font-bold">
                          Structural
                        </span>
                      </div>

                      {/* Phase 4: Dry-In */}
                      <div className="flex flex-col items-center gap-3 relative z-10 w-24">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/50 backdrop-blur-md">
                          <span className="font-label-sm">4</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-white/50 uppercase text-center tracking-wide">
                          Dry-In
                        </span>
                      </div>

                      {/* Phase 5: MEP */}
                      <div className="flex flex-col items-center gap-3 relative z-10 w-24">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/50 backdrop-blur-md">
                          <span className="font-label-sm">5</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-white/50 uppercase text-center tracking-wide">
                          MEP
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Daily Operations Log Feed */}
                <div className="flex flex-col gap-6">
                  <h2 className="font-headline-sm text-[24px] leading-[32px] font-semibold text-white font-headline-md px-2">
                    Daily Operations Log
                  </h2>

                  {(!project.feedUpdates || project.feedUpdates.length === 0) ? (
                    <article className="bg-[#7dd3fc]/5 backdrop-blur-[24px] border border-[#7dd3fc]/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(125,211,252,0.1)] hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-300">
                      
                      {/* Image Banner */}
                      <div className="w-full aspect-[16/9] md:aspect-[2/1] relative overflow-hidden group">
                        <img 
                          alt="Steel framing installation" 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                          src="/images/steel-framing.jpg" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                          <div className="flex flex-col gap-2">
                            <span className="font-label-sm text-[12px] text-[#f59e0b] bg-[#0a0e1a]/80 backdrop-blur-md px-3 py-1 rounded-md w-max border border-[#f59e0b]/30 shadow-[0_0_8px_rgba(245,158,11,0.2)] font-bold">
                              August 4, 2026
                            </span>
                            <h3 className="font-headline-md text-[28px] leading-[36px] text-white font-bold">
                              Steel Framing Phase 2
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Log Body */}
                      <div className="p-6 md:p-8 flex flex-col gap-6 bg-[#0f1524]/40">
                        <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                          Main structural columns for the eastern warehouse wing have been erected. Crane operations proceeded smoothly despite minor morning winds. The secondary beam connections are currently being bolted, and the shear stud welding on the mezzanine level is 40% complete. Safety inspections for the current elevation were passed with no infractions noted.
                        </p>

                        <div className="bg-[#7dd3fc]/10 border border-[#7dd3fc]/20 rounded-xl p-4 flex gap-4 items-start border-l-4 border-l-[#7dd3fc] relative overflow-hidden backdrop-blur-sm">
                          <div className="absolute -right-4 -top-4 text-[#7dd3fc]/10">
                            <span className="material-symbols-outlined text-[120px]">format_quote</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-[#7dd3fc]/20 flex-shrink-0 flex items-center justify-center text-[#7dd3fc] relative z-10 border border-[#7dd3fc]/30 shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
                            <span className="material-symbols-outlined">assignment_turned_in</span>
                          </div>
                          <div className="flex flex-col gap-1 relative z-10">
                            <span className="font-label-sm text-label-sm text-[#7dd3fc] uppercase tracking-wider font-semibold">
                              Manager Note
                            </span>
                            <p className="font-body-md text-[14px] text-white/90 italic">
                              "Structural alignment verified by third-party engineering team; slab load tests passed on sectors A through C."
                            </p>
                          </div>
                        </div>
                      </div>

                    </article>
                  ) : (
                    project.feedUpdates.map((update: any) => (
                      <article 
                        key={update.id} 
                        className="bg-[#7dd3fc]/5 backdrop-blur-[24px] border border-[#7dd3fc]/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(125,211,252,0.1)] hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-300"
                      >
                        {update.assets?.[0]?.url && (
                          <div className="w-full aspect-[16/9] md:aspect-[2/1] relative overflow-hidden group">
                            <img 
                              alt={update.title} 
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                              src={update.assets[0].url} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                              <div className="flex flex-col gap-2">
                                <span className="font-label-sm text-[12px] text-[#f59e0b] bg-[#0a0e1a]/80 backdrop-blur-md px-3 py-1 rounded-md w-max border border-[#f59e0b]/30 shadow-[0_0_8px_rgba(245,158,11,0.2)] font-bold">
                                  {new Date(update.createdAt).toLocaleDateString()}
                                </span>
                                <h3 className="font-headline-md text-[28px] leading-[36px] text-white font-bold">
                                  {update.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-6 md:p-8 flex flex-col gap-6 bg-[#0f1524]/40">
                          {!update.assets?.[0]?.url && (
                            <div className="flex justify-between items-baseline border-b border-[#7dd3fc]/20 pb-4">
                              <h3 className="font-headline-md text-[24px] text-white font-bold">{update.title}</h3>
                              <span className="font-label-sm text-[12px] text-[#f59e0b]">
                                {new Date(update.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                            {update.content}
                          </p>

                          <div className="bg-[#7dd3fc]/10 border border-[#7dd3fc]/20 rounded-xl p-4 flex gap-4 items-start border-l-4 border-l-[#7dd3fc] relative overflow-hidden backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-[#7dd3fc]/20 flex-shrink-0 flex items-center justify-center text-[#7dd3fc] relative z-10 border border-[#7dd3fc]/30">
                              <span className="material-symbols-outlined">assignment_turned_in</span>
                            </div>
                            <div className="flex flex-col gap-1 relative z-10">
                              <span className="font-label-sm text-label-sm text-[#7dd3fc] uppercase tracking-wider font-semibold">
                                Manager Note
                              </span>
                              <p className="font-body-md text-[14px] text-white/90 italic">
                                "Site inspections verified and quality controls recorded for active phase execution."
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>

              </main>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(125, 211, 252, 0.1); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(125, 211, 252, 0.4); 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(125, 211, 252, 0.7); 
        }
      `}</style>

    </div>
  );
}
