import React, { useState, useMemo } from 'react';
import { FAQS, COMPANY_INFO } from '../data/mockData';
import { FaqCategory } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
  ShieldAlert,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';

interface ContactSectionProps {
  initialConfig?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialConfig = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    propertyType: 'Residential Home',
    serviceNeeded: 'Both Solar & CCTV Installation',
    timeline: 'Within 2-3 Weeks',
    message: initialConfig || '',
  });

  // Accordion FAQ State
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-time-1');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<FaqCategory>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Filtered FAQs based on category & search term
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
      const q = faqSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q) ||
        (faq.keyTakeaway && faq.keyTakeaway.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedFaqCategory, faqSearchQuery]);

  // Sync if initialConfig changes
  React.useEffect(() => {
    if (initialConfig) {
      setFormData((prev) => ({
        ...prev,
        message: initialConfig,
      }));
    }
  }, [initialConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate immediate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleWhatsAppClick = (customPhone?: string) => {
    const targetPhone = typeof customPhone === 'string' && customPhone ? customPhone : COMPANY_INFO.whatsappPhone;
    const text = encodeURIComponent(
      `Hello Kenuch Energy Resources Ltd! I am interested in a turnkey Solar and 4K CCTV installation for my ${formData.propertyType} in ${formData.location || 'Enugu / my location'}. Could you provide a quotation?`
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>RC NO 7165116</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-emerald-400">Direct Engineering Inquiry</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">Enugu & Nationwide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Kenuch Energy Resources Ltd
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Ready to end recurring electric utility bills, eliminate fuel expenses, and stop monthly CCTV subscriptions? Visit our office at Shop 14 Powa Plaza, Nike Lake Road, Abakpa Enugu or reach out directly to our lead engineers below.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Direct Channels & Coverage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Direct Engineering Desk</h3>
                  <p className="text-xs text-amber-400 font-medium">Powering Tomorrow. Securing Today.</p>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">
                  RC 7165116
                </span>
              </div>

              {/* Physical Office with Signboard thumbnail */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50">
                <img
                  src={COMPANY_INFO.officeSignboardImage}
                  alt="Kenuch Energy Resources Ltd Signboard"
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-3 text-xs text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Physical Office:</span>
                    <span>{COMPANY_INFO.address}, {COMPANY_INFO.state}</span>
                  </div>
                </div>
              </div>

              {/* Verified Phone Numbers */}
              <div className="space-y-3.5 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                    Direct Call & Hotline Numbers:
                  </span>
                  <div className="flex flex-col gap-2">
                    {COMPANY_INFO.phones.map((phone, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <a
                          href={`tel:${phone.raw}`}
                          className="font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{phone.display}</span>
                          {phone.isPrimary && (
                            <span className="text-[10px] text-amber-400 font-medium">(Primary)</span>
                          )}
                        </a>
                        {phone.isWhatsApp && (
                          <button
                            type="button"
                            onClick={() => handleWhatsAppClick(phone.raw.replace('+', ''))}
                            className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" /> WhatsApp
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-xs font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick()}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (08038712416)</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Fast Dispatch & Audit</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Site audits, roof structural analysis, and load assessments scheduled within 24 to 48 hours of contact.
              </p>
            </div>
          </div>

          {/* Right Column: Animated Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Audit Request Received!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our lead installation engineer has received your specifications for {formData.propertyType} in {formData.location || 'your area'}. We will review and reach out within 4 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 text-xs font-semibold text-amber-400 hover:text-white border border-amber-400/40 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Configure Project Inquiry
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fill out your details to receive an itemized proposal with zero hidden costs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Henderson"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Installation City / State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Austin, TX or County/Region"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Property Category
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white outline-none"
                      >
                        <option value="Residential Home">Residential Home / Villa</option>
                        <option value="Commercial Office">Commercial Office / Building</option>
                        <option value="Industrial Company">Industrial Factory / Warehouse</option>
                        <option value="Agricultural Farm">Agricultural Farm & Ranch</option>
                        <option value="Municipal Streets">Municipal / Estate Street Lighting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white outline-none"
                      >
                        <option value="Both Solar & CCTV Installation">Both Solar & 4K CCTV (Recommended)</option>
                        <option value="Solar Power System Only">Solar Energy & Batteries Only</option>
                        <option value="4K CCTV Surveillance Only">4K CCTV Security Cameras Only</option>
                        <option value="Solar Water Pumping">Solar Water Pumping (Farm/Borehole)</option>
                        <option value="Solar Street Lighting">Solar Street Lighting Network</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      System Requirements / Notes (e.g. Appliances, Camera count)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your appliances (e.g. 3 ACs, deep freeze, water pump, 8 cameras) or any special requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Analyzing Blueprint & Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project for Free Engineering Audit</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    No subscriptions. No recurring bills. 100% turnkey hardware guarantee.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Accordion FAQ Section */}
        <div className="pt-16 border-t border-slate-800" id="faqs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
                <span>Frequently Asked Questions</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-slate-400">Engineering Knowledgebase</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Installation Timeframes, Maintenance & Warranties
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Clear, transparent engineering details explaining mobilization timelines, zero-acid solid-state battery care, 25-year panel warranties, and our 100% asset ownership policy.
              </p>
            </div>

            {/* Quick WhatsApp helper button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-400/40 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Ask Engineer Directly</span>
              </button>
            </div>
          </div>

          {/* FAQ Category Filters & Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
            {/* Category Segmented Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'timeframes', label: 'Installation Timeframes' },
                { id: 'maintenance', label: 'System Maintenance' },
                { id: 'warranty', label: 'System Warranties' },
                { id: 'zero_bill', label: 'Zero-Bill Model' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedFaqCategory(cat.id as any);
                    setExpandedFaqId(null);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedFaqCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => {
                  setFaqSearchQuery(e.target.value);
                  setExpandedFaqId(null);
                }}
                placeholder="Filter by keyword (e.g. days, battery)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 text-xs">
                No questions found matching "{faqSearchQuery}". Try another keyword or switch categories.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-amber-500/50 bg-slate-900/90 shadow-xl shadow-amber-500/5'
                        : 'border-slate-800/80 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Accordion Header Button */}
                    <button
                      type="button"
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                          <span>{faq.categoryLabel}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                          {faq.question}
                        </h4>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 ${
                          isOpen
                            ? 'bg-amber-400 text-slate-950 border-amber-400 rotate-180'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Collapsible Body */}
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/80 text-sm text-slate-300 space-y-4">
                        <div className="space-y-2 leading-relaxed text-xs sm:text-sm whitespace-pre-line text-slate-300">
                          {faq.answer}
                        </div>

                        {faq.keyTakeaway && (
                          <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800 flex items-start gap-2.5 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-slate-200">Key Engineering Guarantee: </span>
                              <span className="text-slate-300">{faq.keyTakeaway}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Support Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-sm font-bold text-white block">
                Have a unique property or commercial specification?
              </span>
              <p className="text-xs text-slate-400">
                Our licensed solar technicians and CCTV network engineers review blueprints and satellite imagery for free.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Chat on WhatsApp
              </button>
              <a
                href="tel:+2348038712416"
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Call Hotline (08038712416)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
