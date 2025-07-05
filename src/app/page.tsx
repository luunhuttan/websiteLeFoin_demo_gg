"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/components/LanguageProvider';
import { useSearchParams } from 'next/navigation';
import ReviewSummary from '@/components/ReviewSummary';

type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
};

type ArticleParsed = {
  id: number;
  title: string;
  content: any;
  createdAt: string;
  authorId?: number;
  tags: string[];
  tagObjs: any[];
};

const categoriesData = [
  { vi: 'Tất cả', en: 'All' },
  { vi: 'Sản phẩm', en: 'Products' },
  { vi: 'Câu chuyện', en: 'Stories' },
  { vi: 'Sống xanh', en: 'Green Living' },
];

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');
  const articlesSectionRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const categories = categoriesData.map(cat => cat[locale]);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [locale]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTags(['Tất cả', ...data.map((t: any) => t.name)]);
        } else {
          setTags(['Tất cả']);
        }
      });
  }, []);

  useEffect(() => {
    // Chỉ xử lý khi đã có danh sách tags
    if (tags.length === 0) return;
    const tagFromQuery = searchParams?.get('tag');
    if (tagFromQuery && tags.includes(tagFromQuery)) {
      setSelectedTag(tagFromQuery);
      setCurrentPage(1);
      setTimeout(() => {
        articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setSelectedTag('Tất cả');
    }
    // eslint-disable-next-line
  }, [searchParams, tags]);

  const parsedArticles: ArticleParsed[] = articles.map(a => {
    let content = {};
    try {
      content = JSON.parse(a.content);
    } catch {}
    // Lấy mảng tag object từ article.tags (fix: tương thích cả 2 kiểu)
    const tagObjs = Array.isArray((a as any).tags)
      ? (a as any).tags.map((at: any) => at.name ? at : at.tag).filter(Boolean)
      : [];
    const tagNames = tagObjs.map((t: { name: string }) => t.name);
    return {
      ...a,
      content,
      tags: tagNames,
      tagObjs,
    };
  });

  const filteredArticles = selectedTag === 'Tất cả'
    ? parsedArticles
    : parsedArticles.filter(a =>
        Array.isArray(a.tags) && a.tags.includes(selectedTag)
      );

  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const featuredArticle = filteredArticles[0];

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  }

  function handleTagClick(tag: string) {
    setSelectedTag(tag);
    setCurrentPage(1);
    setTimeout(() => {
      articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div style={{textAlign:'center',padding:40}}>Đang tải bài viết...</div>;
  if (!featuredArticle) return <div style={{textAlign:'center',padding:40}}>Chưa có bài viết nào.</div>;

  return (
    <>
      <Head>
        <title>{t("home.title")}</title>
        <meta name="description" content={t("home.description")} />
        <meta property="og:title" content={t("home.title")} />
        <meta property="og:description" content={t("home.description")} />
        <meta property="og:image" content="/images/og-lefoin.jpg" />
        <meta property="og:url" content="https://lefoin.vn/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={t("home.title")} />
        <meta name="twitter:description" content={t("home.description")} />
        <meta name="twitter:image" content="/images/og-lefoin.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Featured section */}
      <section className="featured-article">
        <img 
          src={featuredArticle.content?.[locale]?.image || '/images/og-lefoin.jpg'}
          alt={featuredArticle.title}
        />
        <div className="featured-content">
          <span className="category">{featuredArticle.content?.[locale]?.category}</span>
          <h2>{featuredArticle.title.split(' / ')[locale === 'vi' ? 0 : 1]}</h2>
          <p>{featuredArticle.content?.[locale]?.excerpt}</p>
        </div>
      </section>
      {/* End Featured section */}
      <section className="hero">
        <h1>{t("home.hero.title")}</h1>
        <p>{t("home.hero.subtitle")}</p>
        <a href="/articles" className="cta">
          {t("home.hero.cta")}
          <svg viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </section>
      <section className="articles" ref={articlesSectionRef}>
        <h2>{t("home.featured.title")}</h2>
        <div style={{
          textAlign: 'center', marginBottom: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8
        }}>
          {tags.map((tag, idx) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              aria-label={"Lọc bài viết theo tag: " + tag}
              title={tag === 'Tất cả' ? 'Xem tất cả bài viết' : `Xem các bài viết với tag " ${tag} "`}
              style={{
                margin: 0,
                padding: '8px 20px',
                borderRadius: 20,
                border: tag === 'Tất cả' ? 'none' : selectedTag === tag ? 'none' : '1.5px solid #2a7ae4',
                background: selectedTag === tag ? '#2a7ae4' : tag === 'Tất cả' ? '#1976d2' : '#fff',
                color: selectedTag === tag || tag === 'Tất cả' ? '#fff' : '#2a7ae4',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: selectedTag === tag ? '0 2px 8px rgba(42,122,228,0.10)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.18s',
                minWidth: 80,
                outline: selectedTag === tag ? '2px solid #1565c0' : 'none',
                position: 'relative',
              }}
              onMouseOver={e => e.currentTarget.style.background = selectedTag === tag ? '#1565c0' : '#e3f2fd'}
              onMouseOut={e => e.currentTarget.style.background = selectedTag === tag ? '#2a7ae4' : tag === 'Tất cả' ? '#1976d2' : '#fff'}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="articles-list">
          {paginatedArticles.map((art) => (
            <div className="article-card" key={art.id} style={{
              borderRadius: 18,
              background: '#fff',
              boxShadow: '0 2px 12px #eee',
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 380,
              marginBottom: 24
            }}>
              {/* Ảnh bài viết */}
              <img
                src={art.content?.[locale]?.image || '/images/og-lefoin.jpg'}
                alt={art.content?.[locale]?.title || art.title}
                style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
              />
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Tag đầu tiên */}
                {Array.isArray(art.tagObjs) && art.tagObjs.length > 0 && (
                  <span style={{
                    background: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: 12,
                    padding: '2px 12px',
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 8,
                    alignSelf: 'flex-start'
                  }}>
                    {art.tagObjs[0].name}
                  </span>
                )}
                {/* Tiêu đề */}
                <h3
                  style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px 0', color: '#2056c9', cursor: 'pointer' }}
                  onClick={() => window.location.href = `/articles/${art.id}`}
                >
                  {art.content?.[locale]?.title || art.title}
                </h3>
                {/* Mô tả ngắn */}
                <div style={{ color: '#555', marginBottom: 16, flex: 1 }}>{art.content?.[locale]?.excerpt}</div>
                {/* Nút Đọc tiếp */}
                <button
                  onClick={() => window.location.href = `/articles/${art.id}`}
                  style={{
                    background: '#2a7ae4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  Đọc tiếp &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                margin: '0 4px',
                border: 'none',
                borderRadius: 8,
                background: currentPage === 1 ? '#f0f0f0' : '#2a7ae4',
                color: currentPage === 1 ? '#999' : '#fff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s',
              }}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  padding: '8px 16px',
                  margin: '0 4px',
                  border: 'none',
                  borderRadius: 8,
                  background: currentPage === page ? '#2a7ae4' : '#fff',
                  color: currentPage === page ? '#fff' : '#2a7ae4',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  boxShadow: currentPage === page ? '0 2px 8px rgba(42,122,228,0.10)' : 'none',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                margin: '0 4px',
                border: 'none',
                borderRadius: 8,
                background: currentPage === totalPages ? '#f0f0f0' : '#2a7ae4',
                color: currentPage === totalPages ? '#999' : '#fff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s',
              }}
            >
              →
            </button>
          </div>
        )}
      </section>
      {/* Review Summary section */}
      <section className="review-summary" style={{ padding: '60px 20px', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ReviewSummary />
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Đăng ký nhận tin tức</h2>
          <p>Nhận thông tin mới nhất về sản phẩm và bài viết từ Le Foin</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: '300px',
                marginRight: '12px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                background: '#2a7ae4',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
            >
              Đăng ký
            </button>
          </form>
          {newsletterSuccess && (
            <p style={{ color: '#2ecc71', marginTop: '12px' }}>
              Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi tin tức mới nhất đến email của bạn.
            </p>
          )}
        </div>
      </section>
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#2a7ae4',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(42,122,228,0.3)',
            transition: 'all 0.18s',
            zIndex: 1000,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(42,122,228,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(42,122,228,0.3)';
          }}
        >
          ↑
        </button>
      )}
    </>
  );
} 