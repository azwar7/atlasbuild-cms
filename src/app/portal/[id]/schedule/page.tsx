import Link from "next/link";
import prisma from "@/shared/lib/db";
import AccountProfileDropdown from "@/components/AccountProfileDropdown";

export const revalidate = 0;

export default async function ProjectSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let projectTitle = "Eastside Logistics Center";
  try {
    const proj = await prisma.project.findUnique({ where: { id } });
    if (proj) projectTitle = proj.title;
  } catch (e) {
    // Fallback Mock
  }

  const milestones = [
    { id: "m1", title: "Site Excavation & Deep Foundation Piling", date: "June 15, 2026", status: "Completed", progress: 100 },
    { id: "m2", title: "Structural Steel Frame Erection", date: "August 10, 2026", status: "In Progress", progress: 68 },
    { id: "m3", title: "Curtain Wall & Exterior Cladding Installation", date: "October 01, 2026", status: "Upcoming", progress: 0 },
    { id: "m4", title: "MEP Rough-in & Infrastructure Connectivity", date: "December 12, 2026", status: "Upcoming", progress: 0 },
    { id: "m5", title: "Final Inspection & Client Handover", date: "February 28, 2027", status: "Upcoming", progress: 0 },
  ];

  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary selection:text-on-primary relative bg-[#0a0e1a]">
      
      {/* Fixed Glass Facade Background Image - z-0 Stacking Context */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          alt="Architectural Glass Facade Background" 
          className="w-full h-full object-cover opacity-45 contrast-110 brightness-110" 
          src="/images/glass-facade-bg.jpg" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/70 via-[#0f1524]/50 to-[#0a0e1a]/85 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0f131c]/80 backdrop-blur-[24px] border-b border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.05)]">
        <div className="h-full w-full px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <img alt="AtlasBuild Logo" className="h-8 w-8 object-contain transition-transform group-hover:scale-105" src="/images/logo.png" />
              <span className="font-headline-md font-bold text-xl text-white group-hover:text-[#7dd3fc] transition-colors">AtlasBuild</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-label-sm text-xs text-[#7dd3fc] uppercase font-mono font-bold">
              {projectTitle}
            </span>
          </div>

          {/* Header Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-md">
            <Link href={`/portal/${id}`} className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
              Project Overview
            </Link>
            <Link href={`/portal/${id}/blueprints`} className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
              Documents
            </Link>
            <Link href={`/portal/${id}/schedule`} className="px-4 py-1.5 rounded-lg bg-[#7dd3fc]/20 text-[#7dd3fc] border border-[#7dd3fc]/40 font-bold text-sm shadow-[0_0_10px_rgba(125,211,252,0.2)]">
              Schedule
            </Link>
            <Link href={`/portal/${id}/safety`} className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
              Safety Logs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href={`/portal/${id}`} 
              className="px-4 py-1.5 border border-[#7dd3fc]/40 text-[#7dd3fc] text-xs font-bold rounded-lg hover:bg-[#7dd3fc] hover:text-[#001f2e] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Workspace
            </Link>
            <AccountProfileDropdown 
              userName="Elena Rostova" 
              userRole="PROJECT DIRECTOR" 
              userEmail="elena.r@atlasbuild.com" 
              organization="AtlasBuild Engineering"
              portalId={id}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 md:px-12 max-w-container-max mx-auto w-full flex-1 flex flex-col gap-8">
        
        {/* Sub-Navigation Glass Tabs */}
        <div className="flex items-center gap-2 bg-[#0f1524]/90 backdrop-blur-[24px] border border-[#7dd3fc]/30 p-2 rounded-xl shadow-[0_0_15px_rgba(125,211,252,0.1)] w-fit">
          <Link href={`/portal/${id}`} className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
            Project Overview
          </Link>
          <Link href={`/portal/${id}/blueprints`} className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
            Documents
          </Link>
          <Link href={`/portal/${id}/schedule`} className="px-4 py-2 rounded-lg bg-[#7dd3fc] text-[#001f2e] font-bold text-sm shadow-[0_0_12px_rgba(125,211,252,0.4)]">
            Schedule
          </Link>
          <Link href={`/portal/${id}/safety`} className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
            Safety Logs
          </Link>
        </div>

        {/* Schedule Header Glass Card */}
        <section className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#7dd3fc]">Critical Path Milestones</span>
            <h1 className="font-headline-md text-2xl md:text-3xl text-white font-bold tracking-tight mt-1">
              Construction Timeline & Gantt Milestones
            </h1>
            <p className="font-body-md text-sm text-white/80 mt-1">
              Active structural critical path schedule for <span className="text-white font-medium">{projectTitle}</span>.
            </p>
          </div>

          <div className="bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 px-4 py-2 rounded-lg font-label-sm text-xs text-[#7dd3fc] font-mono font-bold shadow-[0_0_8px_rgba(125,211,252,0.2)]">
            Target Completion: Q1 2027
          </div>
        </section>

        {/* Milestone Timeline List */}
        <div className="flex flex-col gap-4">
          {milestones.map((m, idx) => (
            <div 
              key={m.id}
              className="bg-[#7dd3fc]/5 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                  m.status === 'Completed' ? 'bg-[#7dd3fc]/20 text-[#7dd3fc] border border-[#7dd3fc]/50 shadow-[0_0_10px_rgba(125,211,252,0.3)]' :
                  m.status === 'In Progress' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/50 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse' :
                  'bg-white/5 text-white/50 border border-white/20'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-headline-md text-base text-white font-bold">{m.title}</h3>
                  <span className="font-label-sm text-xs text-[#7dd3fc] font-mono font-semibold">Target Date: {m.date}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full md:w-64 flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className={m.status === 'Completed' ? 'text-[#7dd3fc] font-bold' : m.status === 'In Progress' ? 'text-[#f59e0b] font-bold' : 'text-white/50'}>
                    {m.status}
                  </span>
                  <span className="text-white font-bold">{m.progress}%</span>
                </div>
                <div className="h-2 w-full bg-[#0f1524] rounded-full overflow-hidden border border-white/10">
                  <div 
                    className={`h-full rounded-full ${m.status === 'Completed' ? 'bg-[#7dd3fc]' : 'bg-[#f59e0b]'}`} 
                    style={{ width: `${m.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}
