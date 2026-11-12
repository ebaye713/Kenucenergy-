import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/mockData';
import { ProjectCategory, ProjectItem } from '../types';
import { Eye, MapPin, Zap, Battery, Shield, X, ArrowRight, SlidersHorizontal, Check, Download, Upload } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { BUNDLED_IMAGES } from '../assets/media';

interface GalleryShowcaseProps {
  onInquireProject: (projectTitle: string) => void;
}

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({ onInquireProject }) => {
  const { media, importFiles } = useMedia();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Before & After Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const filteredProjects = activeCategory === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeCategory);

  const getProjectImage = (project: ProjectItem) => {
    if (project.id === 'proj-1') return media.cleanFinishedSetup;
    if (project.id === 'proj-2') return media.cleanWiring;
    if (project.id === 'proj-3') return media.cleanConnection;
    if (project.id === 'proj-4') return media.luminousBatteries;
    if (project.id === 'proj-5') return media.whatYouNeed;
    if (project.id === 'proj-6') return media.workingWiring;
    if (project.id === 'proj-7') return media.bookedSolarPanels;
    if (project.id === 'proj-8') return media.working2;
    if (project.id === 'proj-9') return media.cctvPole;
    if (project.id === 'proj-10') return media.storefront;
    return project.image;
  };

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential Solar' },
    { id: 'commercial', label: 'Commercial & Corporate' },
    { id: 'farm', label: 'Farms & Ranches' },
    { id: 'cctv', label: '4K CCTV Systems' },
    { id: 'streetlights', label: 'Solar Streetlights' },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offset = clientX - container.left;
    const percentage = Math.max(5, Math.min(95, (offset / container.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="gallery" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            <span>Verified Installations</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">Marvellous Engineering Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proven Field Craftsmanship
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every project below represents a real property now running on autonomous clean solar power and defended by commercial-grade 4K surveillance. Zero monthly bills. Zero cloud fees. 100% turnkey execution.
          </p>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                Interactive Transformation
              </span>
              <h3 className="text-xl font-bold text-white">
                Before & After Kenuch Energy Turnkey Installation
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
              Drag the central divider left & right
            </span>
          </div>

          <div
            className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800"
            onMouseMove={(e) => {
              if (isDragging || e.buttons === 1) handleSliderMove(e);
            }}
            onTouchMove={handleSliderMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            {/* After Image (Full width background) */}
            <div className="absolute inset-0">
              <img
                src={media.after}
                alt="Kenuch Energy Resources Ltd Turnkey Solar Installation - Completed Rooftop Array"
                onError={(e) => {
                  e.currentTarget.src = BUNDLED_IMAGES.after;
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                AFTER: 100% Completed Rooftop Solar Array · Zero Monthly Bills ($0/mo)
              </div>
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={media.before}
                alt="Before Installation - Roof Preparation & Rail Assembly"
                onError={(e) => {
                  e.currentTarget.src = BUNDLED_IMAGES.before;
                }}
                className="w-full h-full object-cover object-center"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-slate-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                BEFORE: Flat Roof Rail Prep & Initial Technician Assembly
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xl">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs & Photo Sync Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-10 border-b border-slate-800/60">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sync Original Photos Option for Client */}
          <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900/90 border border-slate-700/80 text-amber-400 hover:text-white hover:bg-slate-800 hover:border-amber-400/50 cursor-pointer transition-all shadow-sm">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import / Sync Original Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  importFiles(e.target.files);
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Marvellous Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const projectImg = getProjectImage(project);
            return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col shadow-xl"
            >
              {/* Image Preview with Overlay */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={projectImg}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = BUNDLED_IMAGES.storefront;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Quiet Unboxed Category Text */}
                <div className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/20">
                  {project.categoryLabel}
                </div>

                {/* Quick Save Photo Icon */}
                <a
                  href={projectImg}
                  download={`Kenuch-${project.id}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors cursor-pointer"
                  title="Save high-resolution installation photo"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.location}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">{project.clientType}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="pt-3 border-t border-slate-800/70 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {project.specs.solarPower && (
                      <div className="flex items-center gap-1.5 text-slate-300 truncate">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{project.specs.solarPower}</span>
                      </div>
                    )}
                    {project.specs.cctvCount && (
                      <div className="flex items-center gap-1.5 text-slate-300 truncate">
                        <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{project.specs.cctvCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>View Engineering Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Lightbox Specification Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-6 border border-slate-800">
              <img
                src={getProjectImage(selectedProject)}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = BUNDLED_IMAGES.storefront;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{selectedProject.location}</span>
                <span aria-hidden="true">·</span>
                <span>Client: {selectedProject.clientType}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Status: 100% Commissioned</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Engineering Specifications Grid */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Installed Engineering Parameters:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                {Object.entries(selectedProject.specs).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-white text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Turnkey installation with lifetime zero-subscription guarantee.
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getProjectImage(selectedProject)}
                  download={`Kenuch-Energy-${selectedProject.id}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
                  title="Download and save high-resolution installation photo"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Save Image</span>
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white rounded-lg border border-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onInquireProject(title);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                >
                  <span>Inquire About This Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
