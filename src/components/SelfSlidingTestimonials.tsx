import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { BUNDLED_IMAGES } from '../assets/media';

export const SelfSlidingTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Self-sliding timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-900/40 relative border-t border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
              <span>Client Endorsements</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-400">Audited Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Owners Say About Zero Subscriptions
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Verified private homeowners, estate managers, corporate executives, and farm operators who eliminated electric bills and cloud subscriptions.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 mr-2 tabular-nums">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Self-sliding Showcase Container */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <Quote className="absolute top-8 right-8 w-20 h-20 text-slate-900 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Author Profile */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="relative">
                <img
                  src={TESTIMONIALS[currentIndex].avatarUrl}
                  alt={TESTIMONIALS[currentIndex].author}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = BUNDLED_IMAGES.working;
                  }}
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-400/40 p-1 bg-slate-900"
                />
                <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-slate-950">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {TESTIMONIALS[currentIndex].author}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {TESTIMONIALS[currentIndex].role}, {TESTIMONIALS[currentIndex].organization}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {TESTIMONIALS[currentIndex].location}
                </p>
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 pt-1">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Kenuch Energy Installation (RC 7165116)</span>
              </div>
            </div>

            {/* Right Column: In-depth Review & Installed Specs */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal italic">
                "{TESTIMONIALS[currentIndex].quote}"
              </p>

              {/* Verified Hardware Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Turnkey Installed Hardware:
                  </span>
                  <span className="font-bold text-white">
                    {TESTIMONIALS[currentIndex].installedSystem}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Verified Outcome:
                  </span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {TESTIMONIALS[currentIndex].annualSavings}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress Indicator Bar */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-900 justify-center lg:justify-start">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-10 bg-amber-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
            <span className="text-[11px] text-slate-400 ml-3">
              Auto-sliding · Pauses on hover
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
