'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

      const role = json.data.user.role;
      if (role === 'ADMIN' || role === 'PROJECT_MANAGER') {
        router.push('/dashboard');
      } else {
        // Find assigned projects or fallback
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F17] px-6 text-[#F8FAFC]">
      <div className="w-full max-w-md rounded-2xl border border-[#334155]/60 bg-[#1E293B]/50 p-8 backdrop-blur shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#F8FAFC] hover:opacity-90">
            ATLAS<span className="text-[#F59E0B]">BUILD</span>
          </Link>
          <h2 className="text-lg font-semibold mt-4 text-[#94A3B8]">Secure Member Verification</h2>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-950/45 border border-red-500/30 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. Elena.rostova@atlasbuild.com"
              className="w-full h-11 rounded-lg border border-[#334155] bg-[#0B0F17]/50 px-4 text-sm placeholder-[#94A3B8]/40 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
              Security Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-11 rounded-lg border border-[#334155] bg-[#0B0F17]/50 px-4 text-sm placeholder-[#94A3B8]/40 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full h-11 items-center justify-center rounded-lg bg-[#F59E0B] text-sm font-bold text-black hover:bg-[#D97706] disabled:bg-opacity-50 transition-colors shadow-lg"
          >
            {loading ? 'Authenticating...' : 'Authenticate Securely'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#334155]/40 text-center text-xs text-[#94A3B8]">
          <span>Need an invite token link? Contact your administrator.</span>
        </div>
      </div>
    </div>
  );
}
