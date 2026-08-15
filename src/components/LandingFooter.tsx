'use client';

import Link from 'next/link';

export default function LandingFooter() {
  const triggerCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <footer className="w-full bg-[#0f131c]/90 backdrop-blur-[30px] border-t border-white/10 py-16 mt-24 relative z-10 text-on-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* BRAND COLUMN */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-md group-hover:border-primary transition-all">
              <img src="/images/logo.png" alt="AtlasBuild Logo" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-xl font-headline font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              AtlasBuild
            </span>
          </Link>
          <p className="text-xs text-[#7dd3fc] uppercase tracking-widest font-bold font-mono">
            Enterprise Civil Platform
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Systematic clarity for large-scale infrastructure projects, RFP estimating wizards, and civil engineering lifecycle management.
          </p>
        </div>

        {/* EXPLORATION COLUMN */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Exploration</h4>
          <Link href="/construction-website-builder" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Website Builder &amp; CMS
          </Link>
          <Link href="/features/project-portfolio" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Project Portfolio Software
          </Link>
          <Link href="/portfolio" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Infrastructure Portfolio
          </Link>
          <Link href="/quotes" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            RFP Intake Wizard
          </Link>
          <Link href="/about" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Technical Specifications
          </Link>
          <Link href="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Engineering Inquiries
          </Link>
        </div>

        {/* COMPANY COLUMN */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</h4>
          <Link href="/about" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Leadership & Mission
          </Link>
          <Link href="/careers" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Careers & Hiring
          </Link>
          <Link href="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Contact & Operations
          </Link>
          <Link href="/dashboard" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Admin Workspace
          </Link>
        </div>

        {/* LEGAL COLUMN */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Legal & Compliance</h4>
          <Link href="/privacy" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <button
            onClick={triggerCookieSettings}
            className="text-left text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer focus:outline-none"
          >
            Cookie Preferences
          </button>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT BANNER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-white/10 text-xs text-on-surface-variant flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <span>© {new Date().getFullYear()} AtlasBuild Enterprise Systems Inc. All rights reserved.</span>
        <div className="flex items-center gap-4 text-[11px] text-white/50">
          <span>ISO 27001 Certified</span>
          <span>•</span>
          <span>OSHA Compliant</span>
          <span>•</span>
          <span>v2.4 Production</span>
        </div>
      </div>
    </footer>
  );
}
