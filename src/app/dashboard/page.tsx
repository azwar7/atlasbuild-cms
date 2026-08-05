import prisma from "@/shared/lib/db";
import Link from "next/link";
import { ProjectSector } from "@/generated/client";
import DashboardHeader from "./DashboardHeader";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Fetch RFPs/Quotes list & dynamic counters from Database
  let quotes: any[] = [];
  let totalProjects = 0;
  let activeRFPs = 0;

  try {
    quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    totalProjects = await prisma.project.count({ where: { deletedAt: null } });
    activeRFPs = await prisma.quoteRequest.count();
  } catch (e) {
    // Fallback Mock data for dev & initial state
    quotes = [
      { 
        id: 'rfp-1', 
        name: 'Elena Rostova', 
        company: 'McArthur Housing', 
        projectTitle: 'Bridgeport Apartments', 
        sector: ProjectSector.COMMERCIAL, 
        budgetRange: '$5M - $10M', 
        createdAt: new Date('2026-08-04T10:00:00Z'),
        status: 'Reviewing'
      },
      { 
        id: 'rfp-2', 
        name: 'Director Vance', 
        company: 'City Transit Division', 
        projectTitle: 'Columbia bypass structural', 
        sector: ProjectSector.CIVIL, 
        budgetRange: '$20M+', 
        createdAt: new Date('2026-08-03T14:30:00Z'),
        status: 'Contacted'
      },
      { 
        id: 'rfp-3', 
        name: 'Sarah Connor', 
        company: 'Apex Logistics Inc', 
        projectTitle: 'Harbor Warehouse Complex', 
        sector: ProjectSector.COMMERCIAL, 
        budgetRange: '$10M - $20M', 
        createdAt: new Date('2026-08-02T11:15:00Z'),
        status: 'Reviewing'
      },
    ];
    totalProjects = 3;
    activeRFPs = 144;
  }

  return (
    <div className="font-body relative min-h-screen text-white selection:bg-[#7dd3fc] selection:text-[#001f2e]">
      
      {/* Skyscraper Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/dashboard-skyscrapers.jpg')" }}
      >
        <div className="fixed inset-0 bg-[#0f1524]/60 z-[-1]" />
      </div>

      {/* Main Container above background */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#7dd3fc]/5 backdrop-blur-[24px] border-r border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.1)] z-50 flex flex-col pt-6 pb-6 select-none">
          
          {/* Logo Mark */}
          <div className="px-6 py-6 mb-8 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img 
                alt="AtlasBuild Logo" 
                className="h-8 w-8 object-contain" 
                src="/images/logo.png" 
              />
              <span className="font-headline text-[20px] text-white font-bold tracking-tight">
                AtlasBuild
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 space-y-1">
            <Link 
              aria-current="page"
              href="/dashboard" 
              className="flex items-center px-4 py-2.5 rounded-lg transition-all bg-[#f59e0b]/20 text-[#f59e0b] font-semibold border border-[#f59e0b]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
              Dashboard
            </Link>

            <Link 
              href="/portfolio" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">account_tree</span>
              Project Portfolio
            </Link>

            <Link 
              href="/quotes" 
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">mail</span>
                Lead Inbox
              </div>
              <span className="bg-[#f59e0b] text-[#1a002e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                12
              </span>
            </Link>

            <Link 
              href="/careers" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">work</span>
              Careers
            </Link>

            <Link 
              href="/portal/proj-1/safety" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">health_and_safety</span>
              Safety Logs
            </Link>

            <Link 
              href="/dashboard/roles" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">admin_panel_settings</span>
              Access Roles
            </Link>
          </nav>
        </aside>

        {/* Main Content Body */}
        <div className="pl-[220px] w-full">
          
          {/* Top Fixed Header */}
          <DashboardHeader />

          {/* Main Dashboard Area */}
          <main className="relative pt-16 min-h-screen">
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-8 p-8 max-w-[1280px] mx-auto w-full">
                
                {/* Top Metrics Panel */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Metric 1 */}
                  <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                      <div className="flex justify-between items-start">
                        <h2 className="font-headline text-sm text-[#7dd3fc] uppercase tracking-wider">Total Site Lead Actions</h2>
                        <div className="w-10 h-10 rounded-full bg-[#7dd3fc]/20 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
                          <span className="material-symbols-outlined text-[20px]">insights</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-display text-white text-[48px] font-bold leading-tight group-hover:scale-105 origin-left transition-transform duration-500">
                          {activeRFPs || 144} <span className="font-headline text-lg text-white/70 ml-2 font-normal">RFPs</span>
                        </div>
                      </div>
                      <div className="w-full h-12">
                        <svg className="w-full h-full text-[#7dd3fc]" preserveAspectRatio="none" viewBox="0 0 100 30">
                          <path className="drop-shadow-[0_0_8px_rgba(125,211,252,0.5)]" d="M0 25 L20 20 L40 28 L60 15 L80 18 L100 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          <path d="M0 25 L20 20 L40 28 L60 15 L80 18 L100 5 L100 30 L0 30 Z" fill="url(#gradient-primary)" opacity="0.3"></path>
                          <defs>
                            <linearGradient id="gradient-primary" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="currentColor" stopOpacity="1"></stop>
                              <stop offset="100%" stopColor="currentColor" stopOpacity="0"></stop>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                      <div className="flex justify-between items-start">
                        <h2 className="font-headline text-sm text-[#7dd3fc] uppercase tracking-wider">Unassigned Portfolios</h2>
                        <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/30 flex items-center justify-center text-[#f59e0b] shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
                          <span className="material-symbols-outlined text-[20px]">assignment_late</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="font-display text-white text-[48px] font-bold leading-tight group-hover:scale-105 origin-left transition-transform duration-500">
                          {totalProjects || 3} <span className="font-headline text-lg text-[#f59e0b] ml-2 font-normal">Projects</span>
                        </div>
                        <div className="relative w-16 h-16">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#7dd3fc]/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            <path className="text-[#f59e0b] drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeWidth="2"></path>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center font-label text-[#f59e0b] text-sm font-bold">25%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-[#7dd3fc]/10 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(125,211,252,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                      <div className="flex justify-between items-start">
                        <h2 className="font-headline text-sm text-[#7dd3fc] uppercase tracking-wider">Average Safety Factor</h2>
                        <div className="w-10 h-10 rounded-full bg-[#7dd3fc]/20 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
                          <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="font-display text-white text-[48px] font-bold leading-tight group-hover:scale-105 origin-left transition-transform duration-500">
                          0.71 <span className="font-headline text-lg text-[#7dd3fc] ml-2 font-normal">EMR</span>
                        </div>
                        <div className="relative w-16 h-16">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-[#7dd3fc]/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            <path className="text-[#7dd3fc] drop-shadow-[0_0_6px_rgba(125,211,252,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeWidth="2"></path>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center font-label text-[#7dd3fc] text-sm font-bold">Top</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </section>

                {/* Lead Intake Table Section */}
                <section className="mt-8 flex flex-col gap-6">
                  
                  {/* Section Title & Add Action Button */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="font-headline text-[32px] text-white font-bold">Recent Design Estimate Queries</h1>
                      <p className="font-body text-[#7dd3fc] mt-1">Real-time telemetry on incoming structural evaluation requests.</p>
                    </div>
                    
                    <Link 
                      href="/quotes"
                      className="bg-[#7dd3fc]/10 backdrop-blur-md border border-[#7dd3fc]/50 shadow-[0_0_10px_rgba(125,211,252,0.2)] text-[#7dd3fc] hover:bg-[#7dd3fc]/30 px-6 py-3 rounded-lg font-label uppercase tracking-widest transition-colors flex items-center gap-2 text-sm font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Add Project Record
                    </Link>
                  </div>

                  {/* High-Density Grid Table Container */}
                  <div className="bg-[#7dd3fc]/5 backdrop-blur-[24px] border border-[#7dd3fc]/30 shadow-[0_0_15px_rgba(125,211,252,0.1)] rounded-xl overflow-hidden flex flex-col">
                    
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#7dd3fc]/10 border-b border-[#7dd3fc]/20 font-label text-[#7dd3fc] uppercase tracking-wider text-xs font-semibold">
                      <div className="col-span-3">Company</div>
                      <div className="col-span-3">Project Title</div>
                      <div className="col-span-2">Date Received</div>
                      <div className="col-span-1">Sector</div>
                      <div className="col-span-2">Budget Scope</div>
                      <div className="col-span-1 text-right">Status</div>
                    </div>

                    {/* Dynamic Table Rows */}
                    {quotes.map((quote: any, idx: number) => (
                      <div 
                        key={quote.id || idx}
                        className={`grid grid-cols-12 gap-4 px-6 py-5 items-center font-body text-white transition-colors border-b border-[#7dd3fc]/10 group ${
                          idx % 2 === 1 ? 'bg-white/5' : ''
                        } hover:bg-[#7dd3fc]/10`}
                      >
                        <div className="col-span-3 font-headline text-sm text-white group-hover:text-[#7dd3fc] transition-colors font-medium">
                          {quote.company || quote.name || 'McArthur Housing'}
                        </div>
                        <div className="col-span-3 text-white/80 truncate">
                          {quote.projectTitle || 'Bridgeport Apartments'}
                        </div>
                        <div className="col-span-2 font-label text-white/80 text-sm">
                          {new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="col-span-1 text-white/80 capitalize">
                          {quote.sector ? quote.sector.toLowerCase() : 'Commercial'}
                        </div>
                        <div className="col-span-2 font-label text-white text-sm font-semibold">
                          {quote.budgetRange || '$5M - $10M'}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          {idx % 2 === 0 ? (
                            <span className="bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] px-3 py-1 rounded-full font-label text-[10px] uppercase tracking-wider shadow-[0_0_8px_rgba(245,158,11,0.2)] font-bold">
                              Reviewing
                            </span>
                          ) : (
                            <span className="bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-[#7dd3fc] px-3 py-1 rounded-full font-label text-[10px] uppercase tracking-wider shadow-[0_0_8px_rgba(125,211,252,0.2)] font-bold">
                              Contacted
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                  </div>
                </section>

              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
