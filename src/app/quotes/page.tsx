'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import CookiePreferencesModal from '@/components/CookiePreferencesModal';

export default function QuotesPage() {
  const [step, setStep] = useState(2); // Step 2 (Parameters) default active
  
  // Step 1: General Scope & Contact
  const [name, setName] = useState('Elena Rostova');
  const [email, setEmail] = useState('elena.r@atlasbuild.com');
  const [company, setCompany] = useState('Eastside Logistics Corp');
  const [projectTitle, setProjectTitle] = useState('Eastside Logistics Center');

  // Step 2: Parameters
  const [startDate, setStartDate] = useState('');
  const [squareFootage, setSquareFootage] = useState('450000');
  const [sector, setSector] = useState('industrial');
  const [budgetValue, setBudgetValue] = useState(40); // slider percent 0..100 -> $2.5M - $5.0M+

  // Step 3: Documents & Scope Details
  const [location, setLocation] = useState('Boston, MA');
  const [description, setDescription] = useState('Engineering construction build scope for warehouse facilities, steel framing, and mezzanine slab load tests.');
  const [blueprintUrl, setBlueprintUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Compute budget display label from slider
  const getBudgetLabel = (val: number) => {
    if (val < 25) return "$1.0M - $2.5M";
    if (val < 55) return "$2.5M - $5.0M+";
    if (val < 80) return "$5.0M - $15.0M+";
    return "$15.0M - $50.0M+";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          projectTitle: projectTitle || "Build RFP Proposal",
          sector: sector.toUpperCase(),
          budgetRange: getBudgetLabel(budgetValue),
          location: location || "Boston, MA",
          description,
          blueprintUrl: blueprintUrl || undefined
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Failed to submit estimate proposal.');
      }

      setSuccess(`Proposal logged successfully! Proposal Reference ID: #${json.data.id.substring(0, 8)}`);
    } catch (err: any) {
      setError(err.message || 'Server network failure. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-body text-on-surface antialiased flex flex-col selection:bg-primary selection:text-on-primary">
      
      {/* Blueprint Architectural Background Image */}
      <div 
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/blueprint-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0f131c]/85 to-[#0a0e1a]/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Container above background */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        <LandingHeader />

        {/* Main RFP Form Content Center */}
        <div className="w-full">
          <main className="relative pt-24 pb-16 w-full min-h-screen flex items-center justify-center px-6 lg:px-12">
            
            <div className="relative w-full max-w-[760px] rounded-3xl bg-[#0f131c]/80 backdrop-blur-[24px] border border-white/10 p-8 lg:p-12 shadow-2xl overflow-hidden my-auto">
              
              {/* Highlight border simulation */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-transparent to-transparent"></div>
              
              <div className="flex flex-col gap-8">
                
                {/* Form Header */}
                <div className="flex flex-col gap-2">
                  <span className="font-label text-xs text-primary uppercase tracking-widest font-bold">
                    Phase 1 Pre-Construction RFP Intake
                  </span>
                  <h1 className="font-headline text-3xl lg:text-4xl text-white font-extrabold tracking-tight">
                    Request an Engineering Build Quote
                  </h1>
                </div>

                {/* Progress Tracker */}
                <div className="flex items-center w-full gap-4 relative">
                  {/* Connector line */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
                  
                  {/* Step 1: General Scope */}
                  <div 
                    onClick={() => setStep(1)}
                    className="flex-1 flex flex-col items-center gap-2 bg-transparent z-10 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      step > 1 ? 'bg-[#0f131c] border border-primary text-primary' : step === 1 ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-[#0f131c] border border-white/20 text-white/50'
                    }`}>
                      {step > 1 ? (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      ) : (
                        <span className="text-xs font-mono font-bold">1</span>
                      )}
                    </div>
                    <span className={`text-xs font-label font-bold ${
                      step === 1 ? 'text-primary' : step > 1 ? 'text-white' : 'text-white/40'
                    }`}>
                      General Scope
                    </span>
                  </div>

                  {/* Step 2: Parameters */}
                  <div 
                    onClick={() => setStep(2)}
                    className="flex-1 flex flex-col items-center gap-2 bg-transparent z-10 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      step > 2 ? 'bg-[#0f131c] border border-primary text-primary' : step === 2 ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-[#0f131c] border border-white/20 text-white/50'
                    }`}>
                      {step > 2 ? (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      ) : (
                        <span className="text-xs font-mono font-bold">2</span>
                      )}
                    </div>
                    <span className={`text-xs font-label font-bold ${
                      step === 2 ? 'text-primary' : step > 2 ? 'text-white' : 'text-white/40'
                    }`}>
                      Parameters
                    </span>
                  </div>

                  {/* Step 3: Documents */}
                  <div 
                    onClick={() => setStep(3)}
                    className="flex-1 flex flex-col items-center gap-2 bg-transparent z-10 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      step === 3 ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-[#0f131c] border border-white/20 text-white/50'
                    }`}>
                      <span className="text-xs font-mono font-bold">3</span>
                    </div>
                    <span className={`text-xs font-label font-bold ${
                      step === 3 ? 'text-primary' : 'text-white/40'
                    }`}>
                      Documents
                    </span>
                  </div>
                </div>

                {/* Form Body */}
                {success ? (
                  <div className="text-center py-8 space-y-6">
                    <div className="mx-auto w-14 h-14 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary text-3xl font-bold">
                      ✓
                    </div>
                    <h2 className="text-2xl font-headline font-bold text-white">Proposal Logged</h2>
                    <p className="text-sm font-body text-on-surface-variant max-w-md mx-auto">
                      {success}. Our engineering estimating team will audit your parameters and contact you shortly.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-xs font-label font-bold uppercase tracking-wider text-black hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    {error && (
                      <div className="rounded-xl bg-error/20 border border-error/30 p-4 text-xs font-mono text-error">
                        {error}
                      </div>
                    )}

                    {/* STEP 1: GENERAL SCOPE / CONTACT */}
                    {step === 1 && (
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Full Name</label>
                            <input 
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Elena Rostova"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Work Email</label>
                            <input 
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="elena.r@atlasbuild.com"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Company Name</label>
                            <input 
                              type="text"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              placeholder="Eastside Logistics Corp"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Project Title</label>
                            <input 
                              type="text"
                              required
                              value={projectTitle}
                              onChange={(e) => setProjectTitle(e.target.value)}
                              placeholder="Eastside Logistics Center"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end items-center mt-6 pt-6 border-t border-white/10">
                          <button 
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!name || !email}
                            className="px-6 py-3 rounded-full bg-primary text-black font-label text-xs uppercase tracking-wider font-bold hover:bg-primary-fixed transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
                          >
                            Proceed to Parameters
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: PARAMETERS */}
                    {step === 2 && (
                      <div className="flex flex-col gap-6">
                        
                        {/* Row 1: Start Date & Square Footage */}
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Desired Start Date</label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="MM/DD/YYYY"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                              />
                              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                                calendar_month
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Total Square Footage</label>
                            <input 
                              type="number"
                              value={squareFootage}
                              onChange={(e) => setSquareFootage(e.target.value)}
                              placeholder="e.g. 450000"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                        </div>

                        {/* Row 2: Sector Selector */}
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Sector Selector</label>
                          <div className="relative">
                            <select 
                              value={sector}
                              onChange={(e) => setSector(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer"
                            >
                              <option className="bg-[#0f131c]" value="commercial">Commercial Build</option>
                              <option className="bg-[#0f131c]" value="industrial">Industrial Facility</option>
                              <option className="bg-[#0f131c]" value="residential">Multi-family Residential</option>
                              <option className="bg-[#0f131c]" value="infrastructure">Infrastructure / Civil</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                              expand_more
                            </span>
                          </div>
                        </div>

                        {/* Row 3: Estimated Project Budget Range */}
                        <div className="flex flex-col gap-4 pt-2">
                          <div className="flex justify-between items-end">
                            <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Estimated Project Budget Range</label>
                            <span className="text-xl font-headline text-white font-bold font-mono">
                              {getBudgetLabel(budgetValue)}
                            </span>
                          </div>

                          <div className="relative h-2 w-full bg-white/10 rounded-full mt-2">
                            <input 
                              type="range"
                              min="1"
                              max="100"
                              value={budgetValue}
                              onChange={(e) => setBudgetValue(Number(e.target.value))}
                              className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                            />
                            {/* Visual Track */}
                            <div 
                              className="absolute top-0 left-0 h-full bg-primary rounded-l-full z-10" 
                              style={{ width: `${budgetValue}%` }}
                            ></div>
                            {/* Visual Thumb */}
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10 -ml-2.5 pointer-events-none" 
                              style={{ left: `${budgetValue}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Row 4: Compliance Note */}
                        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mt-2">
                          <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
                          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                            All designs must comply with EMR rating standards under regional OSHA bounds.
                          </p>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all font-label text-xs uppercase tracking-wider font-bold"
                          >
                            Previous Step
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => setStep(3)}
                            className="px-6 py-3 rounded-full bg-primary text-black font-label text-xs uppercase tracking-wider font-bold hover:bg-primary-fixed transition-all flex items-center gap-2 shadow-md"
                          >
                            Proceed to Blueprint Upload
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: DOCUMENTS & SUBMISSION */}
                    {step === 3 && (
                      <div className="flex flex-col gap-6">
                        
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Site Location Address</label>
                          <input 
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Boston, MA"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Detailed Engineering Build Description</label>
                          <textarea 
                            required
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Specify scope details, load bearing requirements, mezzanine levels..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-label uppercase tracking-wider text-primary font-bold">Secure Blueprint Document URL (Optional)</label>
                          <input 
                            type="url"
                            value={blueprintUrl}
                            onChange={(e) => setBlueprintUrl(e.target.value)}
                            placeholder="https://res.cloudinary.com/.../drawing.pdf"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                          />
                        </div>

                        {/* Summary pill */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col gap-1 text-xs font-mono text-on-surface-variant">
                          <div><span className="font-bold text-white">Client:</span> {name} ({company})</div>
                          <div><span className="font-bold text-white">Project:</span> {projectTitle} ({sector.toUpperCase()})</div>
                          <div><span className="font-bold text-white">Budget Target:</span> {getBudgetLabel(budgetValue)}</div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                          <button 
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all font-label text-xs uppercase tracking-wider font-bold"
                          >
                            Previous Step
                          </button>
                          
                          <button 
                            type="submit"
                            disabled={loading || description.length < 10}
                            className="px-6 py-3 rounded-full bg-primary text-black font-label text-xs uppercase tracking-wider font-bold hover:bg-primary-fixed transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
                          >
                            {loading ? 'Submitting RFP...' : 'Submit Engineering RFP'}
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </main>
        </div>

        <CookiePreferencesModal />
        <LandingFooter />

      </div>
    </div>
  );
}
