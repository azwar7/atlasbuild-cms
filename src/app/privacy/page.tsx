import { Metadata } from 'next';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import CookiePreferencesModal from '@/components/CookiePreferencesModal';

export const metadata: Metadata = {
  title: 'Privacy Policy | AtlasBuild Enterprise',
  description: 'Enterprise privacy commitment, data security standards, GDPR compliance, and cookie policy for AtlasBuild CMS.',
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[#7dd3fc]">Privacy Policy</span>
        </div>

        {/* HEADER HERO */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider">LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-white/60">
            Effective Date: {lastUpdated} • ISO 27001 Certified Security Protocol
          </p>
        </div>

        {/* POLICY SECTIONS */}
        <div className="flex flex-col gap-10 text-sm leading-relaxed text-white/80">
          
          {/* 1. Introduction */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              1. Introduction & Enterprise Commitment
            </h2>
            <p>
              AtlasBuild Enterprise Systems Inc. (&quot;AtlasBuild,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides an enterprise civil engineering content management and project lifecycle platform. We are committed to protecting the confidentiality, integrity, and security of corporate, project, and personal data submitted through our software services, client portals, and RFP intake wizards.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              2. Information We Collect
            </h2>
            <p>We collect information directly from user interactions, automated client connections, and civil project submissions:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 pl-2 text-white/75">
              <li><strong className="text-white">Account Information:</strong> Name, work email address, phone number, enterprise organization, and role credentials (e.g. Administrator, Project Manager, Client Representative).</li>
              <li><strong className="text-white">RFP & Technical Data:</strong> Structural blueprints, CAD/BIM specifications, site parameters, estimation quotes, and compliance documentation.</li>
              <li><strong className="text-white">Technical & Usage Telemetry:</strong> IP addresses, browser types, session activity logs, API response latency, and system audit logs.</li>
            </ul>
          </section>

          {/* 3. How Information Is Used */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              3. How Information Is Used
            </h2>
            <p>Collected data is processed strictly for infrastructure service delivery and site safety governance:</p>
            <ul className="list-disc list-inside flex flex-col gap-2 pl-2 text-white/75">
              <li>Provisioning role-based access to private project blueprints and estimation calculators.</li>
              <li>Executing civil project approvals, milestone logging, and administrative RFP proposal management.</li>
              <li>Maintaining ISO 27001 audit trails and OSHA safety rating compliance monitoring.</li>
              <li>Ensuring multi-tenant security isolation across client workspaces.</li>
            </ul>
          </section>

          {/* 4. Cookies & Tracking Technologies */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              4. Cookies & Tracking Technologies
            </h2>
            <p>
              We utilize essential HTTP cookies for secure session authentication (`atlasbuild_session`). Optional functional and analytics cookies measure application performance without selling or transmitting user data to third-party ad networks. You may customize your preferences at any time via our Cookie Preferences setting in the application footer.
            </p>
          </section>

          {/* 5. Third-Party Infrastructure Services */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              5. Third-Party Infrastructure Sub-processors
            </h2>
            <p>AtlasBuild integrates with vetted enterprise infrastructure providers:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-xs font-mono uppercase text-[#7dd3fc]">Cloudinary CDN</h4>
                <p className="text-xs text-white/60 mt-1">Encrypted storage and optimization for high-resolution project blueprints and construction photos.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white text-xs font-mono uppercase text-[#7dd3fc]">Neon Database Serverless</h4>
                <p className="text-xs text-white/60 mt-1">High-availability PostgreSQL database hosting enterprise relational schema and project logs.</p>
              </div>
            </div>
          </section>

          {/* 6. Security Measures */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-headline font-bold text-white flex items-center gap-2">
              6. Enterprise Security Standards
            </h2>
            <p>
              All customer data is encrypted in transit using TLS 1.3 and at rest using AES-256 bit encryption. Strict Content Security Policy (CSP), Role-Based Access Control (RBAC), and session timeout protocols guard against unauthorized access and data exfiltration.
            </p>
          </section>

          {/* 7. Contact Information */}
          <section className="flex flex-col gap-3 p-6 rounded-3xl bg-white/5 border border-white/10 mt-4">
            <h3 className="text-base font-bold text-white">Privacy & Legal Office</h3>
            <p className="text-xs text-white/70">For privacy inquiries, data removal requests, or enterprise compliance audits, contact our Security Officer:</p>
            <div className="flex flex-col gap-1 font-mono text-xs text-[#7dd3fc] mt-2">
              <span>Email: privacy@atlasbuild.com</span>
              <span>AtlasBuild Systems Inc., 100 PeachTree Tower, Atlanta, GA 30303</span>
            </div>
          </section>

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
