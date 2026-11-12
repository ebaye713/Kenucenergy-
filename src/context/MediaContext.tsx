import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUNDLED_IMAGES } from '../assets/media';

// Registry of user photos mapped to site slots
export interface MediaRegistry {
  before: string;
  after: string;
  working: string;
  working2: string;
  whatYouNeed: string;
  cleanConnection: string;
  workingWiring: string;
  luminousBatteries: string;
  cleanWiring: string;
  cleanFinishedSetup: string;
  bookedSolarPanels: string;
  cctvPole: string;
  storefront: string;
}

const DEFAULT_MEDIA: MediaRegistry = { ...BUNDLED_IMAGES };

interface MediaContextType {
  media: MediaRegistry;
  updateImage: (key: keyof MediaRegistry, dataUrl: string) => void;
  importFiles: (files: FileList | File[]) => void;
  hasCustomImages: boolean;
  resetToDefaults: () => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [media, setMedia] = useState<MediaRegistry>(DEFAULT_MEDIA);
  const [hasCustomImages, setHasCustomImages] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kenuch_custom_media');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only load if it contains real user base64 uploads
        const hasBase64 = Object.values(parsed).some((val) => typeof val === 'string' && val.startsWith('data:image/'));
        if (hasBase64) {
          setMedia((prev) => ({ ...prev, ...parsed }));
          setHasCustomImages(true);
        } else {
          localStorage.removeItem('kenuch_custom_media');
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const updateImage = (key: keyof MediaRegistry, dataUrl: string) => {
    setMedia((prev) => {
      const updated = { ...prev, [key]: dataUrl };
      try {
        localStorage.setItem('kenuch_custom_media', JSON.stringify(updated));
      } catch {
        // quota exceeded
      }
      return updated;
    });
    setHasCustomImages(true);
  };

  const importFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const name = file.name.toLowerCase();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) return;

        if (name.includes('before')) updateImage('before', result);
        else if (name.includes('after')) updateImage('after', result);
        else if (name.includes('working 2') || name.includes('working2')) updateImage('working2', result);
        else if (name.includes('working in wiring')) updateImage('workingWiring', result);
        else if (name.includes('working')) updateImage('working', result);
        else if (name.includes("what you'll need") || name.includes('what you')) updateImage('whatYouNeed', result);
        else if (name.includes('clean connection')) updateImage('cleanConnection', result);
        else if (name.includes('clean wiring')) updateImage('cleanWiring', result);
        else if (name.includes('clean and finished') || name.includes('finished setup')) updateImage('cleanFinishedSetup', result);
        else if (name.includes('luminous')) updateImage('luminousBatteries', result);
        else if (name.includes('booked') || name.includes('solar pannels') || name.includes('panels')) updateImage('bookedSolarPanels', result);
        else if (name.includes('wa0043') || name.includes('cctv') || name.includes('pole')) updateImage('cctvPole', result);
        else if (name.includes('wa0008') || name.includes('signboard') || name.includes('store')) updateImage('storefront', result);
      };

      reader.readAsDataURL(file);
    });
  };

  const resetToDefaults = () => {
    localStorage.removeItem('kenuch_custom_media');
    setMedia(DEFAULT_MEDIA);
    setHasCustomImages(false);
  };

  return (
    <MediaContext.Provider value={{ media, updateImage, importFiles, hasCustomImages, resetToDefaults }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
