"use client";
import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function AboutPage() {
  const { t } = useLanguage();
  
  // Hero background images
  const heroImages = [
    "/images/orange_farm background ấm áp.jpg",
    "/images/handcream_camcam background ấm áp.jpg",
    "/images/orange_farm background thơ mộng.jpg"
  ];
  
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [sloganIdx, setSloganIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for scroll animations
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const galleryRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Slogan động
  const slogans = [
    { text: t("slogan.1"), color: "#2ecc71", icon: "❤️" },
    { text: t("slogan.2"), color: "#3498db", icon: "🌱" },
    { text: t("slogan.3"), color: "#f39c12", icon: "✨" },
  ];

  // Timeline data
  const timeline = [
    {
      year: "2023",
      event: t("about.timeline.idea"),
      description: t("about.timeline.idea.desc"),
      icon: "💡"
    },
    {
      year: "2023-2024",
      event: t("about.timeline.founded"),
      description: t("about.timeline.founded.desc"),
      icon: "🌱"
    },
    {
      year: "2024",
      event: t("about.timeline.launch"),
      description: t("about.timeline.launch.desc"),
      icon: "🧴"
    },
    {
      year: "2024",
      event: t("about.timeline.customers"),
      description: t("about.timeline.customers.desc"),
      icon: "🤗"
    },
    {
      year: "2024",
      event: t("about.timeline.green"),
      description: t("about.timeline.green.desc"),
      icon: "🌿"
    }
  ];

  // Stats data
  const stats = [
    { number: "2023-2024", label: t("about.stats.founded"), icon: "📅" },
    { number: "3+", label: t("about.stats.products"), icon: "🧴" },
    { number: "100%", label: t("about.stats.natural"), icon: "🌱" },
    { number: "4.9★", label: t("about.stats.rating"), icon: "💬" },
  ];

  // Core values data
  const coreValues = [
    {
      icon: "🌾",
      title: t("about.values.natural"),
      description: t("about.values.natural.desc"),
      color: "#2ecc71"
    },
    {
      icon: "💚",
      title: t("about.values.care"),
      description: t("about.values.care.desc"),
      color: "#27ae60"
    },
    {
      icon: "💡",
      title: t("about.values.innovation"),
      description: t("about.values.innovation.desc"),
      color: "#f39c12"
    },
    {
      icon: "🌏",
      title: t("about.values.responsibility"),
      description: t("about.values.responsibility.desc"),
      color: "#3498db"
    }
  ];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      setTyped(slogans[sloganIdx].text.slice(0, i + 1));
      i++;
      if (i === slogans[sloganIdx].text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [sloganIdx]);

  // Slogan rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIdx((i) => (i + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sloganIdx]);

  // Hero image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Visibility effect
  useEffect(() => {
    setIsVisible(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((i) => (i + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    const refs = [statsRef, missionRef, valuesRef, storyRef, timelineRef, galleryRef, ctaRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{t("about.title")}</title>
        <meta name="description" content={t("about.description")} />
      </Head>
      
      <div className="about-page">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="loading-text">Le Foin</div>
            </div>
          </div>
        )}

        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle particle-1">🌿</div>
          <div className="particle particle-2">✨</div>
          <div className="particle particle-3">💚</div>
          <div className="particle particle-4">🌱</div>
          <div className="particle particle-5">🍃</div>
          <div className="particle particle-6">⭐</div>
        </div>

        {/* Hero Section */}
        <section className="about-hero-section">
          <div className="about-hero-background">
            {heroImages.map((img, idx) => (
              <div
                key={idx}
                className={`about-hero-bg-image ${idx === currentHeroImage ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
          <div className="about-hero-overlay" />
          <div className="about-hero-content">
            <div className="about-hero-logo" style={{marginBottom: 0}}>
              <img
                src="/images/logo-lefoin.png"
                alt="Le Foin Logo"
                className="about-hero-logo-img light-logo"
                style={{width: 260, height: 'auto', margin: '0 auto'}}
              />
              <img
                src="/images/logo-lefoin-darkmode.png"
                alt="Le Foin Logo"
                className="about-hero-logo-img dark-logo"
                style={{width: 260, height: 'auto', margin: '0 auto'}}
              />
            </div>
            <div className="about-hero-slogan">
              <span className="slogan-icon">{slogans[sloganIdx].icon}</span>
              <span className="slogan-text">
                {typed}
                <span className="typewriter-cursor">|</span>
              </span>
            </div>
            <p className="about-hero-description">
              {t("about.hero.description")}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="about-stats-section fade-in">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section ref={missionRef} className="about-mission-section fade-in">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h2>{t("about.vision")}</h2>
                <p>
                  {t("about.vision.description")}
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🌿</div>
                <h2>{t("about.mission")}</h2>
                <p>
                  {t("about.mission.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section ref={valuesRef} className="about-values-section fade-in">
          <div className="container">
            <h2 className="section-title">{t("about.core")}</h2>
            <div className="values-grid">
              {coreValues.map((value, idx) => (
                <div key={idx} className="value-card">
                  <div className="value-icon" style={{ color: value.color }}>
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="about-story-section fade-in">
          <div className="container">
            <div className="story-content">
              <div className="story-text">
                <h2>{t("about.story")}</h2>
                <p>
                  {t("about.story.description1")}
                </p>
                <p>
                  {t("about.story.description2")}
                </p>
              </div>
              <div className="story-image">
                <img src="/images/handcream background cam sành đã add logo.png" alt="Le Foin Story" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="about-timeline-section fade-in">
          <div className="container">
            <h2 className="section-title">{t("about.timeline.title")}</h2>
            <div className="timeline">
              {timeline.map((item, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-content">
                    <div className="timeline-icon">{item.icon}</div>
                    <div className="timeline-year">{item.year}</div>
                    <h3>{item.event}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section ref={galleryRef} className="about-gallery-section fade-in">
          <div className="container">
            <h2 className="section-title">{t("about.gallery.title")}</h2>
            <div className="gallery-slider">
              <div className="gallery-container">
                <img 
                  src="/images/handcream Cam Cam đã add logo chính hãng. Trắng trơn.png" 
                  alt="Le Foin Products" 
                  className={`gallery-image ${slide === 0 ? 'active' : ''}`}
                />
                <img 
                  src="/images/handcream background làm việc.jpg" 
                  alt="Le Foin Lifestyle" 
                  className={`gallery-image ${slide === 1 ? 'active' : ''}`}
                />
                <img 
                  src="/images/orange_farm trên kệ.jpg" 
                  alt="Le Foin Farm" 
                  className={`gallery-image ${slide === 2 ? 'active' : ''}`}
                />
              </div>
              <div className="gallery-dots">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    className={`gallery-dot ${slide === idx ? 'active' : ''}`}
                    onClick={() => setSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="about-cta-section fade-in">
          <div className="container">
            <div className="cta-content">
              <h2>{t("about.cta.title")}</h2>
              <p>
                {t("about.cta.description")}
              </p>
              <div className="cta-buttons">
                <a href="/shop" className="cta-button primary">
                  {t("about.cta.explore")}
                </a>
                <a href="/contact" className="cta-button secondary">
                  {t("about.cta.contact")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Logo động ở cuối trang */}
        <div className="about-footer-logo" style={{width: '100%', textAlign: 'center', margin: '48px 0 0 0'}}>
          <img
            src="/images/logo-lefoin.png"
            alt="Le Foin Logo"
            className="about-footer-logo-img light-logo"
            style={{width: 120, height: 'auto', filter: 'drop-shadow(0 4px 16px rgba(42,122,228,0.18))', transition: 'filter 0.3s'}}
          />
          <img
            src="/images/logo-lefoin-darkmode.png"
            alt="Le Foin Logo"
            className="about-footer-logo-img dark-logo"
            style={{width: 120, height: 'auto', filter: 'drop-shadow(0 4px 16px rgba(42,122,228,0.18))', transition: 'filter 0.3s'}}
          />
        </div>
      </div>
    </>
  );
} 