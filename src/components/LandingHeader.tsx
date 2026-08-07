'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LandingHeader() {
  const pathname = usePathname();
  const { user, isAuthenticated, loading, logout, getDashboardUrl } = useAuth();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background scrolling & support Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);



  const dashboardUrl = getDashboardUrl(user);

  // Get User Initials (e.g., "Elena Rostova" -> "ER")
  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return parts[0][0].toUpperCase();
    }
    if (email) return email[0].toUpperCase();
    return 'U';
  };

  const navLinks = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Careers', href: '/careers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#0f131c]/90 backdrop-blur-[24px] border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="h-full w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between relative">
        
        {/* LEFT SECTION: Brand Logo & Title */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img
              alt="AtlasBuild Logo"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
              src="/images/logo.png"
            />
            <span className="font-headline font-bold text-lg sm:text-xl text-white group-hover:text-primary transition-colors tracking-tight">
              AtlasBuild
            </span>
          </Link>
        </div>

        {/* CENTER SECTION: Desktop Navigation Links (Hidden on Mobile/Tablet <1024px) */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-label transition-all hover:text-white ${
                  isActive
                    ? 'text-primary font-bold shadow-[0_1px_0_0_#7dd3fc]'
                    : 'text-on-surface-variant hover:text-white font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SECTION: Desktop Auth Actions & Mobile Hamburger Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {loading ? (
            // Skeleton pulse while checking auth state
            <div className="w-24 sm:w-28 h-9 bg-white/5 rounded-full animate-pulse border border-white/10"></div>
          ) : isAuthenticated && user ? (
            // Authenticated Desktop Dropdown + Shortcut
            <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
              
              {/* Role Dashboard Shortcut Button */}
              <Link
                href={dashboardUrl}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-xs font-label hover:bg-primary/30 transition-all backdrop-blur-md font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(125,211,252,0.2)]"
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                Dashboard
              </Link>

              {/* Profile Avatar & Desktop Dropdown Trigger */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-label="User Account Menu"
                  className="flex items-center gap-2.5 p-1 pr-3 bg-white/5 border border-white/15 rounded-full hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-[#38bdf8] text-[#001f2e] font-bold text-xs flex items-center justify-center shadow-inner font-mono">
                    {getInitials(user.name, user.email)}
                  </div>
                  <span className="text-xs font-semibold text-white max-w-[120px] truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-white/60">
                    {dropdownOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#0f1524] border border-[#7dd3fc]/30 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    
                    {/* User Info Header */}
                    <div className="pb-3 border-b border-white/10 flex flex-col gap-1">
                      <p className="text-sm font-bold text-white truncate">{user.name || 'User Account'}</p>
                      <p className="text-xs text-white/60 font-mono truncate">{user.email}</p>
                      <span className="mt-1 w-fit text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40 px-2 py-0.5 rounded-full">
                        {user.role}
                      </span>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-1">
                      <Link
                        href={dashboardUrl}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                        Go to Workspace
                      </Link>
                      <Link
                        href="/quotes"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">request_quote</span>
                        Request Quote / RFP
                      </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sign Out
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          ) : (
            // Guest Desktop Buttons (Hidden on Mobile/Tablet <1024px)
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                Log In
              </Link>
              <Link
                href="/login?tab=signup"
                className="px-4 py-2 bg-primary text-[#001f2e] text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(125,211,252,0.3)] font-label uppercase tracking-wider"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* MOBILE / TABLET HAMBURGER BUTTON (<1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-primary/40 transition-all cursor-pointer focus:outline-none flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

        </div>

      </div>

      {/* MOBILE NAVIGATION DRAWER OVERLAY (<1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 lg:hidden">
          
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 top-20 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-Down Mobile Drawer Panel */}
          <div
            ref={mobileMenuRef}
            className="relative w-full max-h-[calc(100vh-80px)] bg-[#0f1524] border-b border-[#7dd3fc]/30 p-6 shadow-2xl overflow-y-auto flex flex-col gap-6 animate-in slide-in-from-top-4 duration-200"
          >
            
            {/* Primary Navigation Links */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono font-bold text-[#7dd3fc] uppercase tracking-wider px-3 pb-1 border-b border-white/10">
                Navigation
              </span>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === '/'
                    ? 'bg-primary/15 text-primary border border-primary/30 font-bold'
                    : 'text-white/90 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                Home
              </Link>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30 font-bold'
                        : 'text-white/90 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {link.name === 'Portfolio' ? 'location_city' : link.name === 'Careers' ? 'work' : link.name === 'About' ? 'info' : 'contact_mail'}
                    </span>
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/quotes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === '/quotes'
                    ? 'bg-primary/15 text-primary border border-primary/30 font-bold'
                    : 'text-[#7dd3fc] hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">request_quote</span>
                Request RFP Estimate
              </Link>
            </div>

            {/* Mobile User / Auth State Footer Container */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated && user ? (
                // Authenticated Mobile User Card & Actions
                <div className="flex flex-col gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-[#38bdf8] text-[#001f2e] font-bold text-sm flex items-center justify-center shadow-inner font-mono">
                      {getInitials(user.name, user.email)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-white truncate">{user.name || 'User Account'}</span>
                      <span className="text-xs text-white/60 font-mono truncate">{user.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40 px-2 py-0.5 rounded-full">
                      {user.role}
                    </span>

                    <Link
                      href={dashboardUrl}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 bg-primary text-[#001f2e] text-xs font-bold rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wider font-label"
                    >
                      Dashboard
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="mt-1 w-full py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-bold text-xs hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out Account
                  </button>

                </div>
              ) : (
                // Guest Mobile Actions
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 bg-white/10 border border-white/15 text-white font-bold rounded-xl text-center text-sm hover:bg-white/20 transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/login?tab=signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 bg-primary text-[#001f2e] font-bold rounded-xl text-center text-sm hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(125,211,252,0.3)] uppercase tracking-wider font-label"
                  >
                    Create Free Account
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </header>
  );
}
