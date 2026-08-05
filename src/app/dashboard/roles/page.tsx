import Link from "next/link";
import DashboardHeader from "../DashboardHeader";

export default function AccessRolesPage() {
  const roles = [
    { name: "Super Administrator", code: "ROLE_SUPER_ADMIN", count: "3 Users", description: "Full access to platform configuration, invite tokens, database seeding, and global telemetry." },
    { name: "Lead Project Engineer", code: "ROLE_PROJECT_LEAD", count: "12 Users", description: "Read & write access to blueprint CAD vector uploads, site daily logs, and schedule milestones." },
    { name: "Client Executive", code: "ROLE_CLIENT_EXEC", count: "28 Users", description: "View access to specific project portals, blueprint document vault, and milestone schedule." },
    { name: "Field Safety Officer", code: "ROLE_SAFETY_OFFICER", count: "8 Users", description: "Audit access to OSHA EMR metrics, safety telemetry logs, and site inspection reports." }
  ];

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex selection:bg-primary selection:text-on-primary">
      
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#0c1017] border-r border-[#334155]/40 flex flex-col justify-between p-4 shrink-0 fixed top-0 bottom-0 z-50">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <img alt="AtlasBuild Logo" className="h-8 w-8 object-contain" src="/images/logo.png" />
            <span className="font-headline-md font-bold text-xl text-on-surface tracking-tight">AtlasBuild</span>
          </div>

          <nav className="flex flex-col gap-1.5">
            <Link href="/dashboard" className="flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-headline-md text-sm font-semibold">
              <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
              Dashboard
            </Link>

            <Link href="/portfolio" className="flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-headline-md text-sm font-semibold">
              <span className="material-symbols-outlined mr-3 text-[20px]">account_tree</span>
              Project Portfolio
            </Link>

            <Link href="/dashboard/leads" className="flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-headline-md text-sm font-semibold">
              <span className="material-symbols-outlined mr-3 text-[20px]">mail</span>
              Lead Inbox
            </Link>

            <Link href="/careers" className="flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-headline-md text-sm font-semibold">
              <span className="material-symbols-outlined mr-3 text-[20px]">work</span>
              Careers
            </Link>

            <Link href="/portal/proj-1/safety" className="flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-headline-md text-sm font-semibold">
              <span className="material-symbols-outlined mr-3 text-[20px]">health_and_safety</span>
              Safety Logs
            </Link>

            <Link href="/dashboard/roles" className="flex items-center px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="material-symbols-outlined mr-3 text-[20px]">admin_panel_settings</span>
              Access Roles
            </Link>
          </nav>
        </div>

        <div className="px-2 pt-4 border-t border-[#334155]/40 text-xs text-on-surface-variant flex justify-between items-center">
          <span>Active Session</span>
          <Link href="/" className="text-secondary hover:underline font-bold">Log Out</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-[220px] w-full">
        <DashboardHeader />

        <main className="pt-24 w-full min-h-screen flex flex-col p-8 gap-8">
          <div>
            <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
              Access Control & User Role Management
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">
              Enterprise RBAC permissions for AtlasBuild CMS controllers and client stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((r) => (
              <div key={r.code} className="bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl p-6 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-lg text-on-surface font-bold">{r.name}</h3>
                    <span className="bg-secondary/10 border border-secondary/30 text-secondary text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full">
                      {r.count}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-primary">{r.code}</span>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mt-2">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button type="button" className="text-xs text-secondary font-bold uppercase hover:underline flex items-center gap-1">
                    Manage Permissions
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  );
}
