'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedPresenter from '@/components/FeaturedPresenter';
import ScheduleSection from '@/components/ScheduleSection';
import AboutHosts from '@/components/AboutHosts';
import PosterGallery from '@/components/PosterGallery';
import CEUCalculator from '@/components/CEUCalculator';
import RegisterSection from '@/components/RegisterSection';
import Footer from '@/components/Footer';
import PosterModal from '@/components/PosterModal';
import type { CEUEvent } from '@/lib/types';
import { fallbackEvents, getActiveUpcomingEvent } from '@/lib/events';

export default function HomePage() {
  const [events, setEvents] = useState<CEUEvent[]>(fallbackEvents);
  const [activeEvent, setActiveEvent] = useState<CEUEvent>(getActiveUpcomingEvent(fallbackEvents));

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    posterUrl: string;
    title: string;
  }>({
    isOpen: false,
    posterUrl: '',
    title: '',
  });

  // Client-side real-time poll/fetch without cache to ensure multi-device synchronization
  useEffect(() => {
    async function loadFreshEvents() {
      try {
        const res = await fetch(`/api/events?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.events) && data.events.length > 0) {
            setEvents(data.events);
            const freshActive = getActiveUpcomingEvent(data.events);
            setActiveEvent(freshActive);
          }
        }
      } catch (err) {
        // Fallback to static data
      }
    }

    loadFreshEvents();

    // Listen to focus / visibilitychange so when user switches back from admin tab, it immediately syncs!
    const handleFocus = () => loadFreshEvents();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const handleOpenPosterModal = (posterUrl: string, title: string) => {
    setModalState({
      isOpen: true,
      posterUrl,
      title,
    });
  };

  const handleClosePosterModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Dynamic Hero Section — automatically updates to the next upcoming episode */}
        <HeroSection onOpenPosterModal={handleOpenPosterModal} event={activeEvent} />

        {/* Featured Keynote Speakers */}
        <FeaturedPresenter onOpenPosterModal={handleOpenPosterModal} />

        {/* Monthly Roadmap & Episode Schedule */}
        <ScheduleSection onOpenPosterModal={handleOpenPosterModal} />

        {/* The Hosts: Nene & Helen + Conference Photo & Mission */}
        <AboutHosts />

        {/* High-Resolution Monthly Poster Gallery & Download Hub */}
        <PosterGallery onOpenPosterModal={handleOpenPosterModal} />

        {/* Interactive CEU Unit & Pricing Calculator */}
        <CEUCalculator />

        {/* Comprehensive Registration & Verification Section */}
        <RegisterSection />
      </main>

      {/* Comprehensive Footer with Admin Portal Access */}
      <Footer />

      {/* High-Resolution Poster Lightbox Modal */}
      <PosterModal
        isOpen={modalState.isOpen}
        onClose={handleClosePosterModal}
        posterUrl={modalState.posterUrl}
        title={modalState.title}
      />
    </div>
  );
}
