"use client";
import { useLanguage } from "./LanguageProvider";
import { useEffect } from "react";

export default function DynamicHtmlLang() {
  const { locale } = useLanguage();

  useEffect(() => {
    // Update the html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
} 