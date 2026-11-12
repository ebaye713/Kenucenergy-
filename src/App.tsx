import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuePropBanner } from './components/ValuePropBanner';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveConfigurator } from './components/InteractiveConfigurator';
import { GalleryShowcase } from './components/GalleryShowcase';
import { SelfSlidingTestimonials } from './components/SelfSlidingTestimonials';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { SmartScrollController } from './components/SmartScrollController';
import { Footer } from './components/Footer';

import { MediaProvider } from './context/MediaContext';

export default function App() {
  const [inquiryText, setInquiryText] = useState<string>('');

  const scrollToContact = (customMessage?: string) => {
    if (customMessage) {
      setInquiryText(customMessage);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MediaProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
        {/* Pinned Top Navigation */}
        <Navbar onQuoteClick={() => scrollToContact()} />

        <main className="flex-1">
          {/* Dynamic Hero Section with changing images */}
          <HeroSection
            onExploreClick={scrollToGallery}
            onEstimateClick={scrollToEstimator}
          />

          {/* Core Value Proposition & Zero-Subscription Guarantee */}
          <ValuePropBanner />

          {/* Engineering Capabilities & Installation Sectors */}
          <ServicesSection
            onSelectService={(serviceTitle) =>
              scrollToContact(`Inquiring about installation package for: ${serviceTitle}`)
            }
          />

          {/* Interactive System Sizer & Cost Estimator */}
          <InteractiveConfigurator
            onApplyConfig={(summary) => scrollToContact(summary)}
          />

          {/* Marvellous Installation Gallery with Before & After Slider */}
          <GalleryShowcase
            onInquireProject={(projectTitle) =>
              scrollToContact(`Interested in an installation similar to project: ${projectTitle}`)
            }
          />

          {/* Self-Sliding Testimonial Carousel */}
          <SelfSlidingTestimonials />

          {/* About Company & Certified Master Electricians */}
          <AboutSection />

          {/* Animated Contact & Quote Request with FAQs */}
          <ContactSection initialConfig={inquiryText} />
        </main>

        {/* Floating Smart Scroll Controller (Auto Up & Down) */}
        <SmartScrollController />

        {/* Editorial Footer */}
        <Footer />
      </div>
    </MediaProvider>
  );
}
