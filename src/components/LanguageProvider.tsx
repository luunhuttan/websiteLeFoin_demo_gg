"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'vi' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import messages
const messages = {
  vi: () => import('@/messages/vi.json').then(module => module.default),
  en: () => import('@/messages/en.json').then(module => module.default)
};

// Preload translations
const preloadedTranslations: Record<Locale, Record<string, string> | null> = {
  vi: null,
  en: null
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    const loadTranslations = async () => {
      if (!isClient) return;
      
      setIsLoading(true);
      try {
        // Check if translations are already preloaded
        if (preloadedTranslations[locale]) {
          setTranslations(preloadedTranslations[locale]!);
          setIsLoading(false);
          return;
        }

        const messagesModule = await messages[locale]();
        preloadedTranslations[locale] = messagesModule;
        setTranslations(messagesModule);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale, isClient]);

  // Load initial locale from localStorage
  useEffect(() => {
    if (isClient) {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'vi' || savedLocale === 'en')) {
        setLocaleState(savedLocale);
      }
    }
  }, [isClient]);

  // Preload all translations on mount
  useEffect(() => {
    if (isClient) {
      const preloadAll = async () => {
        try {
          const [viTranslations, enTranslations] = await Promise.all([
            messages.vi(),
            messages.en()
          ]);
          preloadedTranslations.vi = viTranslations;
          preloadedTranslations.en = enTranslations;
        } catch (error) {
          console.error('Failed to preload translations:', error);
        }
      };
      preloadAll();
    }
  }, [isClient]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isClient) {
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key: string): string => {
    if (!isClient || isLoading) {
      // Return key as fallback while loading or during SSR
      return key;
    }
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 