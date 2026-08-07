'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import CookiePreferencesModal from '@/components/CookiePreferencesModal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Infrastructure Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok) {
        setStatusMsg({
          type: 'success',
          text: json.data?.message || 'Inquiry submitted successfully! Our team will contact you within 24 hours.',
        });
        setFormData({ name: '', email: '', subject: 'General Infrastructure Inquiry', message: '' });
      } else {
        setStatusMsg({
          type: 'error',
          text: json.error?.message || 'Failed to submit inquiry. Please try again.',
        });
      }
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: 'Network error occurred. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-on-surface font-body flex flex-col selection:bg-[#7dd3fc] selection:text-[#001f2e]">
      
      {/* Global Landing Header */}
      <LandingHeader />

      {/* Main Content Body */}
      <main className="pt-24 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full flex flex-col gap-12">
        
        {/* Breadcrumb & Hero Header */}
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 text-[#7dd3fc] text-xs font-mono font-bold uppercase tracking-wider mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#7dd3fc] animate-ping"></span>
            ATLASBUILD GLOBAL OPERATIONS
          </div>

          <h1 className="text-3xl sm:text-5xl font-headline font-bold text-white tracking-tight">
            Connect with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#60a5fa]">Engineering & Operations</span> Teams
          </h1>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-body">
            Have a project inquiry, heavy civil consulting question, or enterprise partnership proposal? Our technical operations managers are available 24/7.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Headquarters */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-3 group hover:border-[#7dd3fc]/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">location_on</span>
            </div>
            <h3 className="text-sm font-bold text-white font-headline">Global Headquarters</h3>
            <p className="text-xs text-white/60 leading-relaxed font-mono">
              100 Peachtree St NW, Suite 2400<br />
              Atlanta, GA 30303, United States
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-3 group hover:border-[#7dd3fc]/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">call</span>
            </div>
            <h3 className="text-sm font-bold text-white font-headline">Direct Phone Lines</h3>
            <p className="text-xs text-white/60 leading-relaxed font-mono">
              Toll-Free: +1 (800) 555-ATLAS<br />
              HQ Office: +1 (404) 892-7000
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-3 group hover:border-[#7dd3fc]/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">mail</span>
            </div>
            <h3 className="text-sm font-bold text-white font-headline">Digital Communication</h3>
            <p className="text-xs text-white/60 leading-relaxed font-mono">
              General: contact@atlasbuild.com<br />
              RFP Intake: rfp@atlasbuild.com
            </p>
          </div>

          {/* Card 4: Hours */}
          <div className="bg-[#0f1524]/80 border border-[#334155]/40 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-3 group hover:border-[#7dd3fc]/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 flex items-center justify-center text-[#7dd3fc] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <h3 className="text-sm font-bold text-white font-headline">Operating Hours</h3>
            <p className="text-xs text-white/60 leading-relaxed font-mono">
              Mon – Fri: 08:00 – 18:00 EST<br />
              Emergency Site Dispatch: 24/7
            </p>
          </div>

        </div>

        {/* Section: Contact Form + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-7 bg-[#0f1524]/90 border border-[#334155]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#7dd3fc] uppercase tracking-wider">DIRECT INQUIRY</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-headline mt-1">Send Us a Message</h2>
              <p className="text-xs text-white/60 mt-1">
                Fill out the form below and an assigned engineering representative will respond promptly.
              </p>
            </div>

            {statusMsg && (
              <div
                className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
                  statusMsg.type === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-500/15 border-red-500/40 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {statusMsg.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{statusMsg.text}</span>
                </div>
                <button onClick={() => setStatusMsg(null)} className="text-white/60 hover:text-white">✕</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono font-semibold uppercase text-[11px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-[#334155]/60 text-white placeholder-white/30 focus:outline-none focus:border-[#7dd3fc] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/80 font-mono font-semibold uppercase text-[11px]">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-[#334155]/60 text-white placeholder-white/30 focus:outline-none focus:border-[#7dd3fc] transition-all"
                  />
                </div>
              </div>

              {/* Department / Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/80 font-mono font-semibold uppercase text-[11px]">Inquiry Type / Department *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[#0f1524] border border-[#334155]/60 text-white focus:outline-none focus:border-[#7dd3fc] transition-all cursor-pointer"
                >
                  <option value="General Infrastructure Inquiry">General Infrastructure Inquiry</option>
                  <option value="RFP & Pre-Construction Cost Consulting">RFP & Pre-Construction Cost Consulting</option>
                  <option value="Subcontractor & Vendor Partnership">Subcontractor & Vendor Partnership</option>
                  <option value="Client Portal Support">Client Portal Support</option>
                  <option value="Careers & Employment Inquiry">Careers & Employment Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/80 font-mono font-semibold uppercase text-[11px]">Project Parameters / Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief project scope details, location, schedule expectations..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-[#334155]/60 text-white placeholder-white/30 focus:outline-none focus:border-[#7dd3fc] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full h-12 bg-gradient-to-r from-[#7dd3fc] to-[#38bdf8] text-[#001f2e] font-bold rounded-xl hover:opacity-95 transition-all shadow-[0_0_20px_rgba(125,211,252,0.3)] uppercase tracking-wider font-label flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#001f2e] border-t-transparent rounded-full animate-spin"></div>
                    Submitting Inquiry...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    Submit Communication
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Regional Hubs & Interactive Map Component */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Interactive Map Visual Placeholder */}
            <div className="bg-[#0f1524]/90 border border-[#334155]/40 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] font-bold">
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  GLOBAL REGIONAL HUBS
                </div>
                <span className="text-[10px] font-mono bg-[#7dd3fc]/20 text-[#7dd3fc] px-2 py-0.5 rounded-full border border-[#7dd3fc]/30">
                  LIVE GIS GRID
                </span>
              </div>

              {/* Map Canvas Background Simulation */}
              <div className="w-full h-64 rounded-2xl bg-[#0b0f17] border border-[#334155]/60 relative overflow-hidden flex items-center justify-center group-hover:border-[#7dd3fc]/50 transition-all">
                
                {/* SVG Blueprint Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Simulated Pins */}
                <div className="absolute top-1/3 left-1/4 flex flex-col items-center gap-1 group/pin">
                  <div className="w-3 h-3 rounded-full bg-[#7dd3fc] shadow-[0_0_12px_#7dd3fc] animate-ping"></div>
                  <span className="text-[9px] font-mono font-bold bg-[#0f131c] text-[#7dd3fc] px-1.5 py-0.5 rounded border border-[#7dd3fc]/40">
                    ATLANTA HQ
                  </span>
                </div>

                <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center gap-1 group/pin">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]"></div>
                  <span className="text-[9px] font-mono text-white/80 bg-[#0f131c] px-1.5 py-0.5 rounded border border-white/20">
                    AUSTIN HUB
                  </span>
                </div>

                <div className="absolute top-1/4 right-1/4 flex flex-col items-center gap-1 group/pin">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] shadow-[0_0_10px_#60a5fa]"></div>
                  <span className="text-[9px] font-mono text-white/80 bg-[#0f131c] px-1.5 py-0.5 rounded border border-white/20">
                    CHICAGO HUB
                  </span>
                </div>

                <div className="text-center z-10 px-4">
                  <span className="text-xs font-headline font-bold text-white block">AtlasBuild Technical Command Grid</span>
                  <span className="text-[10px] text-white/50 font-mono">Latitude 33.7537° N, Longitude 84.3863° W</span>
                </div>

              </div>

              {/* Office Location Cards */}
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Atlanta HQ & Civil Command</span>
                    <span className="text-[11px] text-white/50">100 Peachtree St NW</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Austin Regional Engineering Hub</span>
                    <span className="text-[11px] text-white/50">300 W 6th St, Suite 1800</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              </div>

            </div>

            {/* Quick RFP Callout Card */}
            <div className="bg-gradient-to-r from-[#7dd3fc]/15 to-[#38bdf8]/5 border border-[#7dd3fc]/30 rounded-3xl p-6 backdrop-blur-xl flex flex-col gap-3">
              <span className="text-xs font-mono font-bold text-[#7dd3fc] uppercase">FORMAL BUILD REQUEST</span>
              <h3 className="text-lg font-bold text-white font-headline">Need a Certified RFP Estimate?</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                If you have completed blueprints or specific engineering parameters, submit directly via our Phase 1 Pre-Construction Intake Wizard.
              </p>
              <Link
                href="/quotes"
                className="w-fit mt-1 px-4 py-2.5 bg-[#7dd3fc] text-[#001f2e] text-xs font-bold rounded-xl hover:bg-[#38bdf8] transition-all shadow-[0_0_12px_rgba(125,211,252,0.3)] font-label uppercase tracking-wider flex items-center gap-2"
              >
                <span>Launch RFP Wizard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

          </div>

        </div>

      </main>

      <CookiePreferencesModal />
      <LandingFooter />

    </div>
  );
}
