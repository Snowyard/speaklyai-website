'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#6C3AED] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white font-bold text-base">
            S
          </div>
          <span className="text-xl font-extrabold text-white">SpeaklyAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#use-cases" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Pricing
          </a>
          <Link
            href="/signup"
            className="bg-[#6C3AED] hover:bg-[#8B5CF6] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4">
          <a href="#features" className="block text-sm text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" className="block text-sm text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
          <a href="#use-cases" className="block text-sm text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            Use Cases
          </a>
          <a href="#pricing" className="block text-sm text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            Pricing
          </a>
          <Link
            href="/signup"
            className="block bg-[#6C3AED] text-white px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
