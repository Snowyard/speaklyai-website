'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

// Create Auth Context
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthGuard');
  }
  return context;
};

export default function AuthGuard({ children }) {
  const router = useRouter();
  const supabase = createClient();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth error:', error);
          setLoading(false);
          return;
        }

        if (session) {
          setSession(session);
          setUser(session.user);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          // Redirect to login if not authenticated
          router.push('/login');
        }
      } catch (err) {
        console.error('Failed to check authentication:', err);
        setAuthenticated(false);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        setAuthenticated(true);
      } else {
        setSession(null);
        setUser(null);
        setAuthenticated(false);
        router.push('/login');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase]);

  // Loading state with spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-primary animate-spin" />
          </div>
          <p className="text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect happens in useEffect, but don't render children if not authenticated
  if (!authenticated) {
    return null;
  }

  // Render children with auth context
  return (
    <AuthContext.Provider value={{ session, user, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
