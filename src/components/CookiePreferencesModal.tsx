'use client';

import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  functional: true,
  marketing: false,
};

export default function CookiePreferencesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('atlasbuild_cookie_preferences');
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_PREFERENCES;
  });
  const [savedBanner, setSavedBanner] = useState(false);

  // Listen for global trigger event to open cookie modal
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-cookie-settings', handleOpenEvent);
    return () => window.removeEventListener('open-cookie-settings', handleOpenEvent);
  }, []);

  const savePreferences = (newPrefs: CookiePreferences) => {
    setPrefs(newPrefs);
    try {
      localStorage.setItem('atlasbuild_cookie_preferences', JSON.stringify(newPrefs));
    } catch {
      // Fallback silently
    }
    setIsOpen(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, functional: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    savePreferences({ essential: true, analytics: false, functional: false, marketing: false });
  };

  const handleSaveCustom = () => {
    savePreferences(prefs);
  };

  if (!isOpen && !savedBanner) return null;

  return (
    <>
      {/* Toast Notification when saved */}
      {savedBanner && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f1524] border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-mono animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>Cookie preferences saved successfully.</span>
        </div>
      )}

      {/* Cookie Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl bg-[#0f1524] border border-[#7dd3fc]/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl z-10 flex flex-col gap-6 animate-in zoom-in-95 duration-150 text-on-surface">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#7dd3fc] font-bold">
                  <span className="material-symbols-outlined text-[18px]">cookie</span>
                  PRIVACY & COOKIE PREFERENCES
                </div>
                <h3 className="text-xl font-headline font-bold text-white">Manage Cookie Settings</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-white/70 leading-relaxed font-body">
              AtlasBuild CMS uses essential cookies to enable user authentication, security, and system operation. We also use optional analytics and functional cookies to enhance your experience. Select your preferences below.
            </p>

            {/* Category Toggles List */}
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              
              {/* 1. Essential */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Essential Cookies</span>
                    <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      ALWAYS ACTIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50">Required for session authentication, security headers, and RFP form submissions.</p>
                </div>
                <input
                  type="checkbox"
                  disabled
                  checked={true}
                  className="w-4 h-4 accent-[#7dd3fc] cursor-not-allowed opacity-70"
                />
              </div>

              {/* 2. Analytics */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-white">Analytics & Performance</span>
                  <p className="text-[11px] text-white/50">Aggregated telemetry data to measure page load speeds and API response times.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  className="w-4 h-4 accent-[#7dd3fc] cursor-pointer"
                />
              </div>

              {/* 3. Functional */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-white">Functional Preferences</span>
                  <p className="text-[11px] text-white/50">Remembers UI preferences, portal filter states, and layout settings.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })}
                  className="w-4 h-4 accent-[#7dd3fc] cursor-pointer"
                />
              </div>

              {/* 4. Marketing */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-white">Marketing & Communications</span>
                  <p className="text-[11px] text-white/50">Used to measure campaign effectiveness for new civil engineering releases.</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  className="w-4 h-4 accent-[#7dd3fc] cursor-pointer"
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-semibold transition-all"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7dd3fc] text-[#001f2e] text-xs font-bold hover:bg-[#38bdf8] transition-all uppercase tracking-wider font-label shadow-[0_0_15px_rgba(125,211,252,0.3)]"
              >
                Accept All
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
