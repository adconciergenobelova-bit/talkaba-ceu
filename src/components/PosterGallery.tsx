'use client';

import Image from 'next/image';
import { Eye, Download, Share2, Sparkles, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onOpenPosterModal?: (posterUrl: string, title: string) => void;
}

export default function PosterGallery({ onOpenPosterModal }: Props) {
  const posters = [
    {
      id: 'nov-2026',
      month: 'November 2026',
      title: 'IBAO Global Leadership in Ethics and Supervision',
      presenter: 'Dr Michael Mueller, Ph.D, BCBA-D, IBA',
      url: '/posters/november-2026.jpg',
      theme: 'border-teal-200 hover:border-teal-400',
      badge: 'Episode 1 • November 11',
      badgeColor: 'bg-teal-600',
    },
    {
      id: 'dec-2026',
      month: 'December 12, 2026',
      title: "Dr. Ed.'s Model for Behavior Analysis and Intervention: The Loci of Ethics in Action",
      presenter: 'Dr Edward Usifo Asikhia, BCBA-D',
      url: '/posters/december-2026.jpg',
      theme: 'border-cyan-300 hover:border-cyan-500 ring-1 ring-cyan-500/20',
      badge: 'Episode 2 • 2 CEU Units',
      badgeColor: 'bg-teal-800',
    },
  ];

  const handleShare = async (title: string, url: string) => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `TalkABA CEU Flyer: ${title}`,
          text: `Check out the TalkABA CEU event flyer for ${title}!`,
          url: window.location.origin + url,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + url);
      alert('Poster link copied to clipboard!');
    }
  };

  return (
    <section id="posters" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-teal-600" />
            Official Flyer Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Monthly CEU Event Posters
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High-resolution official posters are published monthly. Click any flyer to view in full resolution,
            download for your clinic or school notice board, or share with colleagues.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className={`rounded-3xl bg-white border ${poster.theme} p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Poster Image Container */}
                <div
                  onClick={() => onOpenPosterModal?.(poster.url, `${poster.month} - ${poster.title}`)}
                  className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer mb-5 bg-slate-100 shadow-inner group/img"
                >
                  <Image
                    src={poster.url}
                    alt={poster.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg font-semibold text-xs flex items-center gap-1.5">
                      <Eye size={16} /> Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase text-white tracking-wider ${poster.badgeColor} mb-2`}
                  >
                    {poster.badge}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                    {poster.title}
                  </h3>
                  <p className="text-xs text-teal-800 font-semibold">{poster.presenter}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenPosterModal?.(poster.url, `${poster.month} - ${poster.title}`)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye size={13} />
                  <span>View Flyer</span>
                </button>
                <a
                  href={poster.url}
                  download
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  title="Download Image"
                >
                  <Download size={14} />
                </a>
                <button
                  onClick={() => handleShare(poster.title, poster.url)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  title="Share Poster Link"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Card 3: Upload Next Month Banner */}
          <div className="rounded-3xl border-2 border-dashed border-teal-300 bg-gradient-to-b from-teal-50/50 to-white p-6 shadow-sm flex flex-col justify-between text-center items-center">
            <div className="my-auto py-8">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-4">
                <PlusCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Next Month&apos;s Poster</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mb-6">
                Are you an organizer or host? Easily upload the official poster for the upcoming month
                and publish episode details straight to this website.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>Go to Admin Upload</span>
              </Link>
            </div>
            <div className="text-[11px] text-slate-400">
              Supports JPG, PNG, WebP up to 10MB
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
