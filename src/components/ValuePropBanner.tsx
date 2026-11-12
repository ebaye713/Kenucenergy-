import React from 'react';
import { ZERO_SUBSCRIPTION_COMPARISON } from '../data/mockData';
import { ShieldAlert, ZapOff, CheckCircle, XCircle, BatteryCharging, Eye, DollarSign } from 'lucide-react';

export const ValuePropBanner: React.FC = () => {
  return (
    <section id="zero-bills" className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Our Founding Principle</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">Total Asset Freedom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            We Never Bill You Monthly. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              You Own The Hardware, The Power & The Video.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Most energy and security companies trap you in perpetual monthly subscriptions or unpredictable utility tariff hikes and fuel runs.
            At Kenuch Energy Resources Ltd (RC NO 7165116), we install top-tier solar panels, deep-cycle lithium batteries, industrial pure sine inverters, and high-definition 4K CCTV systems. Once installed, the asset is 100% yours. Zero recurring bills. Zero surveillance paywalls.
          </p>
        </div>

        {/* 3 Pillars of Ownership */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 relative hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <ZapOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">0 Monthly Utility Bills</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Generate 100% clean, silent electricity on your own roof or land. Say goodbye to estimated billing, tariff spikes, and blackout stress.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 relative hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">0 CCTV Cloud Subscriptions</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We install local high-capacity NVR hard drives. Stream live 4K footage and review 30+ days of history on your phone with zero monthly fees.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 relative hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Tangible Asset Equity</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every dollar you invest immediately increases the appraised value of your residential home, commercial building, or agricultural acreage.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/70 shadow-2xl">
          <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Comparison: Permanent Ownership vs. Monthly Subscriptions
            </span>
            <span className="text-xs text-amber-400 font-medium hidden sm:inline">
              Guaranteed by Kenuch Energy Resources Ltd (RC 7165116)
            </span>
          </div>

          <div className="divide-y divide-slate-800/80 overflow-x-auto">
            <div className="grid grid-cols-12 min-w-[640px] px-6 py-3 text-xs font-semibold uppercase text-slate-400 bg-slate-900/40">
              <div className="col-span-4">Critical Metric</div>
              <div className="col-span-4 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Kenuch Energy Turnkey Installation
              </div>
              <div className="col-span-4 text-slate-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" /> Conventional Grid & Cloud Companies
              </div>
            </div>

            {ZERO_SUBSCRIPTION_COMPARISON.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 min-w-[640px] px-6 py-4 text-sm items-center hover:bg-slate-900/30 transition-colors">
                <div className="col-span-4 font-semibold text-slate-200">
                  {row.feature}
                </div>
                <div className="col-span-4 text-emerald-300 font-medium pr-4">
                  {row.solaraguard}
                </div>
                <div className="col-span-4 text-slate-400 text-xs sm:text-sm">
                  {row.conventional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
