'use client';

import { Award, CheckCircle2, Calendar, Clock, Video, ExternalLink, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface Props {
  onOpenPosterModal?: (posterUrl: string, title: string) => void;
}

export default function FeaturedPresenter({ onOpenPosterModal }: Props) {
  return (
    <section id="featured" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Award size={14} className="text-teal-600" />
            Distinguished Faculty &amp; Speakers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            World-Class Expertise in Applied Behavior Analysis
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every month, TalkABA brings you internationally accredited pioneers, founders of credentialing
            bodies, and seasoned BCBA-D scholars who are shaping the future of global behavior science.
          </p>
        </div>

        {/* Presenters Grid: November & December */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Speaker 1: Dr. Michael Mueller (November) */}
          <div className="rounded-3xl border border-teal-100 bg-gradient-to-b from-teal-50/60 to-white p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  November Featured Presentation
                </span>
                <span className="text-xs font-semibold text-teal-700">Episode 1</span>
              </div>

              {/* Title & Name */}
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-snug">
                IBAO Global Leadership in Ethics and Supervision
              </h3>
              <p className="text-lg font-bold text-teal-800 mb-1">
                Dr Michael Mueller, <span className="text-slate-700">Ph.D, BCBA-D, IBA</span>
              </p>
              <p className="text-sm font-semibold text-slate-500 mb-5 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-teal-600" />
                Founder, International Behavior Analysis Organization (IBAO)
              </p>

              {/* Speaker Bio */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Dr. Michael Mueller is an internationally acclaimed behavior analyst and the visionary Founder
                of the International Behavior Analysis Organization (IBAO). In this masterclass, Dr. Mueller
                shares high-level ethical frameworks, the principles of competent behavioral supervision, and
                practical strategies to ensure compliance and clinical excellence across borders.
              </p>

              {/* Key Highlights */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Session Pillars:</div>
                {[
                  'Global Ethics Standards & IBAO Compliance',
                  'Effective Supervision for BCBAs, IBAs & RBTs',
                  'Cross-Cultural Application in ABA Clinical Practice',
                  'Live Q&A with Dr. Mueller',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={15} className="text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Details & CTAs */}
            <div className="pt-6 border-t border-teal-100">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 mb-5">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-teal-600" />
                  <span className="font-semibold text-slate-900">Wed, 11 Nov 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-teal-600" />
                  <span className="font-semibold text-slate-900">7:00 PM WAT</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Video size={14} className="text-teal-600" />
                  <span className="font-semibold text-slate-900">Via Zoom</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://tinyurl.com/talkABAregForm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md transition-all"
                >
                  Register Free
                </a>
                <button
                  onClick={() =>
                    onOpenPosterModal?.(
                      '/posters/november-2026.jpg',
                      'November 2026 CEU Poster: Dr Michael Mueller'
                    )
                  }
                  className="py-3 px-4 rounded-xl border border-teal-300 bg-white hover:bg-teal-50 text-teal-800 font-semibold text-xs text-center transition-colors"
                >
                  View Official Flyer
                </button>
              </div>
            </div>
          </div>

          {/* Speaker 2: Dr. Edward Usifo Asikhia (December) */}
          <div className="rounded-3xl border border-cyan-200 bg-gradient-to-b from-cyan-50/50 via-white to-amber-50/30 p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-teal-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    December 12, 2026
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                    ★ 2 CEU Units
                  </span>
                </div>
                <span className="text-xs font-bold text-teal-800">Episode 2</span>
              </div>

              {/* Title & Name */}
              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-snug">
                Dr. Ed.&apos;s Model for Behavior Analysis and Intervention: <span className="text-teal-800">The Loci of Ethics in Action.</span>
              </h3>
              <p className="text-lg font-bold text-teal-900 mb-1">
                Dr Edward Usifo Asikhia, <span className="text-slate-700">BCBA-D</span>
              </p>
              <p className="text-sm font-semibold text-slate-500 mb-5 flex items-center gap-1.5">
                <Award size={16} className="text-amber-600" />
                Doctoral-level Board Certified Behavior Analyst
              </p>

              {/* Speaker Bio */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Join us for an insightful session with <strong>Dr. Edward Usifo Asikhia (BCBA-D)</strong> as he explores the practical and ethical dimensions of behavior analysis and intervention through his proprietary clinical model. Designed for ABA Professionals, Parents, Caregivers and All Interested Stakeholders.
              </p>

              {/* Badges from Poster */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  { title: "Dr. Ed.'s Model", desc: 'Behavior Analysis & Intervention' },
                  { title: 'The Loci of Ethics', desc: 'Ethics in Action framework' },
                  { title: 'Practical Dimensions', desc: 'Real-world clinical tools' },
                  { title: '2 CEU Units Available', desc: 'Official certificates awarded' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-teal-100 shadow-xs flex flex-col"
                  >
                    <span className="text-xs font-bold text-teal-900">{item.title}</span>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Details & CTAs */}
            <div className="pt-6 border-t border-teal-100">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-teal-700" />
                  <span className="font-semibold text-slate-900">December 12, 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-teal-700" />
                  <span className="font-semibold text-slate-900">7:00 PM WAT</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Video size={14} className="text-teal-700" />
                  <span className="font-semibold text-slate-900">Zoom (2 CEU Units)</span>
                </div>
              </div>

              {/* Enquiries email */}
              <div className="mb-4 text-xs flex items-center justify-between bg-teal-50/80 p-2.5 rounded-xl border border-teal-100">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Mail size={13} className="text-teal-700" /> Enquiries:
                </span>
                <a href="mailto:neneandhelen@talkABA.com.ng" className="font-bold text-teal-800 hover:underline">
                  neneandhelen@talkABA.com.ng
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://tinyurl.com/talkABAregForm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md transition-all"
                >
                  Register Free (Compulsory)
                </a>
                <button
                  onClick={() =>
                    onOpenPosterModal?.(
                      '/posters/december-2026.jpg',
                      "December 12, 2026 CEU Poster: Dr. Edward Usifo Asikhia"
                    )
                  }
                  className="py-3 px-4 rounded-xl border border-teal-300 bg-white hover:bg-teal-50 text-teal-900 font-semibold text-xs text-center transition-colors"
                >
                  View Official Flyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
