import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Play, Pause } from 'lucide-react';

export const SmartScrollController: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);
  const [isAutoCruising, setIsAutoCruising] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = window.scrollY;
      const progress = Math.min(100, Math.max(0, (current / totalHeight) * 100));
      setScrollProgress(progress);

      setIsNearTop(current < 300);
      setIsNearBottom(current > totalHeight - 400);

      // If user reaches the bottom while auto-cruising, stop auto cruise
      if (current >= totalHeight - 50 && isAutoCruising) {
        setIsAutoCruising(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoCruising]);

  // Handle continuous smooth auto-cruising
  useEffect(() => {
    let animationFrameId: number;
    if (isAutoCruising) {
      const step = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= totalHeight - 10) {
          setIsAutoCruising(false);
          return;
        }
        window.scrollBy({ top: 1.8, behavior: 'instant' as any });
        animationFrameId = requestAnimationFrame(step);
      };
      animationFrameId = requestAnimationFrame(step);
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoCruising]);

  const scrollToTop = () => {
    setIsAutoCruising(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    setIsAutoCruising(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleAutoCruise = () => {
    if (isAutoCruising) {
      setIsAutoCruising(false);
    } else {
      if (isNearBottom) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsAutoCruising(true), 800);
      } else {
        setIsAutoCruising(true);
      }
    }
  };

  // Sections list for jumping
  const sectionIds = ['hero', 'services', 'zero-bills', 'estimator', 'gallery', 'testimonials', 'about', 'contact'];

  const scrollNextSection = () => {
    setIsAutoCruising(false);
    const currentPos = window.scrollY + 100;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (top > currentPos) {
          window.scrollTo({ top: top - 40, behavior: 'smooth' });
          return;
        }
      }
    }
    scrollToBottom();
  };

  const scrollPrevSection = () => {
    setIsAutoCruising(false);
    const currentPos = window.scrollY - 100;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (top < currentPos) {
          window.scrollTo({ top: top - 40, behavior: 'smooth' });
          return;
        }
      }
    }
    scrollToTop();
  };

  return (
    <aside aria-label="Smart Navigation Controls" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Floating Smart Scroll Controller Widget */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl shadow-black/80 hover:border-amber-400/50 transition-all duration-300">
        {/* Auto Tour Play/Pause Toggle */}
        <button
          onClick={toggleAutoCruise}
          className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
            isAutoCruising
              ? 'bg-amber-400 text-slate-950 animate-pulse'
              : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
          }`}
          title={isAutoCruising ? 'Pause Auto Scroll' : 'Start Auto Cruise Down'}
          aria-label={isAutoCruising ? 'Pause Auto Scroll' : 'Start Auto Cruise Down'}
        >
          {isAutoCruising ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Dynamic Up/Down Button */}
        {isNearBottom ? (
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-90 group"
            title="Auto Scroll to Top"
            aria-label="Auto Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        ) : isNearTop ? (
          <button
            onClick={scrollNextSection}
            className="p-2.5 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-90 group"
            title="Auto Scroll to Next Section"
            aria-label="Auto Scroll to Next Section"
          >
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={scrollPrevSection}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Scroll Up"
              aria-label="Scroll Up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={scrollNextSection}
              className="p-2.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-90"
              title="Scroll Down"
              aria-label="Scroll Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scroll percentage mini display */}
        <div className="hidden sm:flex items-center pr-2 pl-1 text-[10px] font-mono font-bold text-slate-400 tabular-nums">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </aside>
  );
};
