"use client";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";

const locales = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" }
];

export default function LanguageSwitcher() {
  const { locale, setLocale, isLoading } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = async (newLocale: string) => {
    if (newLocale === locale || isChanging) return;
    
    setIsChanging(true);
    setLocale(newLocale as 'vi' | 'en');
    
    // Add a small delay to show the transition
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="flex items-center space-x-1 relative">
      {locales.map(l => (
        <button
          key={l.code}
          onClick={() => handleChange(l.code)}
          disabled={isChanging || isLoading}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 border border-leaf relative
            ${locale === l.code 
              ? "bg-amber text-white shadow-md transform scale-105" 
              : "bg-water hover:bg-lightTeal text-leaf hover:scale-105"
            }
            ${isChanging || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          aria-current={locale === l.code ? "true" : undefined}
        >
          {l.label}
          {isChanging && locale === l.code && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border border-leaf border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
} 