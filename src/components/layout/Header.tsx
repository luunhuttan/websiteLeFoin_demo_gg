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
import { 
  FaHome, 
  FaBookOpen, 
  FaStore, 
  FaInfoCircle, 
  FaEnvelope, 
  FaUserCog, 
  FaUser, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaMoon, 
  FaSun, 
  FaLanguage,
  FaBars,
  FaTimes,
  FaHeart,
  FaHistory,
  FaCog
} from 'react-icons/fa';

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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

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

  // Avatar component với fallback tốt hơn
  const UserAvatar = ({ user, size = "w-8 h-8" }: { user: any, size?: string }) => {
    const avatarSrc = user?.avatar || user?.image;
    const displayName = user?.firstName || user?.email?.split('@')[0] || 'U';
    
    if (avatarSrc) {
      return (
        <img 
          src={avatarSrc} 
          alt="avatar" 
          className={`${size} rounded-full object-cover border-2 border-amber-200`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    
    return (
      <div className={`${size} rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm border-2 border-amber-200`}>
        {displayName.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-water shadow-md bg-white/90 dark:bg-gray-900/90 backdrop-blur">
      <div className="header-gradient w-full h-full absolute inset-0 pointer-events-none"></div>
      <div ref={overlayRef} className={`header-fade-overlay ${dark ? "dark" : "light"}`}></div>
      
      <div className="container container-header flex h-16 items-center justify-between relative px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src={dark ? "/images/logo-lefoin-darkmode.png" : "/images/logo-lefoin.png"}
            alt="LeFoin Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
            priority
            style={{ objectFit: 'contain', height: 40, width: 120, maxWidth: 120 }}
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-5 py-2.5 rounded-lg font-semibold text-base transition-all duration-200 group ${
                pathname === item.href 
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600 shadow-sm" 
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent hover:border-amber-200"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className={`text-lg transition-colors duration-200 ${pathname === item.href ? "text-amber-600 dark:text-amber-400" : "text-amber-500 dark:text-amber-400 group-hover:text-amber-600"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </span>
              {/* Active indicator */}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* User menu for desktop */}
          {user ? (
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <UserAvatar user={user} />
                <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
                  {user.firstName || user.email?.split('@')[0]}
                </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="w-10 h-10" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {user.firstName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link href="/user/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaUser className="text-lg" />
                      Hồ sơ
                    </Link>
                    <Link href="/user/favorites" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaHeart className="text-lg" />
                      Yêu thích
                    </Link>
                    <Link href="/user/history" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <FaHistory className="text-lg" />
                      Lịch sử
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                        <FaUserCog className="text-lg" />
                        Quản trị
                      </Link>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <FaSignOutAlt className="text-lg" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Dark Mode Toggle */}
          <div className="hidden sm:block">
            <DarkModeButton />
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile menu panel */}
          <div 
            ref={mobileMenuRef}
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image 
                  src={dark ? "/images/logo-lefoin-darkmode.png" : "/images/logo-lefoin.png"}
                  alt="LeFoin Logo" 
                  width={100} 
                  height={32} 
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="px-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors ${
                      pathname === item.href
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className={`text-lg transition-colors ${pathname === item.href ? "text-amber-600 dark:text-amber-400" : "text-amber-500 dark:text-amber-400"}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* User section */}
              <div className="px-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <UserAvatar user={user} size="w-12 h-12" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {user.firstName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link href="/user/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                        <FaUser className="text-lg" />
                        Hồ sơ
                      </Link>
                      <Link href="/user/favorites" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                        <FaHeart className="text-lg" />
                        Yêu thích
                      </Link>
                      <Link href="/user/history" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                        <FaHistory className="text-lg" />
                        Lịch sử
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg transition-colors font-medium">
                          <FaUserCog className="text-lg" />
                          Quản trị
                        </Link>
                      )}
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium"
                    >
                      <FaSignOutAlt className="text-lg" />
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FaSignInAlt className="text-lg" />
                      Đăng nhập
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                    >
                      <FaUser className="text-lg" />
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="px-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Cài đặt</span>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <DarkModeButton />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 