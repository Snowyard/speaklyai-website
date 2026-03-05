'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      // TODO: Supabase auth signup
      console.log('Signup submitted:', formData);
      // Redirect to setup wizard after signup
      window.location.href = '/setup';
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C3AED] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-2xl font-extrabold text-white">SpeaklyAI</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400">Get your AI voice agent live in minutes</p>
        </div>

        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@business.com"
                  required
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Your Business Name"
                  required
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6C3AED] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6C3AED] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6C3AED] to-[#8B5CF6] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Get Started'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#8B5CF6] hover:text-[#6C3AED] font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
