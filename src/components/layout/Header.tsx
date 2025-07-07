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
    { name: t("menu.home"), href: "/" },
    { name: t("menu.articles"), href: "/articles" },
    { name: t("menu.shop"), href: "/shop" },
    { name: t("menu.about"), href: "/about" },
    { name: t("menu.contact"), href: "/contact" },
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
        {/* Logo căn giữa trên mobile, trái trên desktop */}
        <div className="flex-none flex items-center min-w-[100px] md:min-w-[120px]">
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
        {/* Menu giữa */}
        <nav className="hidden md:flex items-center gap-x-8 flex-1 justify-center">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-5 py-2 rounded-lg transition-all duration-150 font-semibold whitespace-nowrap text-base tracking-wide
                ${pathname === item.href ? "bg-amber text-white shadow font-bold" : "text-leaf hover:bg-amber/10 hover:text-amber"}
              `}
              style={{ textAlign: 'center', letterSpacing: 0.2 }}
            >
              {item.name}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link
              href="/admin/articles"
              className={`px-5 py-2 rounded-lg transition-all duration-150 font-semibold whitespace-nowrap text-base tracking-wide border border-amber/60
                ${pathname?.startsWith('/admin/articles') ? "bg-amber text-white shadow font-bold" : "text-amber hover:bg-amber/10 hover:text-amber bg-amber/10"}
              `}
              style={{ textAlign: 'center', letterSpacing: 0.2 }}
            >
              Quản lý
            </Link>
          )}
        </nav>
        {/* Nút bên phải */}
        <div className="flex-none flex items-center gap-2 md:gap-4 min-w-[100px] md:min-w-[120px] justify-end">
          <LanguageSwitcher />
          <DarkModeButton />
          {user && user.email ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2 py-2 rounded-lg text-leaf hover:bg-amber/10 hover:text-amber transition-all duration-150"
              >
                <div className="w-9 h-9 bg-amber rounded-full flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber"
                  />
                </div>
                <span className="hidden sm:block font-medium max-w-[100px] truncate">
                  {user.firstName || user.email}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium">{user.firstName} {user.lastName}</div>
                    <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                  {user.role === 'admin' && (
                    <>
                      <Link
                        href="/admin/articles"
                        className="block px-4 py-2 text-sm text-amber font-semibold hover:bg-amber/10"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Quản lý bài viết
                      </Link>
                      <Link
                        href="/admin/reviews"
                        className="block px-4 py-2 text-sm text-amber font-semibold hover:bg-amber/10"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Quản lý đánh giá
                      </Link>
                    </>
                  )}
                  {user.role === 'user' && (
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 text-sm text-leaf font-semibold hover:bg-amber/10"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Trang cá nhân
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <AuthButtons />
          )}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-leaf hover:text-amber"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {!isMobileMenuOpen ? (
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-water bg-water/95 dark:bg-gray-900/95 relative animate-slide-down">
          <div className="header-gradient w-full h-full absolute inset-0 pointer-events-none"></div>
          <nav className="container py-4 relative flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link text-leaf hover:text-amber px-4 py-2 rounded-lg font-semibold text-base ${pathname === item.href ? "bg-amber text-white" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <>
                <Link
                  href="/admin/articles"
                  className="mobile-nav-link text-amber font-bold px-4 py-2 rounded-lg bg-amber/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quản lý bài viết
                </Link>
                <Link
                  href="/admin/reviews"
                  className="mobile-nav-link text-amber font-bold px-4 py-2 rounded-lg bg-amber/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quản lý đánh giá
                </Link>
              </>
            )}
            {user?.role === 'user' && (
              <Link
                href="/user/profile"
                className="mobile-nav-link text-leaf font-bold px-4 py-2 rounded-lg bg-amber/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trang cá nhân
              </Link>
            )}
            {user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                  <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link text-red-600 dark:text-red-400 px-4 py-2 rounded-lg"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 