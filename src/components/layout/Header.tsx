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
        {/* Nút đổi ngôn ngữ và darkmode ngoài header ngang */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#23272f] p-2 flex items-center justify-center"><LanguageSwitcher /></div>
          <div className="rounded-full bg-[#23272f] p-2 flex items-center justify-center"><DarkModeButton /></div>
        </div>
        {/* Ẩn toàn bộ menu ngang, avatar, nút phụ trên desktop */}
      </div>
      {/* Sidebar/drawer menu trái */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex h-full min-h-screen">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 transition-opacity h-full min-h-screen animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
          {/* Sidebar modern style */}
          <aside className="fixed left-0 top-0 h-full min-h-screen w-60 max-w-full bg-[#181A20] text-gray-100 flex flex-col p-0 select-none z-[10000] overflow-x-hidden rounded-r-2xl shadow-2xl transition-transform duration-300 ease-in-out animate-slide-in-left">
            {/* Logo + Close */}
            <div className="flex items-center h-16 px-4 border-b border-gray-800 flex-shrink-0">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src={"/images/logo-lefoin-darkmode.png"} alt="LeFoin Logo" width={90} height={28} className="h-7 w-auto" />
              </Link>
              <button className="ml-auto p-2 text-gray-400 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)} aria-label="Đóng menu">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Menu chính */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-0 py-1 flex flex-col gap-0">
              {[navigation[0], navigation[2], navigation[1], navigation[3], navigation[4]].map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-0.5 rounded-lg font-medium text-[15px] transition-all duration-150 ${pathname === item.href ? "bg-[#23272f] text-amber-400 font-bold" : "hover:bg-[#23272f] hover:text-amber-400 group"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={`text-xl w-7 flex-shrink-0 flex items-center justify-center transition-all duration-150 ${pathname === item.href ? "text-amber-500" : "text-gray-300 group-hover:text-amber-400"}`}>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              {/* Quản lý (admin) */}
              {user?.role === 'admin' && (
                <Link
                  href="/admin/articles"
                  className="flex items-center gap-4 px-6 py-2 rounded-lg font-medium text-base bg-[#23272f] text-amber-400 font-bold mt-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl w-7 flex-shrink-0 flex items-center justify-center text-amber-500">{<FaUserCog />}</span>
                  Quản lý
                </Link>
              )}
            </nav>
            {/* Phần chức năng cuối sidebar */}
            <div className="flex flex-col gap-0 px-3 py-2 border-t border-gray-700 flex-shrink-0 bg-[#181A20] mt-1">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-amber" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-amber-400 text-base truncate">{user.firstName || user.email}</div>
                      <div className="text-gray-400 text-xs truncate">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-0 py-3 rounded-lg font-medium text-base hover:bg-[#23272f] hover:text-red-400 text-red-400 transition-all mb-2"><FaSignOutAlt />Đăng xuất</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-2 w-full px-0 py-2 rounded-lg font-medium text-[15px] hover:bg-[#23272f] hover:text-amber-400 transition-all mb-0.5"><FaSignInAlt />Đăng nhập</Link>
                  <Link href="/register" className="flex items-center gap-2 w-full px-0 py-2 rounded-lg font-medium text-[15px] hover:bg-[#23272f] hover:text-amber-400 transition-all"><FaUser />Đăng ký</Link>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
} 