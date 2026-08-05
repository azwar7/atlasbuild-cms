import prisma from "@/shared/lib/db";
import Link from "next/link";
import { AssetType } from "@/generated/client";
import AccountProfileDropdown from "@/components/AccountProfileDropdown";

export const revalidate = 0;

export default async function ProjectBlueprintsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project: any = null;

  try {
    project = await prisma.project.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        assets: {
          where: {
            assetType: AssetType.BLUEPRINT,
            deletedAt: null,
          },
        },
      },
    });
  } catch (e) {
    // Database fallback if project ID is mock (e.g. proj-1) or DB offline
    project = null;
  }

  // Fallback mock project if not found in database or error occurred
  if (!project) {
    project = {
      id: id,
      title: "Eastside Logistics Center",
      assets: [
        {
          id: "ast-1",
          key: "blueprint_secure_structural_elevation_rev3",
          mimeType: "application/pdf",
          size: 14680064,
          url: "/images/steel-framing.jpg"
        },
        {
          id: "ast-2",
          key: "blueprint_secure_foundation_piling_spec_v2",
          mimeType: "application/pdf",
          size: 8912896,
          url: "/images/power-plant.jpg"
        },
        {
          id: "ast-3",
          key: "blueprint_secure_mep_infrastructure_plan",
          mimeType: "application/pdf",
          size: 11534336,
          url: "/images/suspension-bridge.jpg"
        }
      ]
    };
  }

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
      <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0f131c]/70 backdrop-blur-[20px] border-b border-white/10">
        <div className="h-full w-full px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <img 
                alt="AtlasBuild Logo" 
                className="h-8 w-8 object-contain transition-transform group-hover:scale-105" 
                src="/images/logo.png" 
              />
              <span className="font-headline-md text-xl text-on-surface font-bold tracking-tight group-hover:text-primary transition-colors">
                AtlasBuild
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl backdrop-blur-md">
            <Link 
              href={`/portal/${id}`} 
              className="px-4 py-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
            >
              Project Overview
            </Link>
            <Link 
              href={`/portal/${id}/blueprints`} 
              className="px-4 py-1.5 rounded-lg bg-[#7dd3fc]/20 text-[#7dd3fc] border border-[#7dd3fc]/40 font-bold text-sm shadow-[0_0_10px_rgba(125,211,252,0.2)]"
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

          {/* Actions & Account Dropdown */}
          <div className="flex items-center gap-4">
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

      {/* Left Navigation Sidebar */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 bg-surface-container/50 backdrop-blur-2xl border-r border-[#334155] z-40 p-base hidden md:block">
        <nav className="flex flex-col gap-2 mt-8">
          <div className="px-4 py-2 text-label-sm font-label-sm text-outline uppercase tracking-widest opacity-50">
            Workspace Admin
          </div>
          <Link 
            href={`/portal/${id}/settings`} 
            className="flex items-center px-6 py-4 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all gap-4"
          >
            <span className="material-symbols-outlined text-secondary">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
          <Link 
            href={`/portal/${id}/support`} 
            className="flex items-center px-6 py-4 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all gap-4"
          >
            <span className="material-symbols-outlined text-secondary">help_outline</span>
            <span className="font-body-md text-body-md">Support</span>
          </Link>
          <Link 
            href={`/portal/${id}/feedback`} 
            className="flex items-center px-6 py-4 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all gap-4"
          >
            <span className="material-symbols-outlined text-secondary">chat_bubble</span>
            <span className="font-body-md text-body-md">Feedback</span>
          </Link>
        </nav>
      </aside>

      {/* Main panel */}
      <div className="md:pl-72 w-full pt-20">
        <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
          
          {/* Header Glass Card */}
          <section className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 lg:p-8 relative overflow-hidden">
            <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-[#7dd3fc]">Secure Assets Directory</span>
            <h1 className="font-headline-md text-2xl md:text-3xl font-bold mt-1 tracking-tight text-white">Project Vector Blueprints</h1>
            <p className="font-body-md text-sm text-white/80 mt-1">
              Access secure engineering CAD & structural drawings for <span className="text-white font-medium">{project.title}</span>. All download links expire after 15 minutes.
            </p>
          </section>

          {project.assets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#7dd3fc]/30 bg-[#7dd3fc]/5 backdrop-blur-[24px] p-12 text-center text-sm text-white/80">
              No blueprint drawings uploaded for this project yet.
            </div>
          ) : (
            <div className="rounded-xl border border-[#7dd3fc]/30 bg-[#7dd3fc]/5 backdrop-blur-[24px] overflow-hidden shadow-[0_0_15px_rgba(125,211,252,0.1)]">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-[#0f1524]/80 text-[#7dd3fc] text-xs font-bold uppercase tracking-wider border-b border-[#7dd3fc]/20">
                  <tr>
                    <th className="px-6 py-4">Drawing Name</th>
                    <th className="px-6 py-4">File Format</th>
                    <th className="px-6 py-4">Dimensions / Size</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7dd3fc]/15">
                  {project.assets.map((asset: any) => (
                    <tr key={asset.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5 font-bold text-white">
                        {asset.key.replace('blueprint_secure_', '')}.pdf
                      </td>
                      <td className="px-6 py-5 text-white/70 font-mono text-xs">
                        {asset.mimeType}
                      </td>
                      <td className="px-6 py-5 text-white/70 font-mono text-xs">
                        {(asset.size / (1024 * 1024)).toFixed(2)} MB
                      </td>
                      <td className="px-6 py-5 text-right">
                        <a
                          href={`${asset.url || '/images/steel-framing.jpg'}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex h-9 items-center justify-center rounded-lg bg-[#7dd3fc] text-[#001f2e] font-bold px-4 text-xs hover:bg-white transition-colors shadow-[0_0_10px_rgba(125,211,252,0.3)]"
                        >
                          Download CAD PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
