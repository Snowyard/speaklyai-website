'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-dark overflow-hidden flex items-center justify-center">
      {/* Subtle grid background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-dark-mid rounded-xl border border-slate-700 p-8 shadow-2xl">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              SpeaklyAI
            </h1>
            <p className="text-slate-400 text-sm mt-2">Welcome back</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 bg-dark border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-dark border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center">
            <div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary-light transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-primary-light transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
