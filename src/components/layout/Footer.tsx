"use client";
import { useLanguage } from "../LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="container py-6 mt-auto bg-water">
      <div className="border-t border-water pt-6 text-center text-sm text-hazelnut">
        {t("footer.copyright")}
      </div>
    </footer>
  );
} 