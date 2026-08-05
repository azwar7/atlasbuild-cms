import Link from "next/link";
import prisma from "@/shared/lib/db";
import AccountProfileDropdown from "@/components/AccountProfileDropdown";

export const revalidate = 0;

export default async function ProjectSafetyPage({
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

  const safetyLogs = [
    { id: "s1", date: "August 04, 2026", inspector: "Officer Marcus Brody", category: "OSHA Site Walk", status: "Passed", emr: "0.71", note: "All structural rigging lines and perimeter safety netting verified compliant." },
    { id: "s2", date: "August 01, 2026", inspector: "Lead Eng. Sarah Connor", category: "Steel Erection Audit", status: "Passed", emr: "0.71", note: "Crane load parameters inspected before secondary truss lift." },
    { id: "s3", date: "July 28, 2026", inspector: "Officer Marcus Brody", category: "Electrical & High Voltage", status: "Passed", emr: "0.71", note: "Temporary site power distribution boxes sealed and grounded." },
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
            <Link href={`/portal/${id}/schedule`} className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all">
              Schedule
            </Link>
            <Link href={`/portal/${id}/safety`} className="px-4 py-1.5 rounded-lg bg-[#7dd3fc]/20 text-[#7dd3fc] border border-[#7dd3fc]/40 font-bold text-sm shadow-[0_0_10px_rgba(125,211,252,0.2)]">
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
          <Link href={`/portal/${id}/schedule`} className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
            Schedule
          </Link>
          <Link href={`/portal/${id}/safety`} className="px-4 py-2 rounded-lg bg-[#7dd3fc] text-[#001f2e] font-bold text-sm shadow-[0_0_12px_rgba(125,211,252,0.4)]">
            Safety Logs
          </Link>
        </div>

        {/* Safety Header Glass Card */}
        <section className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#7dd3fc]">OSHA & EMR Telemetry</span>
            <h1 className="font-headline-md text-2xl md:text-3xl text-white font-bold tracking-tight mt-1">
              Safety Logs & Compliance Audits
            </h1>
            <p className="font-body-md text-sm text-white/80 mt-1">
              Real-time OSHA compliance audits and safety site logs for <span className="text-white font-medium">{projectTitle}</span>.
            </p>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 rounded-lg font-label-sm text-xs text-emerald-400 font-mono font-bold shadow-[0_0_8px_rgba(52,211,153,0.2)]">
            OSHA VERIFIED: 100% COMPLIANT
          </div>
        </section>

        {/* Safety KPI Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-[#7dd3fc] uppercase font-bold tracking-wider">Current EMR Index</span>
            <span className="font-metric-lg text-[#7dd3fc] text-4xl font-bold font-mono">0.71</span>
            <span className="text-xs text-[#7dd3fc]/90 font-bold">Industry Leader Standard</span>
          </div>

          <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-[#7dd3fc] uppercase font-bold tracking-wider">Site Incident Count</span>
            <span className="font-metric-lg text-white text-4xl font-bold font-mono">0</span>
            <span className="text-xs text-white/70 font-semibold">Zero-Incident Record</span>
          </div>

          <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-[#7dd3fc] uppercase font-bold tracking-wider">OSHA Inspection Status</span>
            <span className="font-metric-lg text-emerald-400 text-4xl font-bold font-mono">100%</span>
            <span className="text-xs text-emerald-400 font-bold">Full Compliance Verified</span>
          </div>
        </div>

        {/* Safety Log Feed */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-xl text-white font-bold px-1">
            Daily Safety & OSHA Compliance Telemetry
          </h2>

          {safetyLogs.map((log) => (
            <div 
              key={log.id}
              className="bg-[#7dd3fc]/5 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7dd3fc] text-[20px]">health_and_safety</span>
                  <h3 className="font-headline-md text-base text-white font-bold">{log.category}</h3>
                  <span className="bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full font-mono">
                    {log.status}
                  </span>
                </div>
                <p className="font-body-md text-sm text-white/80">{log.note}</p>
              </div>

              <div className="flex flex-col md:items-end justify-center text-xs font-mono text-[#7dd3fc] gap-1 shrink-0 font-bold">
                <span>{log.date}</span>
                <span className="text-white/60 font-sans font-normal">{log.inspector}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}
