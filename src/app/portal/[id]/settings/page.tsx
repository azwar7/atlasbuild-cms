import Link from "next/link";
import prisma from "@/shared/lib/db";

export const revalidate = 0;

export default async function SettingsPage({
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

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Top Header */}
      <header className="fixed top-0 w-full h-16 bg-surface/80 backdrop-blur-xl border-b border-[#334155] z-50 flex items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <Link href={`/portal/${id}`} className="flex items-center gap-3">
            <img alt="AtlasBuild Logo" className="h-7 w-7 object-contain" src="/images/logo.png" />
            <span className="font-headline-md font-bold text-lg text-on-surface">AtlasBuild</span>
          </Link>
          <span className="text-[#334155]">|</span>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase font-mono font-bold">
            {projectTitle}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href={`/portal/${id}`} 
            className="px-4 py-1.5 border border-secondary text-secondary text-xs font-bold rounded-lg hover:bg-secondary hover:text-black transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Workspace
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 md:px-12 max-w-3xl mx-auto w-full flex-1 flex flex-col gap-8">
        
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            Workspace Settings & Telemetry Notifications
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Configure project notification triggers, security access, and client report frequency.
          </p>
        </div>

        <div className="bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 md:p-8 flex flex-col gap-6">
          
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div>
              <h3 className="font-headline-md text-base text-on-surface font-bold">Daily Construction Log Alerts</h3>
              <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Receive real-time push and email notifications whenever site logs are published.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full p-1 flex items-center justify-end cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div>
              <h3 className="font-headline-md text-base text-on-surface font-bold">Vector Blueprint Revision Sync</h3>
              <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Automated download of CAD & BIM structural diff files upon lead engineer approval.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full p-1 flex items-center justify-end cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-base text-on-surface font-bold">OSHA EMR Safety Digest</h3>
              <p className="font-body-md text-xs text-on-surface-variant mt-0.5">Weekly safety index summary sent to site executive stakeholders.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full p-1 flex items-center justify-end cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
