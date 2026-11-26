'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Award,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { CEUEvent } from '@/lib/types';
import { fallbackEvents, getActiveUpcomingEvent, parseEventDate } from '@/lib/events';

interface HeroProps {
  onOpenPosterModal?: (posterUrl: string, title: string) => void;
  event?: CEUEvent;
}

export default function HeroSection({ onOpenPosterModal, event }: HeroProps) {
  const [activeEvent, setActiveEvent] = useState<CEUEvent>(
    event || getActiveUpcomingEvent(fallbackEvents)
  );
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch updated events dynamically from API on mount
  useEffect(() => {
    async function refreshActiveEvent() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.events) && data.events.length > 0) {
            const currentUpcoming = getActiveUpcomingEvent(data.events);
            setActiveEvent(currentUpcoming);
          }
        }
      } catch (err) {
        // use initial fallback
      }
    }
    refreshActiveEvent();
  }, []);

  // Update if parent passes a new event prop
  useEffect(() => {
    if (event) {
      setActiveEvent(event);
    }
  }, [event]);

  // Live dynamic countdown targeting the active upcoming event's date
  useEffect(() => {
    const targetDate = parseEventDate(activeEvent).getTime();

    const calculateCountdown = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeEvent]);

  const passcode = activeEvent.zoomPasscode || 'TalkABA';
  const copyPasscode = () => {
    navigator.clipboard.writeText(passcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const posterPath = activeEvent.poster || '/posters/november-2026.jpg';
  const isPast = activeEvent.status === 'past';
  const isLive = activeEvent.status === 'live';

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 overflow-hidden hero-gradient text-white flex items-center"
    >
      {/* Background radial blurs & decor */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-teal-200">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-ping'
              }`}
            />
            <span>
              {isLive
                ? '🔴 LIVE NOW — CONTINUING EDUCATION UNIT (CEU)'
                : 'CONTINUING EDUCATION UNIT (CEU) EVENT'}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-300/30 text-xs font-semibold text-cyan-100">
            <Sparkles size={13} className="text-cyan-300" />
            <span>Monthly ABA Learning Series • Ep. {activeEvent.episode}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Key Details */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <p className="text-teal-300 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-3">
              TalkABA with Nene and Helen
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5">
              Bringing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-100 to-white">
                Applied Behavior Analysis
              </span>{' '}
              to the World
            </h1>

            <p className="text-teal-100/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              A premier monthly CEU masterclass series connecting African and global practitioners,
              educators, and families with world-renowned leaders in behavioral science.
            </p>

            {/* Live Countdown Box (Targets Next Upcoming Session) */}
            <div className="mb-8 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xl mx-auto lg:mx-0 shadow-lg">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold uppercase tracking-wider text-teal-200">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-cyan-300" />
                  {isPast ? 'Session Completed' : 'Countdown to Next Session'}
                </span>
                <span className="text-teal-300 font-medium truncate max-w-[240px]">
                  {activeEvent.date} • {activeEvent.time}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                {[
                  { label: 'Days', val: pad(timeLeft.days) },
                  { label: 'Hours', val: pad(timeLeft.hours) },
                  { label: 'Minutes', val: pad(timeLeft.minutes) },
                  { label: 'Seconds', val: pad(timeLeft.seconds) },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-black/20 rounded-xl py-2.5 px-2 border border-white/10"
                  >
                    <span className="block text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {item.val}
                    </span>
                    <span className="block text-[10px] sm:text-xs uppercase font-medium text-teal-200 tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              <a
                href={activeEvent.registrationLink || 'https://tinyurl.com/talkABAregForm'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-teal-900 font-extrabold text-sm uppercase tracking-wider shadow-xl hover:bg-teal-50 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Register Free (Compulsory)</span>
                <ExternalLink size={16} />
              </a>

              <a
                href={activeEvent.zoomLink || 'https://tinyurl.com/JoinCEUEvent'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-teal-800/80 hover:bg-teal-800 border border-teal-300/40 text-white font-bold text-sm tracking-wide shadow-md transition-all hover:scale-[1.02]"
              >
                <Video size={17} className="text-cyan-300" />
                <span>Join Live Zoom</span>
              </a>

              <button
                onClick={() =>
                  onOpenPosterModal?.(
                    posterPath,
                    `${activeEvent.month} ${activeEvent.year} CEU Poster: ${activeEvent.presenter.name}`
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm transition-all"
              >
                <Eye size={16} className="text-teal-200" />
                <span>View Poster</span>
              </button>
            </div>

            {/* Quick Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 pt-2 border-t border-white/10 text-xs">
              {[
                { title: 'LEARN', desc: 'Expert ABA Insights' },
                { title: 'CONNECT', desc: 'Global Community' },
                { title: 'GROW', desc: 'Professional Mastery' },
                { title: 'ADVANCE', desc: 'Accredited CEUs' },
              ].map((pill, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-extrabold text-teal-300 tracking-wider">{pill.title}</div>
                  <div className="text-[11px] text-teal-100/75">{pill.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Featured Presentation Card with Poster preview */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700" />

              <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/20 p-6 shadow-2xl text-white">
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-[11px] font-bold uppercase tracking-wider border border-teal-400/30">
                      {activeEvent.month} Featured Event
                    </span>
                  </div>
                  <span className="text-xs text-teal-200 font-medium">Episode {activeEvent.episode}</span>
                </div>

                {/* Poster Thumbnail + Topic */}
                <div className="flex flex-col sm:flex-row gap-4 mb-5">
                  <div
                    onClick={() =>
                      onOpenPosterModal?.(
                        posterPath,
                        `${activeEvent.month} ${activeEvent.year} Official CEU Poster`
                      )
                    }
                    className="relative w-full sm:w-36 h-48 sm:h-44 rounded-xl overflow-hidden cursor-pointer shrink-0 border border-white/20 group/poster shadow-md"
                  >
                    <Image
                      src={posterPath}
                      alt={`${activeEvent.month} CEU Poster`}
                      fill
                      className="object-cover group-hover/poster:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 150px"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/poster:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-90">
                        <Eye size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-teal-300 font-bold mb-1">
                        Featured Presentation
                      </p>
                      <h3 className="text-lg font-bold text-white leading-snug mb-2 line-clamp-2">
                        {activeEvent.title}
                      </h3>
                      <p className="text-xs text-teal-100 font-semibold">
                        {activeEvent.presenter.name}
                        {activeEvent.presenter.credentials && `, ${activeEvent.presenter.credentials}`}
                      </p>
                      {activeEvent.presenter.title && (
                        <p className="text-[11px] text-teal-300/80 line-clamp-1">
                          {activeEvent.presenter.title}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-cyan-300" />
                        <span>{activeEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-cyan-300" />
                        <span>{activeEvent.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zoom Box */}
                <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-500/30 mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-teal-200 flex items-center gap-1.5">
                      <Video size={13} className="text-cyan-400" />
                      Zoom Access Link
                    </span>
                    <button
                      onClick={copyPasscode}
                      className="inline-flex items-center gap-1 text-[11px] text-teal-300 hover:text-white transition-colors"
                      title="Copy Passcode"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>
                            Passcode: <strong className="text-white">{passcode}</strong>
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={activeEvent.zoomLink || 'https://tinyurl.com/JoinCEUEvent'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 break-all"
                  >
                    <span>{activeEvent.zoomLink || 'https://tinyurl.com/JoinCEUEvent'}</span>
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                </div>

                {/* Certification & Participation Tag */}
                <div className="flex items-center justify-between text-xs py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <div>
                    <span className="block text-[10px] uppercase text-emerald-400 font-bold tracking-wider">
                      Participation
                    </span>
                    <span className="font-black text-white text-sm">100% FREE</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-amber-300 font-bold tracking-wider">
                      Certification (Paid)
                    </span>
                    <span className="font-semibold text-slate-200 text-xs">
                      {activeEvent.certification.nigeriaPrice} • {activeEvent.certification.internationalPrice}
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <a
                  href={activeEvent.registrationLink || 'https://tinyurl.com/talkABAregForm'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  <span>Complete Free Registration</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
