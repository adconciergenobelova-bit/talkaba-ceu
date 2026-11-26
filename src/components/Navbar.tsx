'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#featured', label: 'Featured Event' },
    { href: '#schedule', label: 'Monthly Schedule' },
    { href: '#hosts', label: 'Hosts & Mission' },
    { href: '#posters', label: 'Posters' },
    { href: '#ceu-pricing', label: 'CEU Fees' },
    { href: '#register', label: 'Register' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-md py-2.5' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                scrolled
                  ? 'bg-gradient-to-br from-teal-700 to-cyan-600 text-white shadow-teal-900/10'
                  : 'bg-white/15 backdrop-blur-md border border-white/30 text-white'
              }`}
            >
              {/* Custom TalkABA speech-bubble / brain glyph */}
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-none stroke-current stroke-2">
                <rect x="5" y="6" width="30" height="22" rx="6" />
                <path d="M12 28 L10 34 L18 28 Z" fill="currentColor" />
                <circle cx="15" cy="17" r="2" fill="currentColor" />
                <circle cx="20" cy="17" r="2" fill="currentColor" />
                <circle cx="25" cy="17" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-extrabold tracking-tight text-lg transition-colors ${
                    scrolled ? 'text-teal-900' : 'text-white'
                  }`}
                >
                  TALKABA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  CEU
                </span>
              </div>
              <span
                className={`block text-xs font-medium tracking-wide transition-colors ${
                  scrolled ? 'text-teal-700' : 'text-teal-100'
                }`}
              >
                with Nene and Helen
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  scrolled
                    ? 'text-slate-700 hover:text-teal-800 hover:bg-teal-50'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
                scrolled
                  ? 'text-slate-600 hover:text-teal-800 hover:bg-slate-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="Admin: Upload monthly posters & manage events"
            >
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Admin / Upload</span>
            </Link>

            <a
              href="https://tinyurl.com/talkABAregForm"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md ${
                scrolled
                  ? 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white hover:from-teal-800 hover:to-cyan-700 hover:shadow-teal-900/20'
                  : 'bg-white text-teal-800 hover:bg-teal-50 hover:shadow-lg'
              }`}
            >
              <Sparkles size={14} />
              Register Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin"
              className={`p-2 rounded-xl text-xs font-medium ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/15'
              }`}
              title="Admin"
            >
              <ShieldCheck size={18} />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/15'
              }`}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden glass-nav border-t border-slate-100 px-4 pt-3 pb-6 mt-2 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-2">
              <a
                href="https://tinyurl.com/talkABAregForm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-600 text-white font-bold text-sm shadow-md"
              >
                Register Free (Compulsory)
              </a>
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={14} />
                Admin: Upload Monthly Posters &amp; Events
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
