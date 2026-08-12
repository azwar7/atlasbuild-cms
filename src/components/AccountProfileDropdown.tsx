'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface AccountProfileDropdownProps {
  userName?: string;
  userRole?: string;
  userEmail?: string;
  organization?: string;
  avatarBg?: string;
  portalId?: string;
}

export default function AccountProfileDropdown({
  userName = "Admin User",
  userRole = "SYSTEM CONTROLLER",
  userEmail = "admin@atlasbuild.com",
  organization = "AtlasBuild Enterprise",
  avatarBg = "bg-[#f59e0b]",
  portalId
}: AccountProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer select-none group focus:outline-none"
        title="Click to view Account Information"
      >
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">
            {userName}
          </div>
          <div className="text-[10px] text-[#7dd3fc] uppercase tracking-wider font-mono">
            {userRole}
          </div>
        </div>
        <div className={`relative w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center border border-white/20 shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform`}>
          <span className="material-symbols-outlined text-[#1a002e] text-[20px] font-bold">person</span>
          {/* Active online indicator dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f131c]"></span>
        </div>
      </button>

      {/* Glassmorphic Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#0f131c]/95 backdrop-blur-[24px] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Decorative Top Accent Border */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

          {/* User Header Profile */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className={`w-12 h-12 rounded-full ${avatarBg} flex items-center justify-center border border-white/30 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex-shrink-0`}>
              <span className="material-symbols-outlined text-[#1a002e] text-[26px]">person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-headline text-sm font-bold text-white truncate">{userName}</h4>
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase border border-emerald-500/30">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-[#7dd3fc] font-mono font-bold tracking-wide uppercase truncate mt-0.5">
                {userRole}
              </span>
              <span className="text-xs text-white/60 font-body truncate">
                {userEmail}
              </span>
            </div>
          </div>

          {/* Detailed Account Security Info Cards */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              Account Security Telemetry
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex flex-col gap-1">
                <span className="text-[10px] text-white/50 font-mono">Organization</span>
                <span className="text-white font-bold truncate text-[11px]">{organization}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex flex-col gap-1">
                <span className="text-[10px] text-white/50 font-mono">Clearance</span>
                <span className="text-primary font-bold font-mono text-[11px]">Level 4 Exec</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <span className="material-symbols-outlined text-emerald-400 text-[16px]">lock</span>
                <span>E2E Session Security</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Quick Menu Actions */}
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            <Link
              href="/dashboard/settings?tab=profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">person</span>
              <span>My Profile</span>
            </Link>

            <Link
              href="/dashboard/settings?tab=general"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/90 hover:text-white hover:bg-white/10 transition-colors font-medium"
            >
              <span className="material-symbols-outlined text-[#7dd3fc] text-[18px]">settings</span>
              <span>Account</span>
            </Link>
          </div>

          {/* Sign Out / Logout Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                try {
                  await fetch('/api/auth/logout', { method: 'POST' });
                } catch (e) {}
                window.location.href = '/login';
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-label font-bold uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Logout</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
