import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Full-Screen Fixed Background Image with Dark Gradient & Blur Overlay */}
      <div 
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/crane-sunset-about.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/85 via-[#0f131c]/80 to-[#0a0e1a]/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Container above background */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-[#0f131c]/70 backdrop-blur-[20px] border-b border-outline-variant/30">
          <div className="h-16 w-full px-6 lg:px-12 flex items-center justify-between relative">
            
            {/* Logo */}
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

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <Link href="/portfolio" className="text-sm font-label text-on-surface-variant hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/careers" className="text-sm font-label text-on-surface-variant hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/about" className="text-sm font-label text-primary font-semibold transition-colors">
                About
              </Link>
            </nav>

            {/* Action */}
            <div className="flex items-center gap-6">
              <Link 
                href="/quotes" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-label hover:bg-primary/30 transition-all backdrop-blur-md font-semibold"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-12">
          
          {/* Hero Glass Card (Centered) */}
          <div className="bg-[#0f131c]/75 backdrop-blur-[20px] p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 w-fit backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">domain</span>
              <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
                ABOUT ATLASBUILD ENTERPRISE
              </span>
            </div>

            <h1 className="font-headline text-4xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight">
              Engineering Precision at Scale
            </h1>

            <p className="font-body text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-2xl">
              AtlasBuild is an enterprise-grade civil engineering and construction management firm specializing in high-load structural facilities, commercial bridge spans, and digital twin management.
            </p>
          </div>

          {/* Stats Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-xl hover:-translate-y-1 transition-transform">
              <span className="text-3xl lg:text-4xl font-bold font-mono text-primary">$1.4B+</span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider font-semibold">Completed Structural Value</span>
            </div>

            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-xl hover:-translate-y-1 transition-transform">
              <span className="text-3xl lg:text-4xl font-bold font-mono text-primary">0.71</span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider font-semibold">Industry EMR Safety Index</span>
            </div>

            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-xl hover:-translate-y-1 transition-transform">
              <span className="text-3xl lg:text-4xl font-bold font-mono text-white">100%</span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider font-semibold">OSHA Safety Standard</span>
            </div>

            <div className="bg-[#0f131c]/75 backdrop-blur-[20px] border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-xl hover:-translate-y-1 transition-transform">
              <span className="text-3xl lg:text-4xl font-bold font-mono text-primary">144+</span>
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider font-semibold">Active RFP Queries</span>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            
            <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">engineering</span>
              </div>
              <h3 className="font-headline text-xl text-white font-bold">Uncompromising Civil Standards</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Every foundation, steel truss, and concrete pour undergoes automated structural load verification and digital twin telemetry.
              </p>
            </div>

            <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">shield</span>
              </div>
              <h3 className="font-headline text-xl text-white font-bold">Zero-Incident Culture</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Our safety management system guarantees rigorous daily site inspections, transparent incident tracking, and OSHA compliance.
              </p>
            </div>

            <div className="bg-[#0f131c]/70 backdrop-blur-[20px] p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
              </div>
              <h3 className="font-headline text-xl text-white font-bold">Client Mission Portal</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Real-time project transparency with live blueprint vector viewers, active work logs, and direct engineering channel communication.
              </p>
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="w-full bg-[#0f131c]/80 backdrop-blur-[30px] border-t border-white/10 py-8 text-center text-xs text-on-surface-variant font-mono">
          © 2026 AtlasBuild Enterprise Civil Solutions. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}
