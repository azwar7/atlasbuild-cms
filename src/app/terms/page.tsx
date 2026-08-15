import { Metadata } from 'next';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import CookiePreferencesModal from '@/components/CookiePreferencesModal';
import { createPageMetadata } from '@/lib/seo/config';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Service | AtlasBuild',
  description: 'Enterprise terms of service, platform usage rules, project data ownership, and governance for AtlasBuild CMS.',
  path: '/terms',
});

export default function TermsOfServicePage() {
  const lastUpdated = 'August 7, 2026';

  return (
    <div className="min-h-screen bg-[#0b0f17] text-on-surface font-body selection:bg-primary/30 flex flex-col">
      <LandingHeader />
      <CookiePreferencesModal />

      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-20 w-full">
        
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#7dd3fc]">Terms of Service</span>
        </div>

        {/* HEADER HERO */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider font-label">LEGAL AGREEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-white/60">
            Last Updated: {lastUpdated} • Governing Enterprise Operations
          </p>
        </div>

        {/* TERMS SECTIONS */}
        <div className="flex flex-col gap-10 text-sm leading-relaxed text-white/80">
          
          {/* 1. Acceptance of Terms */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              1. Acceptance of Terms & Governance
            </h2>
            <p>
              By creating an account, accessing the AtlasBuild platform, submitting RFP project quotes, or viewing private project client portals, you agree to be bound by these Terms of Service (&quot;Terms&quot;) and all applicable civil engineering standards and federal regulations.
            </p>
          </section>

          {/* 2. Description of Services */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              2. Platform Services & Scope
            </h2>
            <p>
              AtlasBuild provides a web-based infrastructure content management system (CMS) supporting pre-construction RFP estimating wizards, role-based project portals, blueprint document controls, and administrative proposal approval workflows.
            </p>
          </section>

          {/* 3. Account Responsibilities */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              3. User Credentials & Access Security
            </h2>
            <p>
              You are responsible for safeguarding your authentication session tokens and credentials. Any administrative actions, proposal approvals, or blueprint uploads executed under your session cookie are deemed authorized by your enterprise organization.
            </p>
          </section>

          {/* 4. Project Data Ownership */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              4. Intellectual Property & Project Data Ownership
            </h2>
            <p>
              Clients retain full, exclusive ownership of all submitted structural CAD/BIM blueprints, proprietary estimation parameters, and site data. AtlasBuild retains all rights, title, and interest in the platform platform codebase, algorithms, and interface design systems.
            </p>
          </section>

          {/* 5. Acceptable Use Policy */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              5. Acceptable Use & Safety Standards
            </h2>
            <p>Users are strictly prohibited from:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 pl-2 text-white/75">
              <li>Submitting fraudulent RFP documentation or falsified OSHA compliance metrics.</li>
              <li>Attempting unauthorized cross-tenant data access or breaking Content Security Policy (CSP) boundaries.</li>
              <li>Uploading malicious executable payloads or corrupting blueprint document stores.</li>
            </ul>
          </section>

          {/* 6. Limitation of Liability */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, AtlasBuild Systems Inc. shall not be liable for indirect, incidental, or consequential damages arising from site delays, structural engineering recalculations, or unauthorized network interruptions beyond reasonable control.
            </p>
          </section>

          {/* 7. Governing Law */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              7. Governing Law & Arbitration
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to conflict of law principles. Any legal disputes shall be resolved through binding arbitration in Atlanta, GA.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section className="flex flex-col gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 mt-4">
            <h3 className="text-base font-bold text-white">Legal Inquiries</h3>
            <p className="text-xs text-white/70">For formal contractual inquiries, master service agreements (MSA), or licensing questions:</p>
            <div className="flex flex-col gap-1 font-mono text-xs text-[#7dd3fc] mt-2">
              <span>Email: legal@atlasbuild.com</span>
              <span>AtlasBuild Legal Affairs, 100 PeachTree Tower, Atlanta, GA 30303</span>
            </div>
          </section>

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
