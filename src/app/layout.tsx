import './globals.css';
import { ReactNode } from 'react';
import { Header } from "@/components/layout/Header";
import DarkModeProvider from "@/components/DarkModeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Footer from "@/components/layout/Footer";
import DynamicHtmlLang from "@/components/DynamicHtmlLang";
import SessionProvider from "@/components/SessionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata = {
  title: 'Le Foin - Modern Blog',
  description: 'A modern blog built with Next.js and CSS thuần',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        {/* Gradient blobs background for both light and dark mode */}
        <div aria-hidden="true">
          {/* Light mode blobs */}
          <div className="fixed top-[-120px] left-[-120px] w-[340px] h-[340px] rounded-full bg-amber opacity-20 blur-3xl pointer-events-none z-0 dark:hidden" />
          <div className="fixed bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-goldenSand opacity-15 blur-3xl pointer-events-none z-0 dark:hidden" />
          <div className="fixed top-[30%] right-[-100px] w-[220px] h-[220px] rounded-full bg-lightTeal opacity-10 blur-2xl pointer-events-none z-0 dark:hidden" />
          {/* Dark mode blobs */}
          <div className="fixed top-[-120px] left-[-120px] w-[340px] h-[340px] rounded-full bg-lightTeal opacity-10 blur-3xl pointer-events-none z-0 hidden dark:block" />
          <div className="fixed bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-amber opacity-10 blur-3xl pointer-events-none z-0 hidden dark:block" />
          <div className="fixed top-[30%] right-[-100px] w-[220px] h-[220px] rounded-full bg-water opacity-8 blur-2xl pointer-events-none z-0 hidden dark:block" />
        </div>
        <SessionProvider>
          <LanguageProvider>
            <DynamicHtmlLang />
            <DarkModeProvider>
              <div className="website-gradient"></div>
              <div className="relative min-h-screen">
                <Header />
                <main className="container py-8 mt-16">{children}</main>
                <Footer />
              </div>
            </DarkModeProvider>
          </LanguageProvider>
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
} 