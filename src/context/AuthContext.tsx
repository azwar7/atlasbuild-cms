'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PROJECT_MANAGER' | 'CLIENT' | string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  getDashboardUrl: (user?: AuthUser | null) => string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  checkAuth: async () => {},
  logout: async () => {},
  getDashboardUrl: () => '/dashboard',
});

export const getDashboardUrlByRole = (user?: AuthUser | null): string => {
  if (!user) return '/login';
  const role = user.role?.toUpperCase();
  if (role === 'ADMIN' || role === 'PROJECT_MANAGER' || role === 'SUPER_ADMIN') {
    return '/dashboard';
  }
  if (role === 'CLIENT') {
    return '/portal/proj-1';
  }
  // Contractor, Worker, or default roles
  return '/dashboard';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.authenticated && json.data?.user) {
          setUser(json.data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            if (json.data?.authenticated && json.data?.user) {
              setUser(json.data.user);
            } else {
              setUser(null);
            }
          }
        } else if (isMounted) {
          setUser(null);
        }
      } catch (e) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    // Listen to custom auth events for instant cross-component synchronization
    const handleAuthChange = () => {
      initAuth();
    };

    window.addEventListener('atlasbuild_auth_changed', handleAuthChange);
    return () => {
      isMounted = false;
      window.removeEventListener('atlasbuild_auth_changed', handleAuthChange);
    };
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore errors on logout
    } finally {
      setUser(null);
      window.dispatchEvent(new Event('atlasbuild_auth_changed'));
      router.push('/');
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout,
        getDashboardUrl: (u) => getDashboardUrlByRole(u || user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
