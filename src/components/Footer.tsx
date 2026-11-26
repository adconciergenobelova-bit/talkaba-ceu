'use client';

import Link from 'next/link';
import { ShieldCheck, Video, ExternalLink, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md">
                <svg viewBox="0 0 40 40" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <rect x="5" y="6" width="30" height="22" rx="6" />
                  <path d="M12 28 L10 34 L18 28 Z" fill="currentColor" />
                  <circle cx="15" cy="17" r="2" fill="currentColor" />
                  <circle cx="20" cy="17" r="2" fill="currentColor" />
                  <circle cx="25" cy="17" r="2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  TALKABA WITH NENE AND HELEN
                </span>
                <span className="text-[11px] text-teal-400 font-medium">
                  Bringing Applied Behavior Analysis to the World
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              A monthly Continuing Education Unit (CEU) learning series empowering behavior analysts,
              educators, caregivers, and allied health professionals with ethical, evidence-based practices.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-teal-300">
              <span>LEARN</span>
              <span>•</span>
              <span>CONNECT</span>
              <span>•</span>
              <span>ADVANCE</span>
              <span>•</span>
              <span>GROW TOGETHER</span>
            </div>

            <div className="pt-2">
              <a
                href="mailto:neneandhelen@talkABA.com.ng"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-teal-400" />
                <span>neneandhelen@talkABA.com.ng</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Featured Event', href: '#featured' },
                { label: 'Monthly Schedule', href: '#schedule' },
                { label: 'Hosts & Mission', href: '#hosts' },
                { label: 'Official Flyers', href: '#posters' },
                { label: 'CEU Fees & Calc', href: '#ceu-pricing' },
                { label: 'Register Free', href: '#register' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Access */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Live Session Access</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
                  Zoom Link
                </span>
                <a
                  href="https://tinyurl.com/JoinCEUEvent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white flex items-center gap-1 font-mono break-all"
                >
                  tinyurl.com/JoinCEUEvent <ExternalLink size={11} />
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
                  Passcode
                </span>
                <span className="text-white font-mono font-bold bg-slate-800 px-2 py-0.5 rounded">
                  TalkABA
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Registration
                </span>
                <a
                  href="https://tinyurl.com/talkABAregForm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-white flex items-center gap-1 font-mono break-all"
                >
                  tinyurl.com/talkABAregForm <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Organizer / Admin Hub */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Organizer Portal</h4>
            <p className="text-slate-400 leading-relaxed mb-4">
              Monthly posters and schedules are published each month by the conveners.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-900/60 border border-slate-700 hover:border-teal-500/50 text-slate-200 hover:text-white font-semibold transition-all shadow-sm"
            >
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Admin / Poster Upload</span>
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-10 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 TalkABA with Nene and Helen. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed for ABA Community with</span>
            <Heart size={12} className="text-rose-500 fill-current" />
            <span>in Nigeria &amp; Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
