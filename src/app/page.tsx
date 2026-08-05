import Link from "next/link";
import FeaturedServicesShowcase from "@/components/FeaturedServicesShowcase";

export const revalidate = 0;

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Full-Screen Fixed Background Image with 50% Dark Overlay */}
      <div 
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-night-construction.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content Container above background layer (z-10) */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Glassmorphic Header */}
        <header className="fixed top-0 w-full z-50 bg-[#0f131c]/70 backdrop-blur-[20px] border-b border-outline-variant/30">
          <div className="h-16 w-full px-6 lg:px-12 flex items-center justify-between relative">
            
            {/* Far Left: Logo & Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img 
                  src="/images/logo.png" 
                  alt="AtlasBuild Logo" 
                  className="h-8 w-auto object-contain" 
                />
                <span className="text-xl font-headline font-bold tracking-tight text-white">AtlasBuild</span>
              </Link>
            </div>

            {/* Middle: Navigation Links */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <Link 
                href="/portfolio" 
                className="transition-colors text-primary font-semibold text-sm font-label"
              >
                Portfolio
              </Link>
              <Link 
                href="/careers" 
                className="text-sm font-label text-on-surface-variant hover:text-white transition-colors"
              >
                Careers
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-label text-on-surface-variant hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Far Right: Actions */}
            <div className="flex items-center gap-6">
              <Link 
                href="/quotes" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-label hover:bg-primary/30 transition-all backdrop-blur-md font-semibold"
              >
                Secure Portal
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </Link>

              <Link 
                href="/login" 
                className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-md text-primary hover:bg-primary/30 transition-all"
                title="Account Login / Portal Access"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </Link>
            </div>

          </div>
        </header>

        {/* Main Page Content */}
        <main className="w-full pt-16 flex-1">
          <div className="flex flex-col w-full">
            
            {/* Hero Section - Reduced top spacing for tighter layout */}
            <section className="relative w-full pt-8 pb-16 lg:pt-10 lg:pb-20 overflow-hidden">
              <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
                
                {/* Left Hero Glass Card */}
                <div className="w-full md:w-3/5 flex flex-col gap-8 z-10 bg-[#0f131c]/70 backdrop-blur-[20px] p-10 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container/50 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">architecture</span>
                    <span className="text-xs font-label uppercase tracking-widest text-primary font-semibold">Enterprise Civil</span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight">
                    Engineering Enterprise <br /> Civil Solutions
                  </h1>

                  <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-body">
                    Delivering systematic clarity for large-scale infrastructure and project lifecycle management. Built for data-dense, mission-critical construction environments.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link 
                      href="/quotes" 
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-primary text-on-primary rounded-full font-label text-sm font-semibold hover:bg-primary-fixed transition-colors min-w-[160px] shadow-[0_0_20px_rgba(125,211,252,0.3)]"
                    >
                      Submit RFP Proposal
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>

                    <Link 
                      href="/portfolio" 
                      className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white/5 border border-white/10 text-white rounded-full font-label text-sm font-semibold hover:bg-white/10 transition-colors min-w-[160px] backdrop-blur-sm"
                    >
                      View Active Portfolios
                      <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                    </Link>
                  </div>
                </div>

                {/* Right Hero Card - Executive Auto-Rotating Featured Services Showcase */}
                <div className="w-full md:w-2/5 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full translate-x-4 translate-y-4 z-0 pointer-events-none" />
                  <div className="relative z-10 w-full h-full flex">
                    <FeaturedServicesShowcase />
                  </div>
                </div>

              </div>
            </section>

            {/* Metric Grid */}
            <section className="w-full py-16">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Metric 1 */}
                  <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary text-[20px]">health_and_safety</span>
                      <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-semibold">Safety EMR Score</span>
                    </div>
                    <div className="text-4xl font-headline font-bold text-white">0.72</div>
                    <div className="text-sm font-body text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Industry Leading
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
                      <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-semibold">Bonding Limit</span>
                    </div>
                    <div className="text-4xl font-headline font-bold text-white">$50M</div>
                    <div className="text-sm font-body text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span>
                      Fully Secured
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary text-[20px]">timer</span>
                      <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-semibold">Safe Site Hours</span>
                    </div>
                    <div className="text-4xl font-headline font-bold text-white">1.2M+</div>
                    <div className="text-sm font-body text-primary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      Zero Lost Time
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Infrastructure in Action */}
            <section className="w-full py-24">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-headline font-bold text-white tracking-tight mb-4">Infrastructure in Action</h2>
                    <p className="text-base font-body text-on-surface-variant leading-relaxed">
                      Delivering systematic clarity across global transportation, commercial real estate, and utility sectors.
                    </p>
                  </div>

                  <Link 
                    href="/portfolio" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-label font-bold text-white hover:bg-white/10 transition-colors group backdrop-blur-md"
                  >
                    View Master Portfolio
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-primary">arrow_forward</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Project 1 */}
                  <Link 
                    href="/portal/proj-1" 
                    className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl"
                  >
                    <div className="relative w-full h-64 overflow-hidden bg-surface-dim">
                      <img 
                        alt="Coastal Bridge Expansion" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                        src="/images/suspension-bridge.jpg" 
                      />
                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-label uppercase tracking-widest text-white font-bold">
                        Transportation
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-xl font-headline font-semibold text-white group-hover:text-primary transition-colors">Coastal Bridge Expansion</h3>
                      <div className="flex items-center gap-4 text-xs font-body text-on-surface-variant">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span> Q3 2024</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> West Coast Auth</span>
                      </div>
                    </div>
                  </Link>

                  {/* Project 2 */}
                  <Link 
                    href="/portal/proj-2" 
                    className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl lg:translate-y-8"
                  >
                    <div className="relative w-full h-64 overflow-hidden bg-surface-dim">
                      <img 
                        alt="Skyline Financial Center" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                        src="/images/steel-framing.jpg" 
                      />
                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-label uppercase tracking-widest text-white font-bold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-xl font-headline font-semibold text-white group-hover:text-primary transition-colors">Skyline Financial Center</h3>
                      <div className="flex items-center gap-4 text-xs font-body text-on-surface-variant">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span> Q1 2025</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Metro District</span>
                      </div>
                    </div>
                  </Link>

                  {/* Project 3 */}
                  <Link 
                    href="/portal/proj-3" 
                    className="group flex flex-col bg-[#0f131c]/60 backdrop-blur-[20px] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-2xl lg:translate-y-16"
                  >
                    <div className="relative w-full h-64 overflow-hidden bg-surface-dim">
                      <img 
                        alt="Atlas Power Facility" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" 
                        src="/images/power-plant.jpg" 
                      />
                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-label uppercase tracking-widest text-white font-bold">
                        Energy &amp; Utilities
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-xl font-headline font-semibold text-white group-hover:text-primary transition-colors">Atlas Power Facility</h3>
                      <div className="flex items-center gap-4 text-xs font-body text-on-surface-variant">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span> Q4 2023</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Desert Region</span>
                      </div>
                    </div>
                  </Link>

                </div>
              </div>
            </section>

          </div>
        </main>

        {/* Glassmorphic Footer */}
        <footer className="w-full bg-[#0f131c]/80 backdrop-blur-[30px] border-t border-white/10 py-16 mt-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-md">
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l7-4 7 4v14" />
                    <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z" />
                  </svg>
                </div>
                <span className="text-lg font-headline font-bold tracking-tight text-white">AtlasBuild</span>
              </div>
              <p className="text-xs text-white leading-relaxed uppercase tracking-widest font-bold mb-4">Enterprise Grade Build Systems</p>
              <p className="text-sm text-on-surface-variant">Providing systematic clarity for large-scale construction data and project lifecycle management.</p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Exploration</h4>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/portfolio">Our Vision</Link>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/portfolio">Market Impact</Link>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/portal/proj-1/blueprints">Documentation</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/about">Leadership</Link>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/about">Sustainability</Link>
              <Link className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="/careers">Press</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
              <span className="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
              <span className="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Cookie Settings</span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest text-on-surface-variant flex justify-between">
            <span>© 2026 AtlasBuild Enterprise Systems Inc.</span>
            <span>Built for Global Infrastructure</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
