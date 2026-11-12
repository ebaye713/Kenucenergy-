import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/mockData';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react';
import { CountUpNumber } from './CountUpNumber';

import { useMedia } from '../context/MediaContext';
import { BUNDLED_IMAGES } from '../assets/media';

interface HeroSectionProps {
  onExploreClick: () => void;
  onEstimateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onEstimateClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { media } = useMedia();

  const slideImages = [
    media.working,           // Working.jpg (Certified solar engineer on roof)
    media.after,             // After.jpg (Completed full rooftop solar array)
    media.bookedSolarPanels, // Already booked solar pannels.jpg (Panels mobilized on site)
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Measured Scrim for Maximum Legibility */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-7000`}
          >
            <img
              src={slideImages[index] || item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = BUNDLED_IMAGES.storefront;
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Measured dark gradient scrim matching design guidelines */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Trust Tag (Zero-pill compliant) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>RC NO 7165116</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-emerald-400">Solar & CCTV Turnkey Contractors</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">Shop 14 Powa Plaza, Nike Lake Road, Abakpa Enugu</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
              Kenuch Energy Resources Ltd
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 mt-2 text-3xl sm:text-4xl lg:text-5xl">
                Powering Tomorrow. Securing Today.
              </span>
            </h1>

            {/* Value Proposition Prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance">
              {slide.subtitle}
            </p>

            {/* Core Guarantees Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No recurring power bills after installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero cloud subscriptions for CCTV phone streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Turnkey hardware: Panels, Batteries, Inverters & 4K NVR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Houses, Offices, Farms, Ranches & Solar Streets</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onEstimateClick}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-950" />
                <span>Calculate System Size & Quote</span>
                <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                View Real Installations
              </button>
            </div>
          </div>

          {/* Right Column: Featured Real Storefront & Signboard Photo */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <img
                src={media.storefront}
                alt="Kenuch Energy Resources Ltd Storefront & Signboard at Powa Plaza Enugu"
                className="w-full h-80 object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 text-xs">
                <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                  Official Verified Storefront & Workshop
                </div>
                <div className="font-bold text-white text-sm mt-0.5">
                  Shop 14 Powa Plaza, Nike Lake Road, Abakpa Enugu
                </div>
                <div className="text-slate-300 text-[11px] mt-1 flex items-center justify-between">
                  <span>RC NO 7165116</span>
                  <span className="text-emerald-400 font-medium">08038712416</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Manual Buttons */}
        <div className="flex items-center justify-between pt-10 mt-6 border-t border-slate-800/60 max-w-3xl">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip Below Hero Content with Read-Up Counter */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-lg">
          {slide.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                <CountUpNumber key={`${currentSlide}-${i}-${stat.value}`} value={stat.value} />
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
