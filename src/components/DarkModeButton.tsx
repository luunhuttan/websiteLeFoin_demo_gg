"use client";
import { useContext, useState } from 'react';
import { DarkModeContext } from './DarkModeProvider';
import { useLanguage } from './LanguageProvider';

export default function DarkModeButton() {
  const { dark, toggleDark } = useContext(DarkModeContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();

  const handleClick = () => {
    setIsAnimating(true);
    toggleDark();
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={t("theme.toggle")}
      style={{
        marginLeft: 18,
        background: dark ? '#222' : '#eaf6ff',
        color: dark ? '#fffbe6' : '#2a7ae4',
        border: 'none',
        borderRadius: 18,
        padding: '7px 16px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(42,122,228,0.08)',
        transition: 'background 0.35s, color 0.35s, box-shadow 0.22s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span
        className={`dm-icon-anim${isAnimating ? ' anim' : ''}`}
        style={{ display: 'inline-block', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {dark ? '🌙' : '☀️'}
      </span>
      {dark ? t("theme.dark") : t("theme.light")}
    </button>
  );
} 