'use client';

import Image from 'next/image';
import { Heart, Sparkles, Globe, Users, Target, CheckCircle2 } from 'lucide-react';

export default function AboutHosts() {
  return (
    <section id="hosts" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card with Hosts Photo */}
          <div className="lg:col-span-5 relative">
            {/* Background decorative blob */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-200 via-pink-100 to-teal-100 rounded-3xl blur-2xl opacity-60 -z-10" />

            <div className="rounded-3xl bg-white border border-rose-100 p-6 shadow-xl relative overflow-hidden">
              {/* Host Photo Banner (using the December poster host crop/photo) */}
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-inner mb-6 bg-rose-950">
                <Image
                  src="/hosts/nene-and-helen.jpg"
                  alt="Nene and Helen - TalkABA Hosts"
                  fill
                  className="object-cover object-top scale-125 translate-y-4"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Sparkles size={12} />
                    Meet Your Hosts
                  </div>
                  <h3 className="text-xl font-black text-white">Nene &amp; Helen</h3>
                  <p className="text-xs text-rose-200 font-medium">Founders &amp; Conveners, TalkABA</p>
                </div>
              </div>

              {/* Four Pillars from Hosts */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                {[
                  { label: 'LEARN', color: 'bg-rose-50 text-rose-900 border-rose-200' },
                  { label: 'CONNECT', color: 'bg-teal-50 text-teal-900 border-teal-200' },
                  { label: 'GROW', color: 'bg-amber-50 text-amber-900 border-amber-200' },
                  { label: 'MAKE AN IMPACT', color: 'bg-purple-50 text-purple-900 border-purple-200' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`py-2 px-3 rounded-xl border font-bold text-[11px] uppercase tracking-wider ${item.color}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mission Story */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Heart size={14} className="text-rose-600" />
              The TalkABA Story &amp; Purpose
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Empowering ABA Professionals, Families &amp; Communities Worldwide
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              <strong>TalkABA with Nene and Helen</strong> was born out of a shared passion: to democratize
              world-class Applied Behavior Analysis knowledge and bring accredited Continuing Education Unit
              (CEU) opportunities to Nigeria, across Africa, and to practitioners worldwide.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Every month, Nene and Helen curate interactive masterclasses featuring celebrated BCBA-Ds,
              accreditation founders, and clinical innovators. We bridge theoretical research with hands-on,
              compassionate practice—equipping practitioners, therapists, educators, and parents with the
              tools to transform lives.
            </p>

            {/* Core commitments */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: '100% Free Participation',
                  desc: 'Cost should never be a barrier to clinical excellence and compassionate learning.',
                },
                {
                  title: 'Affordable CEU Certification',
                  desc: 'Official recognized certification priced at just ₦3,500 in Nigeria and $5 internationally.',
                },
                {
                  title: 'Global Ethical Standards',
                  desc: 'Grounded in IBAO and international best practices for supervision and client dignity.',
                },
                {
                  title: 'Inclusive Community',
                  desc: 'A warm, welcoming space for practitioners, caregivers, and allied health therapists.',
                },
              ].map((c, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">{c.title}</h4>
                    <p className="text-xs text-slate-500 leading-normal">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-rose-50 border border-slate-200/80">
              <p className="italic text-xs sm:text-sm text-slate-700 font-medium">
                &ldquo;Stay tuned for more exciting learning with Nene and Helen! Bringing Applied Behavior
                Analysis to the World.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
