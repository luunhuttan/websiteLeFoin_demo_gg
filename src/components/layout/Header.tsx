"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useContext, useRef, useEffect } from "react";
import DarkModeButton from "../DarkModeButton";
import AuthButtons from "../AuthButtons";
import LanguageSwitcher from "../LanguageSwitcher";
import { DarkModeContext } from "../DarkModeProvider";
import { useLanguage } from "../LanguageProvider";
import { useSession, signOut } from "next-auth/react";

import { useTheme } from 'next-themes';
import { FaHome, FaBookOpen, FaStore, FaInfoCircle, FaEnvelope, FaUserCog, FaUser, FaSignInAlt, FaSignOutAlt, FaMoon, FaSun, FaLanguage } from 'react-icons/fa';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { dark } = useContext(DarkModeContext);
  const { t } = useLanguage();
  const { data: session } = useSession();
  const user = session?.user;
  const overlayRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Navigation items with translations
  const navigation = [
    { name: t("menu.home"), href: "/", icon: <FaHome /> },
    { name: t("menu.articles"), href: "/articles", icon: <FaBookOpen /> },
    { name: t("menu.shop"), href: "/shop", icon: <FaStore /> },
    { name: t("menu.about"), href: "/about", icon: <FaInfoCircle /> },
    { name: t("menu.contact"), href: "/contact", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);



  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hiệu ứng fade overlay khi đổi theme
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
      setTimeout(() => {
        overlayRef.current && (overlayRef.current.style.opacity = "0");
      }, 500);
    }
  }, [dark]);

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  const avatarUrl = (user && (user as any).avatar) ? `${(user as any).avatar}?v=${Date.now()}` : user?.image ? user.image : '/images/avatar-default.png';

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-water shadow-md bg-white/90 dark:bg-gray-900/90 backdrop-blur">
      <div className="header-gradient w-full h-full absolute inset-0 pointer-events-none"></div>
      <div ref={overlayRef} className={`header-fade-overlay ${dark ? "dark" : "light"}`}></div>
      <div className="container container-header flex h-16 items-center justify-between relative px-2 md:px-6 lg:px-10 xl:px-16">
        {/* Logo trái, nút menu trái */}
        <div className="flex items-center gap-2 flex-1">
          <button
            className="p-2 text-leaf hover:text-amber focus:outline-none focus:ring-2 focus:ring-amber rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Mở menu"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="flex items-center pl-0 ml-0">
            <Image 
              src={dark ? "/images/logo-lefoin-darkmode.png" : "/images/logo-lefoin.png"}
              alt="LeFoin Logo" 
              width={120} 
              height={40} 
              className="logo-lefoin h-10 w-auto mx-auto md:mx-0"
              priority
              style={{ objectFit: 'contain', height: 40, width: 120, maxWidth: 120 }}
            />
          </Link>
        </div>
        {/* Ẩn toàn bộ menu ngang, avatar, nút phụ trên desktop */}
      </div>
      {/* Sidebar/drawer menu trái */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          {/* Sidebar */}
          <aside className="w-80 max-w-full h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col p-0 animate-slide-left relative">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src={dark ? "/images/logo-lefoin-darkmode.png" : "/images/logo-lefoin.png"} alt="LeFoin Logo" width={100} height={32} className="h-8 w-auto" />
              </Link>
              <button className="p-2" onClick={() => setIsMobileMenuOpen(false)} aria-label="Đóng menu">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* User info hoặc đăng nhập/đăng ký */}
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex flex-col items-center gap-2">
              {!user ? (
                <>
                  <a href="/login" className="w-full text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow hover:from-blue-700 hover:to-blue-500 text-lg mb-2 flex items-center justify-center gap-2"><FaSignInAlt /> Đăng nhập</a>
                  <a href="/register" className="w-full text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-400 shadow hover:from-amber-600 hover:to-yellow-500 text-lg flex items-center justify-center gap-2"><FaUser /> Đăng ký</a>
                </>
              ) : (
                <>
                  <img src={avatarUrl} alt="avatar" className="w-14 h-14 rounded-full object-cover border-2 border-amber mb-1" />
                  <div className="font-bold text-leaf dark:text-amber text-lg">{user.firstName || user.email}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">{user.email}</div>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold flex items-center gap-2"><FaSignOutAlt /> Đăng xuất</button>
                </>
              )}
            </div>
            {/* Menu chính */}
            <nav className="flex flex-col gap-1 px-2 py-4 flex-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-base transition-all ${pathname === item.href ? "bg-amber text-white" : "text-leaf hover:bg-amber/10 hover:text-amber"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl w-7 flex-shrink-0 flex items-center justify-center">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link
                  href="/admin/articles"
                  className="flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-base bg-amber/10 text-amber"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl w-7 flex-shrink-0 flex items-center justify-center"><FaUserCog /></span>
                  Quản lý
                </Link>
              )}
            </nav>
            {/* Đổi theme/ngôn ngữ */}
            <div className="flex gap-3 justify-center px-6 py-4 border-t border-gray-200 dark:border-gray-800">
              <LanguageSwitcher />
              <DarkModeButton />
            </div>
          </aside>
        </div>
      )}
    </header>
  );
} 