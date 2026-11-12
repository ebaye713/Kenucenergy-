export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  image: string;
  badgeText: string;
  stats: { label: string; value: string }[];
}

export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'farm' | 'cctv' | 'streetlights';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  image: string;
  specs: {
    solarPower?: string;
    batteryStorage?: string;
    inverterRating?: string;
    cctvCount?: string;
    cctvResolution?: string;
    illuminationArea?: string;
    backupDuration?: string;
  };
  description: string;
  tags: string[];
  clientType: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  image: string;
  equipmentIncluded: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  rating: number;
  installedSystem: string;
  annualSavings: string;
  avatarUrl: string;
}

export interface SystemConfig {
  propertyType: 'home' | 'office' | 'company' | 'farm' | 'street';
  primaryLoad: 'standard' | 'heavy_cooling' | 'cold_storage' | 'pumping' | 'continuous_commercial';
  cctvRequirement: 'none' | '4_cameras' | '8_cameras' | '16_cameras' | 'solar_perimeter';
  backupRequirement: 'day_peak' | 'overnight_essential' | 'full_247_offgrid';
}

export interface SystemEstimate {
  inverterCapacity: string;
  batteryStorage: string;
  solarPanels: string;
  cctvSystem: string;
  estimatedTurnkeyRange: string;
  dailySolarGeneration: string;
  monthlySubscriptionCost: string; // "$0 Forever"
  recommendationNote: string;
}

export type FaqCategory = 'all' | 'timeframes' | 'maintenance' | 'warranty' | 'zero_bill';

export interface FaqItem {
  id: string;
  category: 'timeframes' | 'maintenance' | 'warranty' | 'zero_bill';
  categoryLabel: string;
  question: string;
  answer: string;
  keyTakeaway?: string;
}
