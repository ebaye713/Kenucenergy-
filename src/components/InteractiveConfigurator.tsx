import React, { useState, useMemo } from 'react';
import { Sliders, Sun, Shield, Battery, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface InteractiveConfiguratorProps {
  onApplyConfig: (summary: string) => void;
}

export const InteractiveConfigurator: React.FC<InteractiveConfiguratorProps> = ({ onApplyConfig }) => {
  const [propertyType, setPropertyType] = useState<'home' | 'office' | 'company' | 'farm' | 'street'>('home');
  const [powerProfile, setPowerProfile] = useState<'standard' | 'medium' | 'heavy' | 'agri_pump'>('medium');
  const [cctvRequirement, setCctvRequirement] = useState<'none' | '4cam' | '8cam' | '16cam' | 'solar_pole'>('8cam');
  const [backupHours, setBackupHours] = useState<'12h' | '24h' | '48h'>('24h');

  // Compute calculated recommendations
  const estimation = useMemo(() => {
    let inverterKva = 5;
    let batteryKwh = 5.12;
    let panelWatts = 3300;
    let panelCount = 6;
    let priceEstimate = '$4,500 - $6,800';
    let dailyGen = '16 - 20 kWh';
    let annualSavings = '$2,400 / yr';

    if (propertyType === 'home') {
      if (powerProfile === 'standard') {
        inverterKva = 5;
        batteryKwh = 5.12;
        panelWatts = 3300;
        panelCount = 6;
        priceEstimate = '₦3,800,000 - ₦5,200,000 (~$2,500 - $3,400)';
        dailyGen = '15 - 18 kWh';
        annualSavings = '₦3,200,000 / yr saved';
      } else if (powerProfile === 'medium') {
        inverterKva = 8;
        batteryKwh = 10.24;
        panelWatts = 5500;
        panelCount = 10;
        priceEstimate = '₦6,800,000 - ₦9,200,000 (~$4,500 - $6,000)';
        dailyGen = '25 - 30 kWh';
        annualSavings = '₦5,800,000 / yr saved';
      } else {
        inverterKva = 12;
        batteryKwh = 15.36;
        panelWatts = 8800;
        panelCount = 16;
        priceEstimate = '₦10,500,000 - ₦14,200,000 (~$7,000 - $9,500)';
        dailyGen = '40 - 48 kWh';
        annualSavings = '₦8,400,000 / yr saved';
      }
    } else if (propertyType === 'office') {
      inverterKva = powerProfile === 'heavy' ? 30 : 15;
      batteryKwh = powerProfile === 'heavy' ? 40 : 20;
      panelWatts = powerProfile === 'heavy' ? 22000 : 11000;
      panelCount = powerProfile === 'heavy' ? 40 : 20;
      priceEstimate = powerProfile === 'heavy' ? '₦24,000,000 - ₦32,000,000' : '₦14,500,000 - ₦19,500,000';
      dailyGen = powerProfile === 'heavy' ? '100 - 120 kWh' : '50 - 60 kWh';
      annualSavings = powerProfile === 'heavy' ? '₦18,000,000 / yr in diesel' : '₦11,000,000 / yr in diesel';
    } else if (propertyType === 'company') {
      inverterKva = 50;
      batteryKwh = 60;
      panelWatts = 44000;
      panelCount = 80;
      priceEstimate = '₦42,000,000 - ₦58,000,000';
      dailyGen = '190 - 240 kWh';
      annualSavings = '₦35,000,000 / yr in fuel & grid';
    } else if (propertyType === 'farm') {
      inverterKva = 20;
      batteryKwh = 25;
      panelWatts = 16500;
      panelCount = 30;
      priceEstimate = '₦16,000,000 - ₦22,000,000';
      dailyGen = '75 - 90 kWh';
      annualSavings = '₦14,000,000 / yr in fuel & water';
    } else {
      // streetlights
      inverterKva = 10;
      batteryKwh = 15;
      panelWatts = 6600;
      panelCount = 12;
      priceEstimate = '₦8,500,000 - ₦12,500,000';
      dailyGen = '30 - 36 kWh';
      annualSavings = '₦6,500,000 / yr saved';
    }

    if (backupHours === '48h') {
      batteryKwh = Math.round(batteryKwh * 1.6 * 10) / 10;
    } else if (backupHours === '12h') {
      batteryKwh = Math.round(batteryKwh * 0.75 * 10) / 10;
    }

    let cctvDetails = 'No surveillance cameras selected';
    if (cctvRequirement === '4cam') {
      cctvDetails = '4x 4K Starlight Turret Cameras + 4TB NVR (30 Days Local Recording)';
    } else if (cctvRequirement === '8cam') {
      cctvDetails = '8x 4K ColorVu AI Detection Cameras + 8TB NVR (45 Days Local Recording)';
    } else if (cctvRequirement === '16cam') {
      cctvDetails = '16x 4K Commercial PoE Cameras + 16TB Enterprise NVR (60 Days Local Recording)';
    } else if (cctvRequirement === 'solar_pole') {
      cctvDetails = 'Autonomous Solar CCTV Pole with 4G LTE Link + 360° PTZ Optical Zoom';
    }

    return {
      inverter: `${inverterKva} kVA Pure Sine Wave Inverter`,
      battery: `${batteryKwh} kWh LiFePO4 Lithium Bank`,
      solar: `${(panelWatts / 1000).toFixed(1)} kWp (${panelCount}x 550W Tier-1 Panels)`,
      cctv: cctvDetails,
      priceRange: priceEstimate,
      generation: dailyGen,
      annualSavings,
      monthlyBills: '$0.00 / month (100% Owned)',
    };
  }, [propertyType, powerProfile, cctvRequirement, backupHours]);

  const handleApply = () => {
    const summary = `Configured System for ${propertyType.toUpperCase()}: ${estimation.inverter}, ${estimation.battery}, ${estimation.solar}, ${estimation.cctv}. Estimated Daily Gen: ${estimation.generation}.`;
    onApplyConfig(summary);
  };

  return (
    <section id="estimator" className="py-24 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Instant System Sizer</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">Zero Obligation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Solar & CCTV System
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Configure your property requirements below. Our sizing algorithm estimates the optimal inverter capacity, LiFePO4 battery reserve, solar panel array, and CCTV camera storage. Remember: you own 100% of the hardware with zero monthly fees.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7 p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl">
            {/* Step 1: Property Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'home', label: 'Residential Home' },
                  { id: 'office', label: 'Corporate Office' },
                  { id: 'company', label: 'Factory / Industrial' },
                  { id: 'farm', label: 'Farm & Ranch' },
                  { id: 'street', label: 'Street & Estate' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPropertyType(item.id as any)}
                    className={`py-3 px-3.5 text-xs font-medium rounded-lg border transition-all text-left cursor-pointer ${
                      propertyType === item.id
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Power Demand */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                2. Appliance & Electrical Load Profile
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'standard',
                    label: 'Essential Load',
                    desc: 'LED Lighting, Smart TVs, Refrigerators, Laptops & Fans',
                  },
                  {
                    id: 'medium',
                    label: 'Modern Comfort (Popular)',
                    desc: 'Inverter AC units, Deep Freezers, Washing Machines & Pumps',
                  },
                  {
                    id: 'heavy',
                    label: 'Heavy Commercial Load',
                    desc: 'Multiple central ACs, Cold rooms, High-draw servers & Workshop tools',
                  },
                  {
                    id: 'agri_pump',
                    label: 'Agricultural Irrigation',
                    desc: 'Deep borehole submersible pumps, Farm lighting & Barn aeration',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPowerProfile(item.id as any)}
                    className={`p-3.5 text-xs rounded-lg border transition-all text-left cursor-pointer ${
                      powerProfile === item.id
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white mb-1">{item.label}</div>
                    <div className="text-slate-400 text-[11px] leading-snug">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: CCTV Surveillance */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                3. Security CCTV Surveillance Requirement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'none', label: 'No Cameras', desc: 'Solar Energy Only' },
                  { id: '4cam', label: '4x 4K Cameras', desc: '4TB Local NVR (Private home)' },
                  { id: '8cam', label: '8x 4K Cameras', desc: '8TB NVR + ColorVu AI detection' },
                  { id: '16cam', label: '16x 4K Cameras', desc: '16TB Commercial NVR' },
                  { id: 'solar_pole', label: 'Solar CCTV Pole', desc: 'Standalone 4G PTZ for farms' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCctvRequirement(item.id as any)}
                    className={`p-3 text-xs rounded-lg border transition-all text-left cursor-pointer ${
                      cctvRequirement === item.id
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white mb-0.5">{item.label}</div>
                    <div className="text-slate-400 text-[10px] leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Battery Reserve Hours */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                4. Desired Battery Backup Reserve
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '12h', label: '12 Hours Reserve', sub: 'Overnight Nighttime' },
                  { id: '24h', label: '24 Hours Full Day', sub: 'Standard Off-Grid' },
                  { id: '48h', label: '48 Hours Storm Buffer', sub: 'Extended Cloudy Weather' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBackupHours(item.id as any)}
                    className={`p-3 text-xs rounded-lg border transition-all text-center cursor-pointer ${
                      backupHours === item.id
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-white">{item.label}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sizing Blueprint Output Card */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  Recommended System Blueprint
                </span>
                <span className="text-lg font-bold text-white">Turnkey Hardware Specs</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sun className="w-5 h-5" />
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Hybrid Inverter Capacity</span>
                </div>
                <div className="text-sm font-bold text-white">{estimation.inverter}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-1">
                  <Battery className="w-3.5 h-3.5" />
                  <span>Lithium Storage Bank (Grade-A LiFePO4)</span>
                </div>
                <div className="text-sm font-bold text-white">{estimation.battery}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Solar Panel Generation Array</span>
                </div>
                <div className="text-sm font-bold text-white">{estimation.solar}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-purple-400 font-medium mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>CCTV & Surveillance System</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">{estimation.cctv}</div>
              </div>
            </div>

            {/* Financial & Energy Metrics */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/90 mb-6 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Est. Daily Generation</span>
                <span className="text-sm font-bold text-emerald-400 tabular-nums">{estimation.generation}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Monthly Subscriptions</span>
                <span className="text-sm font-bold text-amber-400">$0.00 Forever</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Apply This Setup to Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-3">
              Includes full engineering survey, mounting brackets, conduits, and warranty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
