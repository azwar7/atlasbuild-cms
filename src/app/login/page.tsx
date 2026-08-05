'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup / Claim Invite state
  const [inviteToken, setInviteToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Authentication failed.');
      }

      const role = json.data?.user?.role;
      if (role === 'ADMIN' || role === 'PROJECT_MANAGER') {
        router.push('/dashboard');
      } else {
        router.push('/portal/proj-1');
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/complete-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: inviteToken,
          password: signupPassword,
          name: fullName,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || 'Account activation failed.');
      }

      setSuccessMsg('Account activated successfully! Redirecting to login...');
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMsg(null);
      }, 2000);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Invitation token verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F17] px-6 text-[#F8FAFC]">
      <div className="w-full max-w-md rounded-2xl border border-[#7dd3fc]/30 bg-[#1E293B]/60 p-8 backdrop-blur-[24px] shadow-[0_0_30px_rgba(125,211,252,0.1)]">
        
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#F8FAFC] hover:opacity-90 transition-opacity">
            ATLAS<span className="text-[#7dd3fc]">BUILD</span>
          </Link>
          <p className="text-xs text-white/60 uppercase font-mono tracking-widest mt-1">
            Enterprise Client & Member Verification
          </p>
        </div>

        {/* Dual Tab Navigation */}
        <div className="flex items-center gap-2 bg-[#0a0e1a]/80 p-1.5 rounded-xl border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-[#7dd3fc] text-[#001f2e] shadow-[0_0_12px_rgba(125,211,252,0.4)]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'signup'
                ? 'bg-[#7dd3fc] text-[#001f2e] shadow-[0_0_12px_rgba(125,211,252,0.4)]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Claim Invite / Sign Up
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-950/60 border border-red-500/40 p-4 text-xs font-medium text-red-200">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-4 text-xs font-medium text-emerald-200">
            {successMsg}
          </div>
        )}

        {/* LOG IN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7dd3fc] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin.elena@atlasbuild.com"
                className="w-full h-11 rounded-lg border border-[#334155] bg-[#0B0F17]/70 px-4 text-sm text-white placeholder-white/30 focus:border-[#7dd3fc] focus:ring-1 focus:ring-[#7dd3fc] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7dd3fc] mb-2">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 rounded-lg border border-[#334155] bg-[#0B0F17]/70 px-4 text-sm text-white placeholder-white/30 focus:border-[#7dd3fc] focus:ring-1 focus:ring-[#7dd3fc] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full h-11 items-center justify-center rounded-lg bg-[#7dd3fc] text-sm font-bold text-[#001f2e] hover:bg-[#38bdf8] disabled:bg-opacity-50 transition-all shadow-[0_0_15px_rgba(125,211,252,0.3)]"
            >
              {loading ? 'Authenticating...' : 'Log In to Workspace'}
            </button>
          </form>
        )}

        {/* SIGN UP / CLAIM INVITE FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleClaimInvite} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7dd3fc] mb-1.5">
                Invitation Token
              </label>
              <input
                type="text"
                required
                value={inviteToken}
                onChange={(e) => setInviteToken(e.target.value)}
                placeholder="e.g. c4a89f92e01b3d58a9f0..."
                className="w-full h-10 rounded-lg border border-[#334155] bg-[#0B0F17]/70 px-4 text-xs font-mono text-white placeholder-white/30 focus:border-[#7dd3fc] focus:ring-1 focus:ring-[#7dd3fc] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7dd3fc] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full h-10 rounded-lg border border-[#334155] bg-[#0B0F17]/70 px-4 text-xs text-white placeholder-white/30 focus:border-[#7dd3fc] focus:ring-1 focus:ring-[#7dd3fc] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7dd3fc] mb-1.5">
                Create Security Password
              </label>
              <input
                type="password"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full h-10 rounded-lg border border-[#334155] bg-[#0B0F17]/70 px-4 text-xs text-white placeholder-white/30 focus:border-[#7dd3fc] focus:ring-1 focus:ring-[#7dd3fc] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full h-11 items-center justify-center rounded-lg bg-[#7dd3fc] text-sm font-bold text-[#001f2e] hover:bg-[#38bdf8] disabled:bg-opacity-50 transition-all shadow-[0_0_15px_rgba(125,211,252,0.3)] mt-2"
            >
              {loading ? 'Activating Account...' : 'Activate Client Account'}
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="mt-6 pt-5 border-t border-[#334155]/40 text-center text-xs text-white/60 flex flex-col gap-2">
          <span>New client requesting a project build proposal?</span>
          <Link href="/quotes" className="text-[#7dd3fc] font-bold hover:underline">
            Request an Engineering Build Quote →
          </Link>
        </div>

      </div>
    </div>
  );
}
