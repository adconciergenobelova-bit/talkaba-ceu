'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Award,
  Users,
  ExternalLink,
  Eye,
  CheckCircle,
  CalendarPlus,
  Lock,
  ChevronRight,
} from 'lucide-react';
import type { CEUEvent } from '@/lib/types';
import { fallbackEvents } from '@/lib/events';

interface Props {
  onOpenPosterModal?: (posterUrl: string, title: string) => void;
}

export default function ScheduleSection({ onOpenPosterModal }: Props) {
  const [eventsList, setEventsList] = useState<CEUEvent[]>(fallbackEvents);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [loading, setLoading] = useState(false);

  // Fetch updated events dynamically from API
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`/api/events?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.events) && data.events.length > 0) {
            setEventsList(data.events);
          }
        }
      } catch (err) {
        console.log('Using fallback static events');
      }
    }
    loadEvents();
  }, []);

  const filtered = eventsList.filter((event) => {
    if (filter === 'upcoming') return event.status === 'upcoming';
    if (filter === 'past') return event.status === 'past';
    return true;
  });

  // Helper to generate Google Calendar link
  const createGoogleCalendarLink = (event: CEUEvent) => {
    const title = encodeURIComponent(`TalkABA CEU: ${event.title}`);
    const details = encodeURIComponent(
      `TalkABA with Nene and Helen\nPresenter: ${event.presenter.name} (${event.presenter.credentials})\nPlatform: ${event.platform}\nZoom: ${event.zoomLink || 'https://tinyurl.com/JoinCEUEvent'}\nPasscode: ${event.zoomPasscode || 'TalkABA'}\nRegistration: ${event.registrationLink || 'https://tinyurl.com/talkABAregForm'}`
    );
    const location = encodeURIComponent('Zoom (Online)');
    
    // Default to Nov 11, 2026 19:00 WAT (18:00 UTC)
    let dates = '20261111T180000Z/20261111T200000Z';
    if (event.id.includes('dec')) {
      dates = '20261216T180000Z/20261216T200000Z';
    }

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <section id="schedule" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <CalendarIcon size={14} className="text-teal-700" />
              Monthly CEU Roadmap
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Monthly Schedule &amp; Episodes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Posters and syllabus are uploaded each month. Browse ongoing masterclasses, explore past
              archives, or subscribe for calendar alerts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs self-start md:self-auto">
            {[
              { id: 'all', label: 'All Episodes' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past (Completed)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-6">
          {filtered.map((event) => {
            const isNov = event.id.includes('nov');
            const isDec = event.id.includes('dec');
            const isPast = event.status === 'past';

            return (
              <div
                key={event.id}
                className={`rounded-3xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  isPast
                    ? 'border-slate-200 opacity-90'
                    : isNov
                    ? 'border-teal-200 ring-1 ring-teal-500/10'
                    : 'border-rose-200 ring-1 ring-rose-500/10'
                }`}
              >
                <div className="p-6 sm:p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Date & Episode Badge */}
                    <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6 gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          {isPast ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Lock size={11} /> Completed
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Active / Upcoming
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-400">Ep. {event.episode}</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">
                          {event.month} {event.year}
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-teal-600" />
                          <span>{event.time} WAT</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Video size={13} className="text-teal-600" />
                          <span>{event.platform}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Content & Presenter */}
                    <div className="lg:col-span-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold mb-3">
                        <span className="text-teal-800 font-bold">{event.presenter.name}</span>
                        {event.presenter.credentials && (
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {event.presenter.credentials}
                          </span>
                        )}
                        {event.presenter.title && (
                          <span className="text-xs text-slate-500 hidden sm:inline">
                            • {event.presenter.title}
                          </span>
                        )}
                      </div>

                      {event.presenter.bio && (
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {event.presenter.bio}
                        </p>
                      )}

                      {/* Highlights */}
                      {event.highlights && (
                        <div className="flex flex-wrap gap-1.5">
                          {event.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Actions & Fees */}
                    <div className="lg:col-span-3 flex flex-col justify-between items-stretch lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {/* Price Tag */}
                      <div className="text-left lg:text-right bg-slate-50 rounded-xl p-3 border border-slate-100 w-full">
                        <div className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
                          Participation: FREE
                        </div>
                        <div className="text-xs font-semibold text-slate-700 mt-0.5">
                          CEU Cert: <span className="font-bold text-slate-900">{event.certification.nigeriaPrice}</span>{' '}
                          / <span className="font-bold text-slate-900">{event.certification.internationalPrice}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
                        {!isPast ? (
                          <a
                            href={event.registrationLink || 'https://tinyurl.com/talkABAregForm'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Register Free</span>
                            <ExternalLink size={13} />
                          </a>
                        ) : (
                          <div className="text-center py-2 px-3 rounded-xl bg-slate-100 text-slate-500 text-xs font-medium">
                            Session Completed
                          </div>
                        )}

                        <div className="flex gap-2 w-full">
                          {event.poster && (
                            <button
                              onClick={() =>
                                onOpenPosterModal?.(
                                  event.poster!,
                                  `${event.month} ${event.year} Official CEU Flyer`
                                )
                              }
                              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <Eye size={13} className="text-teal-600" />
                              <span>Flyer</span>
                            </button>
                          )}

                          {!isPast && (
                            <a
                              href={createGoogleCalendarLink(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                              title="Add to Google Calendar"
                            >
                              <CalendarPlus size={13} className="text-teal-600" />
                              <span>Calendar</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Month Notice Banner */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-6 sm:p-8 text-center">
          <div className="max-w-xl mx-auto">
            <span className="text-2xl mb-2 inline-block">📅</span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              Monthly CEU Posters &amp; Schedules Updated Every Month
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Our organizers upload the official flyer and syllabus for each consecutive month as soon as
              the episode topic is confirmed. Stay connected!
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-800">
              <span>Next up: Episode 3 (January 2027) Announcement Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
