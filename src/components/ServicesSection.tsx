import React, { useState } from 'react';
import { CORE_SERVICES } from '../data/mockData';
import { Check, ArrowRight, Shield, Zap, Wrench, ChevronRight } from 'lucide-react';
import { ServiceDetail } from '../types';
import { BUNDLED_IMAGES } from '../assets/media';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail>(CORE_SERVICES[0]);

  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Engineering Capabilities</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">Complete Hardware Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Solar & CCTV Installations
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            We provide electricity and autonomous surveillance for houses, corporate offices, industrial companies, municipal streets, agricultural farms, and remote acreage. Every installation is turnkey, engineered for decades of durability.
          </p>
        </div>

        {/* Dynamic Service Showcase & Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {CORE_SERVICES.map((srv, index) => {
              const isCurrent = srv.id === selectedService.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-200 cursor-pointer border flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-slate-900 border-amber-500/60 shadow-xl shadow-amber-500/10'
                      : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-400 font-semibold">
                        0{index + 1}.
                      </span>
                      <h3
                        className={`text-base font-bold transition-colors ${
                          isCurrent ? 'text-white' : 'text-slate-200 group-hover:text-amber-300'
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{srv.tagline}</p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform shrink-0 ${
                      isCurrent ? 'text-amber-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Spotlight Card */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Visual Header */}
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden mb-6 border border-slate-800">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = BUNDLED_IMAGES.storefront;
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                  Target Application
                </span>
                <span className="text-sm font-medium text-white">{selectedService.bestFor}</span>
              </div>
            </div>

            {/* Service Details */}
            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              {selectedService.title}
            </h3>
            <p className="text-amber-400 font-medium text-sm mb-4">
              {selectedService.tagline}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedService.description}
            </p>

            {/* Key Engineering Features */}
            <div className="space-y-2.5 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Engineering Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Included */}
            <div className="pt-4 border-t border-slate-800/80 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Turnkey Hardware Included:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.equipmentIncluded.map((eq, i) => (
                  <span
                    key={i}
                    className="text-xs text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => onSelectService(selectedService.title)}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Quote for {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
