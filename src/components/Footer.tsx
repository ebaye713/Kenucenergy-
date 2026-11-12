import React from 'react';
import { Sun, Shield, Mail, Phone, MapPin, ArrowUp, MessageSquare, Award, Users, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { CountUpNumber } from './CountUpNumber';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      {/* Track Record Read-Up Metrics Strip */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  <CountUpNumber value="14+" />
                </div>
                <div className="text-xs font-semibold text-amber-300">Years Experience</div>
                <div className="text-[11px] text-slate-400">Certified Solar & Security</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  <CountUpNumber value="1,250+" />
                </div>
                <div className="text-xs font-semibold text-emerald-300">People & Clients Served</div>
                <div className="text-[11px] text-slate-400">Homes, Plazas & Estates</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  <CountUpNumber value="850+" />
                </div>
                <div className="text-xs font-semibold text-sky-300">Turnkey Projects</div>
                <div className="text-[11px] text-slate-400">100% Commissioned</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  ₦0 / $0
                </div>
                <div className="text-xs font-semibold text-purple-300">Monthly Subscriptions</div>
                <div className="text-[11px] text-slate-400">Zero Recurring Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-white font-bold text-lg group">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sun className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                  KENUCH <span className="text-amber-400 font-bold text-xs tracking-normal">ENERGY</span>
                </span>
                <span className="text-[9px] font-semibold text-emerald-400 tracking-wider uppercase leading-tight">
                  RC NO 7165116 · Resources Ltd
                </span>
              </div>
            </a>
            <p className="text-amber-400 font-semibold text-xs">
              "{COMPANY_INFO.slogan}"
            </p>
            <p className="text-slate-400 leading-relaxed text-xs">
              Turnkey solar energy systems and 4K CCTV surveillance installations for residential estates, corporate facilities, agricultural farms, and municipal street lighting. 100% customer ownership with zero recurring subscriptions.
            </p>
            <div className="pt-1 text-slate-300 text-xs font-semibold flex items-center gap-2">
              <span className="text-emerald-400">☀️ Solar</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400">📹 4K CCTV</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">🔋 LiFePO4 Storage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Core Capabilities
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Residential Solar & Lithium Storage
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  3-Phase Commercial Solar Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Agricultural Solar Water Pumping
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Autonomous Solar Street Lighting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  4K CCTV Surveillance (Zero Cloud Fees)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#zero-bills" className="hover:text-amber-400 transition-colors">
                  The Zero-Bill Model
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Installation Gallery
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">
                  System Sizer
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                  Client Proof
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Our Office
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-400 transition-colors">
                  Installation & Warranty FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Request Free Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Office & Direct Contacts
            </span>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}, {COMPANY_INFO.state}</span>
              </div>
              <div className="space-y-1 pt-1">
                {COMPANY_INFO.phones.map((phone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a href={`tel:${phone.raw}`} className="hover:text-amber-400 transition-colors font-medium">
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Copyright with Ebastech Credit */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.rcNumber}). All rights reserved.
          </div>

          {/* Built & Designed by Ebastech */}
          <div className="flex items-center gap-2 text-slate-300">
            <span>Built and designed by</span>
            <a
              href="https://portfolio-five-omega-27.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:decoration-amber-300 tracking-wide transition-colors"
              title="Visit Ebastech Portfolio"
            >
              Ebastech
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span>Shop 14 Powa Plaza, Nike Lake Road, Abakpa Enugu</span>
            <span aria-hidden="true">·</span>
            <span>Zero Subscription Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
