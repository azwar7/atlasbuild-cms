'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import DashboardHeader from '../DashboardHeader';
import { AdminSettingsState } from '@/app/api/admin/settings/route';

type SettingsTab = 'general' | 'profile' | 'notifications' | 'security' | 'integrations' | 'system';

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTabParam = (searchParams.get('tab') as SettingsTab) || 'general';
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTabParam);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states
  const [settings, setSettings] = useState<AdminSettingsState>({
    company: {
      name: 'AtlasBuild Enterprise Systems Inc.',
      logoUrl: '/images/logo.png',
      email: 'ops@atlasbuild.com',
      phone: '+1 (800) 555-0199',
      address: '100 Peachtree Tower, Suite 2400, Atlanta, GA 30303',
      defaultCurrency: 'USD ($)',
      timeZone: 'UTC-5 (Eastern Time)',
      dateFormat: 'YYYY-MM-DD',
    },
    profile: {
      name: 'Elena Rostova',
      email: 'elena.r@atlasbuild.com',
      title: 'Lead Systems Controller & Chief Engineer',
      avatarBg: 'bg-[#f59e0b]',
    },
    notifications: {
      rfpAlerts: true,
      leadAlerts: true,
      projectUpdates: true,
      safetyAlerts: true,
      emailDigest: false,
    },
    security: {
      twoFactorEnabled: true,
      twoFactorType: 'Hardware Key / TOTP',
      sessionTimeoutMinutes: 30,
      ipWhitelistEnabled: false,
      lastLogin: new Date().toISOString(),
      lastLoginIp: '192.168.1.1',
    },
    integrations: {
      aiProvider: 'Hugging Face (Meta-Llama 3.2)',
      aiStatus: 'CONFIGURED',
      storageProvider: 'Cloudinary / S3 Blueprint Vault',
      storageStatus: 'CONNECTED',
      emailProvider: 'SendGrid Enterprise SMTP',
      emailStatus: 'CONFIGURED',
      databaseProvider: 'PostgreSQL 16 (Prisma ORM)',
      databaseStatus: 'CONNECTED',
    },
    system: {
      version: 'v2.4.0-Enterprise',
      environment: 'production',
      dbConnected: true,
      storageConnected: true,
      aiConnected: true,
    },
  });

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Backup state for Cancel/Reset
  const [originalSettings, setOriginalSettings] = useState<AdminSettingsState | null>(null);

  // Fetch initial settings from server API
  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const json = await res.json();
        if (json.success && json.data) {
          setSettings(json.data);
          setOriginalSettings(json.data);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    setFeedback(null);
    router.push(`/dashboard/settings?tab=${tab}`, { scroll: false });
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);

    // Validate password if user provided one
    if (activeTab === 'profile' || activeTab === 'security') {
      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          setFeedback({ type: 'error', message: 'New password and confirm password do not match.' });
          setSaving(false);
          return;
        }
        if (newPassword.length < 8) {
          setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' });
          setSaving(false);
          return;
        }
      }
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const json = await res.json();

      if (json.success) {
        setSettings(json.data);
        setOriginalSettings(json.data);
        setFeedback({ type: 'success', message: 'Settings saved and applied successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save settings.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalSettings) {
      setSettings(originalSettings);
      setFeedback({ type: 'success', message: 'Unsaved changes reverted to last saved state.' });
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="font-body relative min-h-screen text-white selection:bg-[#7dd3fc] selection:text-[#001f2e]">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/dashboard-skyscrapers.jpg')" }}
      >
        <div className="fixed inset-0 bg-[#0f1524]/75 backdrop-blur-[4px] z-[-1]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#7dd3fc]/5 backdrop-blur-[24px] border-r border-[#7dd3fc]/20 shadow-[0_0_15px_rgba(125,211,252,0.1)] z-50 flex flex-col pt-6 pb-6 select-none">
          
          {/* Logo Mark */}
          <div className="px-6 py-6 mb-4 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img 
                alt="AtlasBuild Logo" 
                className="h-8 w-8 object-contain" 
                src="/images/logo.png" 
              />
              <span className="font-headline text-[20px] text-white font-bold tracking-tight">
                AtlasBuild
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <Link 
              href="/dashboard" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">dashboard</span>
              Dashboard
            </Link>

            <Link 
              href="/portfolio" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">account_tree</span>
              Project Portfolio
            </Link>

            <Link 
              href="/dashboard/rfps" 
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">assignment_turned_in</span>
                RFP Proposals
              </div>
              <span className="bg-[#7dd3fc] text-[#001f2e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                2
              </span>
            </Link>

            <Link 
              href="/dashboard/leads" 
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">mail</span>
                Lead Inbox
              </div>
              <span className="bg-[#f59e0b] text-[#1a002e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                12
              </span>
            </Link>

            <Link 
              href="/careers" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">work</span>
              Careers
            </Link>

            <Link 
              href="/portal/proj-1/safety" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">health_and_safety</span>
              Safety Logs
            </Link>

            <Link 
              href="/dashboard/roles" 
              className="flex items-center px-4 py-2.5 rounded-lg text-white/70 hover:bg-[#7dd3fc]/10 hover:text-white transition-all font-headline text-sm"
            >
              <span className="material-symbols-outlined mr-3 text-[20px]">admin_panel_settings</span>
              Access Roles
            </Link>

            {/* Separated Settings Menu Item */}
            <div className="pt-3 mt-3 border-t border-[#7dd3fc]/15">
              <Link 
                href="/dashboard/settings" 
                aria-current="page"
                className="flex items-center px-4 py-2.5 rounded-lg transition-all bg-[#f59e0b]/20 text-[#f59e0b] font-semibold border border-[#f59e0b]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              >
                <span className="material-symbols-outlined mr-3 text-[20px]">settings</span>
                Settings
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Body */}
        <div className="pl-[220px] w-full">
          
          <DashboardHeader />

          <main className="relative pt-20 pb-16 px-8 max-w-[1280px] mx-auto w-full flex flex-col gap-8">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-headline text-2xl md:text-3xl text-white font-bold tracking-tight">
                    Admin System Settings
                  </h1>
                  <span className="bg-[#7dd3fc]/15 text-[#7dd3fc] border border-[#7dd3fc]/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                    Level 4 Control
                  </span>
                </div>
                <p className="text-xs text-white/60 font-body mt-1">
                  Manage company parameters, personal profile preferences, security telemetry, AI integrations, and system diagnostics.
                </p>
              </div>

              {/* Quick Save / Reset Header Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white/80 hover:text-white rounded-xl text-xs font-bold font-mono transition-all cursor-pointer disabled:opacity-50"
                >
                  Reset Changes
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f131c] rounded-xl text-xs font-bold uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback Alert Banner */}
            {feedback && (
              <div
                className={`p-4 rounded-xl border flex items-center justify-between text-xs font-medium backdrop-blur-md animate-in fade-in duration-200 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/60 border-red-500/40 text-red-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">
                    {feedback.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  <span>{feedback.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            {/* Settings Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
              {[
                { id: 'general', label: 'Company General', icon: 'business' },
                { id: 'profile', label: 'My Profile', icon: 'person' },
                { id: 'notifications', label: 'Notifications', icon: 'notifications' },
                { id: 'security', label: 'Security & Auth', icon: 'security' },
                { id: 'integrations', label: 'Integrations', icon: 'extension' },
                { id: 'system', label: 'System Health', icon: 'dns' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id as SettingsTab)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#7dd3fc]/20 text-[#7dd3fc] border border-[#7dd3fc]/40 shadow-[0_0_15px_rgba(125,211,252,0.2)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel Content Area */}
            {loading ? (
              <div className="bg-[#0f131c]/80 backdrop-blur-[24px] border border-white/15 rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#7dd3fc] text-[36px] animate-spin">progress_activity</span>
                <span className="text-xs font-mono text-white/60">Loading system settings...</span>
              </div>
            ) : (
              <div className="bg-[#0f131c]/80 backdrop-blur-[24px] border border-white/15 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* 1. GENERAL TAB */}
                {activeTab === 'general' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#7dd3fc]">business</span>
                        Company & Workspace Parameters
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Global organization details displayed across client RFP quotes, invoices, and blueprints.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Company Name</label>
                        <input
                          type="text"
                          value={settings.company.name}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, name: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Corporate Email</label>
                        <input
                          type="email"
                          value={settings.company.email}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, email: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Phone Number</label>
                        <input
                          type="text"
                          value={settings.company.phone}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, phone: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Default Currency</label>
                        <select
                          value={settings.company.defaultCurrency}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, defaultCurrency: e.target.value },
                            })
                          }
                          className="bg-[#0f131c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        >
                          <option value="USD ($)">USD ($) - United States Dollar</option>
                          <option value="EUR (€)">EUR (€) - Euro</option>
                          <option value="GBP (£)">GBP (£) - British Pound</option>
                          <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                          <option value="AUD ($)">AUD ($) - Australian Dollar</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Time Zone</label>
                        <select
                          value={settings.company.timeZone}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, timeZone: e.target.value },
                            })
                          }
                          className="bg-[#0f131c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        >
                          <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time - US & Canada)</option>
                          <option value="UTC-6 (Central Time)">UTC-6 (Central Time - US & Canada)</option>
                          <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time - US & Canada)</option>
                          <option value="UTC+0 (GMT/UTC)">UTC+0 (GMT/UTC)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Date Format</label>
                        <select
                          value={settings.company.dateFormat}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, dateFormat: e.target.value },
                            })
                          }
                          className="bg-[#0f131c] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        >
                          <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-12)</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY (08/12/2026)</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY (12/08/2026)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Headquarters Address</label>
                        <textarea
                          rows={2}
                          value={settings.company.address}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              company: { ...settings.company, address: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. MY PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#f59e0b]">person</span>
                        My Personal Profile
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Manage your administrator display credentials, email preferences, and password.
                      </p>
                    </div>

                    <div className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-16 h-16 rounded-full bg-[#f59e0b] flex items-center justify-center border-2 border-white/30 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                        <span className="material-symbols-outlined text-[#0f131c] text-[36px] font-bold">person</span>
                      </div>
                      <div>
                        <h4 className="font-headline text-base font-bold text-white">{settings.profile.name}</h4>
                        <p className="text-xs text-[#7dd3fc] font-mono font-bold mt-0.5 uppercase tracking-wide">
                          {settings.profile.title}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5">{settings.profile.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Admin Display Name</label>
                        <input
                          type="text"
                          value={settings.profile.name}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              profile: { ...settings.profile, name: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono text-[#7dd3fc] uppercase font-bold">Email Address</label>
                        <input
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              profile: { ...settings.profile, email: e.target.value },
                            })
                          }
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc] font-body"
                        />
                      </div>
                    </div>

                    {/* Change Password Sub-Section */}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                      <h4 className="font-headline text-sm font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400">lock_reset</span>
                        Change Account Password
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/70 uppercase">Current Password</label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/70 uppercase">New Password</label>
                          <input
                            type="password"
                            placeholder="Min 8 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc]"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono text-white/70 uppercase">Confirm New Password</label>
                          <input
                            type="password"
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7dd3fc]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NOTIFICATIONS TAB */}
                {activeTab === 'notifications' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-400">notifications</span>
                        Notification & Alert Channels
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Configure real-time system alerts, RFP updates, safety logs, and email digests.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {[
                        {
                          key: 'rfpAlerts',
                          title: 'New RFP Proposal Alerts',
                          desc: 'Receive immediate alerts when new commercial or civil RFP proposals are logged by clients.',
                        },
                        {
                          key: 'leadAlerts',
                          title: 'Lead Inbox Notifications',
                          desc: 'Get notified when new prospective client leads contact AtlasBuild engineering.',
                        },
                        {
                          key: 'projectUpdates',
                          title: 'Project Milestone & CAD Updates',
                          desc: 'Alerts when field logs, schedule milestones, or vector blueprints are uploaded.',
                        },
                        {
                          key: 'safetyAlerts',
                          title: 'OSHA EMR Safety Alerts',
                          desc: 'High-priority notifications for safety incidents or EMR score compliance recalculations.',
                        },
                        {
                          key: 'emailDigest',
                          title: 'Daily Email Executive Summary',
                          desc: 'Receive a consolidated daily digest email with telemetry metrics at 08:00 EST.',
                        },
                      ].map((item) => {
                        const isChecked = settings.notifications[item.key as keyof typeof settings.notifications];
                        return (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                          >
                            <div className="flex flex-col pr-4">
                              <span className="font-headline text-sm font-bold text-white">{item.title}</span>
                              <span className="text-xs text-white/60 mt-0.5">{item.desc}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setSettings({
                                  ...settings,
                                  notifications: {
                                    ...settings.notifications,
                                    [item.key]: !isChecked,
                                  },
                                })
                              }
                              className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer flex items-center ${
                                isChecked ? 'bg-[#7dd3fc] justify-end' : 'bg-white/20 justify-start'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full transition-transform ${
                                  isChecked ? 'bg-[#001f2e]' : 'bg-white/80'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. SECURITY TAB */}
                {activeTab === 'security' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400">security</span>
                        Security, Session Telemetry & 2FA
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Inspect active browser sessions, hardware key status, and authentication security policies.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono uppercase text-white/50">Two-Factor Authentication</span>
                          <h4 className="font-headline text-sm font-bold text-white mt-0.5">
                            {settings.security.twoFactorType}
                          </h4>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase">
                          ACTIVE & VERIFIED
                        </span>
                      </div>

                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono uppercase text-white/50">Last Login Telemetry</span>
                          <h4 className="font-headline text-sm font-bold text-white mt-0.5">
                            IP: {settings.security.lastLoginIp}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-[#7dd3fc]">
                          Just now
                        </span>
                      </div>
                    </div>

                    {/* Active Sessions List */}
                    <div className="flex flex-col gap-3 pt-2">
                      <h4 className="font-headline text-sm font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#7dd3fc]">devices</span>
                        Active Authenticated Sessions
                      </h4>

                      <div className="flex flex-col gap-2">
                        <div className="p-4 bg-white/5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-emerald-400">laptop_mac</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-headline text-xs font-bold text-white">Chrome on Windows (Current Session)</span>
                                <span className="bg-emerald-400/20 text-emerald-300 text-[9px] font-mono px-1.5 py-0.2 rounded uppercase">Current</span>
                              </div>
                              <span className="text-[11px] text-white/50 font-mono">IP: 192.168.1.1 • Atlanta, GA, USA</span>
                            </div>
                          </div>
                          <span className="text-xs text-emerald-400 font-mono font-bold">Online</span>
                        </div>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between opacity-75">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-white/60">smartphone</span>
                            <div>
                              <span className="font-headline text-xs font-bold text-white">Safari on iOS (AtlasBuild Mobile)</span>
                              <p className="text-[11px] text-white/50 font-mono">IP: 172.56.21.94 • Active 2 hours ago</p>
                            </div>
                          </div>
                          <button type="button" className="text-xs text-red-400 hover:text-red-300 font-mono">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. INTEGRATIONS TAB */}
                {activeTab === 'integrations' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#7dd3fc]">extension</span>
                        Infrastructure & External API Integrations
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Status indicators for AI analysis engines, blueprint object storage, email gateways, and database adapters.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: 'AI Analysis Provider',
                          service: settings.integrations.aiProvider,
                          status: settings.integrations.aiStatus,
                          icon: 'psychology',
                          color: 'text-purple-400',
                        },
                        {
                          name: 'Document & Blueprint Storage',
                          service: settings.integrations.storageProvider,
                          status: settings.integrations.storageStatus,
                          icon: 'cloud_done',
                          color: 'text-[#7dd3fc]',
                        },
                        {
                          name: 'Transactional Email Service',
                          service: settings.integrations.emailProvider,
                          status: settings.integrations.emailStatus,
                          icon: 'mark_email_read',
                          color: 'text-amber-400',
                        },
                        {
                          name: 'Primary Database Engine',
                          service: settings.integrations.databaseProvider,
                          status: settings.integrations.databaseStatus,
                          icon: 'database',
                          color: 'text-emerald-400',
                        },
                      ].map((item) => (
                        <div key={item.name} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-[24px] ${item.color}`}>{item.icon}</span>
                            <div>
                              <span className="text-xs font-mono uppercase text-white/50">{item.name}</span>
                              <h4 className="font-headline text-sm font-bold text-white mt-0.5">{item.service}</h4>
                            </div>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. SYSTEM TAB */}
                {activeTab === 'system' && (
                  <div className="flex flex-col gap-6">
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400">dns</span>
                        System Health & Telemetry Diagnostics
                      </h3>
                      <p className="text-xs text-white/60 mt-0.5">
                        Real-time runtime state, database connectivity, build metadata, and infrastructure health.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-white/50">CMS Build Version</span>
                        <span className="text-lg font-headline font-bold text-white">{settings.system.version}</span>
                        <span className="text-[11px] font-mono text-[#7dd3fc]">Next.js 16 (Turbopack)</span>
                      </div>

                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-white/50">Environment Mode</span>
                        <span className="text-lg font-headline font-bold text-amber-400 capitalize">{settings.system.environment}</span>
                        <span className="text-[11px] font-mono text-white/60">Strict Security Headers Active</span>
                      </div>

                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase text-white/50">Health Check Status</span>
                        <span className="text-lg font-headline font-bold text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          All Operational
                        </span>
                        <span className="text-[11px] font-mono text-white/60">Latency: 14ms</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f131c] flex items-center justify-center text-white">
        <span className="material-symbols-outlined text-[36px] animate-spin text-[#7dd3fc]">progress_activity</span>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
