'use client';

import { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Users,
  Video,
  FileCheck,
  Sparkles,
  ArrowRight,
  Send,
} from 'lucide-react';

export default function RegisterSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'ABA Professional / Therapist',
    residence: 'Nigeria',
    wantsCEU: 'yes',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-teal-600" />
            Participation is 100% Free
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Register for the Next CEU Episode
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Participation is free, but registration is compulsory to receive session access materials and Zoom
            room credentials. Reserve your seat below!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Quick Form or Direct TinyURL */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h3 className="text-xl font-black text-slate-900">Reserve Your Spot</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your basic details or jump directly to the official Google Form.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Primary Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm bg-white"
                    >
                      <option>ABA Professional / BCBA / IBA</option>
                      <option>Behavior Technician / RBT</option>
                      <option>Educator / Special Ed Teacher</option>
                      <option>Parent / Family Caregiver</option>
                      <option>Psychologist / Speech / OT</option>
                      <option>Student / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Residence
                    </label>
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm bg-white"
                    >
                      <option>Nigeria (Resident)</option>
                      <option>Outside Nigeria (International)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Will you require an official CEU Certificate?
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        formData.wantsCEU === 'yes'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ceu"
                        checked={formData.wantsCEU === 'yes'}
                        onChange={() => setFormData({ ...formData, wantsCEU: 'yes' })}
                        className="text-teal-600"
                      />
                      <span>Yes (₦3,500 / $5)</span>
                    </label>
                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                        formData.wantsCEU === 'no'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ceu"
                        checked={formData.wantsCEU === 'no'}
                        onChange={() => setFormData({ ...formData, wantsCEU: 'no' })}
                        className="text-teal-600"
                      />
                      <span>No (Free Attendance Only)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-4 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Proceed &amp; Open Official Registration</span>
                  </button>
                  <a
                    href="https://tinyurl.com/talkABAregForm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Direct Link</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Thank You, {formData.fullName}!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your seat interest has been logged. To complete official certification credentialing and
                  access Zoom security verification, please complete the final step on the official form:
                </p>
                <div className="pt-4">
                  <a
                    href="https://tinyurl.com/talkABAregForm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xl transition-all"
                  >
                    <span>Complete on Official Form (tinyurl.com/talkABAregForm)</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="block mx-auto text-xs text-slate-400 hover:text-slate-600 pt-3"
                >
                  ← Register another attendee
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Who Should Attend & Session Logistics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Who Should Attend */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Users size={18} className="text-teal-600" />
                Who Should Attend?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                As stated on our official monthly posters:
              </p>
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-teal-950 font-medium leading-relaxed">
                &ldquo;ABA professionals, paraprofessionals, parents, caregivers and all players involved in
                behaviour analysis.&rdquo;
              </div>
            </div>

            {/* Quick Session Logistics */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Video size={18} className="text-teal-600" />
                Live Zoom Logistics
              </h4>

              <div className="text-xs space-y-2.5 text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Platform:</span>
                  <span className="font-bold text-slate-900">Zoom Webinar</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Zoom Link:</span>
                  <a
                    href="https://tinyurl.com/JoinCEUEvent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-700 hover:underline flex items-center gap-1"
                  >
                    tinyurl.com/JoinCEUEvent <ExternalLink size={11} />
                  </a>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Passcode:</span>
                  <span className="font-bold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    TalkABA
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-semibold text-slate-500">Timezone:</span>
                  <span className="font-bold text-slate-900">7:00 PM Nigerian Time (WAT)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
