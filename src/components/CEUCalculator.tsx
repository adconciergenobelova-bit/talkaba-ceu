'use client';

import { useState } from 'react';
import { Award, Check, DollarSign, ExternalLink, HelpCircle, Info } from 'lucide-react';

export default function CEUCalculator() {
  const [residence, setResidence] = useState<'nigeria' | 'international'>('nigeria');
  const [units, setUnits] = useState<number>(1);

  const unitPrice = residence === 'nigeria' ? 3500 : 5;
  const currencySymbol = residence === 'nigeria' ? '₦' : '$';
  const total = (units * unitPrice).toLocaleString();

  return (
    <section id="ceu-pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award size={14} className="text-amber-600" />
            Transparent Certification Fees
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            CEU Units &amp; Pricing Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Attendance and live participation are 100% free for everyone. If you require an official verified
            Continuing Education Unit certificate for BACB / IBAO compliance, calculate your unit cost below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Interactive Calculator */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>Calculate Your CEU Fee</span>
            </h3>

            {/* Residency selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Where are you resident?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setResidence('nigeria')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    residence === 'nigeria'
                      ? 'bg-teal-900 text-white border-teal-900 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">🇳🇬 Resident in Nigeria</span>
                    {residence === 'nigeria' && <Check size={16} className="text-teal-300" />}
                  </div>
                  <span className={`text-xs ${residence === 'nigeria' ? 'text-teal-200' : 'text-slate-500'}`}>
                    ₦3,500 per unit
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setResidence('international')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    residence === 'international'
                      ? 'bg-teal-900 text-white border-teal-900 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">🌍 Resident Outside Nigeria</span>
                    {residence === 'international' && <Check size={16} className="text-teal-300" />}
                  </div>
                  <span
                    className={`text-xs ${
                      residence === 'international' ? 'text-teal-200' : 'text-slate-500'
                    }`}
                  >
                    $5 per unit
                  </span>
                </button>
              </div>
            </div>

            {/* Unit count */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Number of CEU Units Required
                </label>
                <span className="text-sm font-extrabold text-teal-800">{units} {units === 1 ? 'Unit' : 'Units'}</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setUnits(num)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                      units === num
                        ? 'bg-teal-700 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Result Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-cyan-900 text-white shadow-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-teal-200 font-semibold block mb-1">
                    Total Certification Investment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {currencySymbol}{total}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                    Live Session: FREE
                  </span>
                  <p className="text-[11px] text-teal-200/80 mt-1">
                    {units} unit{units > 1 ? 's' : ''} @ {currencySymbol}{unitPrice.toLocaleString()}/ea
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://tinyurl.com/talkABAregForm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>Lock in Your CEU on Registration Form</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Right Column: Free vs Paid Breakdown & Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info size={18} className="text-teal-600" />
                Participation vs Certification
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={16} className="text-emerald-700" />
                    <span className="font-bold text-sm text-emerald-900">Attendance is 100% FREE</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Anyone can attend our live Zoom masterclasses at zero charge. Registration is compulsory
                    so we can provide Zoom credentials and access materials.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={16} className="text-amber-700" />
                    <span className="font-bold text-sm text-amber-900">Certification is Paid</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    If you are a certified BCBA, BCaBA, IBA, or allied professional needing verifiable CEU
                    units, a small administrative processing fee applies.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <HelpCircle size={18} className="text-teal-600" />
                How to Complete Payment
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Payment details (local Nigerian bank transfer accounts and international payment options) are
                explicitly provided inside the official registration form.
              </p>
              <div className="text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 break-all">
                Link: https://tinyurl.com/talkABAregForm
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
