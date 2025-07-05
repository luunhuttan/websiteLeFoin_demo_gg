"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export const DarkModeContext = createContext({ dark: false, toggleDark: () => {} });

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('dark-mode') : null;
    if (saved === '1') {
      setDark(true);
      document.body.classList.add('dark');
    }
  }, []);
  const toggleDark = () => {
    setDark(d => {
      if (!d) {
        document.body.classList.add('dark');
        localStorage.setItem('dark-mode', '1');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('dark-mode', '0');
      }
      return !d;
    });
  };
  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
} 