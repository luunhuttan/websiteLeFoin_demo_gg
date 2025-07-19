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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
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
              className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group whitespace-nowrap ${
                pathname === item.href 
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600 shadow-sm" 
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent hover:border-amber-200"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-base transition-colors duration-200 ${pathname === item.href ? "text-amber-600 dark:text-amber-400" : "text-amber-500 dark:text-amber-400 group-hover:text-amber-600"}`}>
                  {item.icon}
                </span>
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              </span>
              {/* Active indicator */}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <DarkModeButton />
          </div>

          {/* User menu for desktop */}
          {user ? (
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <UserAvatar user={user} size="w-8 h-8" />
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">
                  {user.firstName || user.email?.split('@')[0]}
                </span>
                <svg className="w-4 h-4 text-gray-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <UserAvatar user={user} size="w-12 h-12" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                          {user.firstName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link href="/user/profile" className="flex items-center gap-4 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                      <FaUser className="text-xl text-amber-500" />
                      <span className="font-semibold">Hồ sơ</span>
                    </Link>
                    <Link href="/user/favorites" className="flex items-center gap-4 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                      <FaHeart className="text-xl text-amber-500" />
                      <span className="font-semibold">Yêu thích</span>
                    </Link>
                    <Link href="/user/history" className="flex items-center gap-4 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                      <FaHistory className="text-xl text-amber-500" />
                      <span className="font-semibold">Lịch sử</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-4 px-6 py-3 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                        <FaUserCog className="text-xl" />
                        <span className="font-semibold">Quản trị</span>
                      </Link>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 w-full px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <FaSignOutAlt className="text-xl" />
                      <span className="font-semibold">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors whitespace-nowrap"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            )}
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
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-200 dark:border-gray-700">
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
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors"
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors whitespace-nowrap ${
                      pathname === item.href
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className={`text-lg transition-colors ${pathname === item.href ? "text-amber-600 dark:text-amber-400" : "text-amber-500 dark:text-amber-400"}`}>
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* User section */}
              <div className="px-6 mt-8 pt-6 border-t border-amber-200 dark:border-gray-700">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-6 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-md">
                      <UserAvatar user={user} size="w-12 h-12" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                          {user.firstName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Link href="/user/profile" className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors font-semibold">
                        <FaUser className="text-xl text-amber-500" />
                        <span className="font-semibold">Hồ sơ</span>
                      </Link>
                      <Link href="/user/favorites" className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors font-semibold">
                        <FaHeart className="text-xl text-amber-500" />
                        <span className="font-semibold">Yêu thích</span>
                      </Link>
                      <Link href="/user/history" className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors font-semibold">
                        <FaHistory className="text-xl text-amber-500" />
                        <span className="font-semibold">Lịch sử</span>
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-4 px-6 py-4 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors font-semibold">
                          <FaUserCog className="text-xl" />
                          <span className="font-semibold">Quản trị</span>
                        </Link>
                      )}
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 w-full px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-semibold"
                    >
                      <FaSignOutAlt className="text-xl" />
                      <span className="font-semibold">Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-xl transition-colors font-semibold"
                    >
                      <FaSignInAlt className="text-xl text-amber-500" />
                      <span className="font-semibold">Đăng nhập</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaUser className="text-xl" />
                      <span className="font-bold">Đăng ký</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="px-6 mt-6 pt-6 border-t border-amber-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Cài đặt</span>
                  <div className="flex items-center gap-3">
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