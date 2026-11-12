import React from 'react';
import { ShieldCheck, Award, Zap, Cpu, Wrench, MapPin, Phone, Building2, CheckCircle2, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { CountUpNumber } from './CountUpNumber';
import { useMedia } from '../context/MediaContext';
import { BUNDLED_IMAGES } from '../assets/media';

export const AboutSection: React.FC = () => {
  const { media } = useMedia();
  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Narrative & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Visual & Engineering Showcase */}
          <div className="lg:col-span-5 relative space-y-4">
            {/* Real Storefront Signboard Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src={COMPANY_INFO.officeSignboardImage}
                alt="Kenuch Energy Resources Ltd Office Signboard at Powa Plaza Enugu"
                className="w-full h-80 object-cover object-center group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Verified CAC Registration Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                      Registered Corporate Contractor
                    </span>
                    <span className="text-xs font-bold text-white">
                      {COMPANY_INFO.name} ({COMPANY_INFO.rcNumber})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Field Work Snapshots */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-md">
                <img
                  src={media.working}
                  alt="Certified Solar Technician on Roof"
                  onError={(e) => {
                    e.currentTarget.src = BUNDLED_IMAGES.working;
                  }}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-amber-300">
                  Certified Rooftop Engineering
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-md">
                <img
                  src={media.cleanWiring}
                  alt="Industrial Wiring Standard"
                  onError={(e) => {
                    e.currentTarget.src = BUNDLED_IMAGES.cleanWiring;
                  }}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-emerald-300">
                  Code-Compliant ATS Wiring
                </span>
              </div>
            </div>

            {/* Verified Engineering Credentials Card */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-xl">
              <div className="flex items-center gap-2.5 text-xs font-bold text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Field Quality Assurance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All solar panels, hybrid inverters, LiFePO4 batteries, and 4K CCTV systems are bench-tested at Shop 14 Powa Plaza, Nike Lake Road Abakpa Enugu prior to on-site deployment.
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400 font-semibold">100% Asset Ownership</span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-300 font-semibold">RC NO 7165116</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>{COMPANY_INFO.rcNumber}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-emerald-400">Official Company Profile</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-400">Enugu, Nigeria</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Kenuch Energy Resources Ltd <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400">
                Powering Tomorrow. Securing Today.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              At <strong className="text-white">Kenuch Energy Resources Ltd</strong>, we don't collect monthly bills or lock customers into recurring subscriptions. We engineer and execute complete turnkey installations of solar energy systems with long-life batteries, high-output panels, mounting racks, and 4K CCTV surveillance cameras.
            </p>

            <p className="text-base text-slate-300 leading-relaxed">
              We provide clean, uninterrupted electricity and perimeter surveillance for <strong>residential houses, commercial offices, industrial companies, municipal streets, agricultural farms, and remote acreage</strong>. Headquartered at <strong>{COMPANY_INFO.address}</strong>, our certified engineers deliver code-compliant installations engineered to last for decades.
            </p>

            {/* Quick Contact & Verified Address Highlight */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Physical Workshop & Office:</strong> {COMPANY_INFO.address}, {COMPANY_INFO.state}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Direct Engineering Lines:</strong> 08038712416 · 09022655020 · 08141511540
                </span>
              </div>
            </div>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1.5">
                  <Award className="w-4 h-4" />
                  <span>Tier-1 Component Standard</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We refuse to use cheap recycled cells or weak lead-acid batteries. Every installation utilizes Grade-A Monocrystalline panels and LiFePO4 cells.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Local Encrypted NVR Storage</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your CCTV video stays on your physical hard drive in your property. Stream to your smartphone free without cloud paywalls.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>Certified Solar Contractors</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered with heavy aluminum racking, DC/AC surge arrestors, copper earthing, and clean conduits built to withstand extreme storms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1.5">
                  <Zap className="w-4 h-4" />
                  <span>25-Year Panel Output Warranty</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enjoy reliable solar energy production for a quarter of a century, backed by manufacturer linear performance warranties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Company Track Record Strip with Animated Count-Up Numbers */}
        <div className="pt-10 border-t border-slate-850">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800 shadow-xl">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight tabular-nums">
                <CountUpNumber value="14+" />
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                Years of Field Experience
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Active Engineering Since 2012
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight tabular-nums">
                <CountUpNumber value="1,250+" />
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                People & Clients Served
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Satisfied Homes, Plazas & Farms
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 tracking-tight tabular-nums">
                <CountUpNumber value="850+" />
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                Turnkey Completed Projects
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                100% Commissioned & Handed Over
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 tracking-tight tabular-nums">
                <CountUpNumber value="4.8 MWh" />
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                Clean Power Capacity
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Zero Monthly Bills (₦0.00 / $0)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
