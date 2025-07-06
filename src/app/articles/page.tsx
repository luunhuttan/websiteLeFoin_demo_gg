"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/components/LanguageProvider';
import { useRouter } from 'next/navigation';

type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
  tags?: { tag: { name: string } }[];
};

type ArticleParsed = {
  id: number;
  title: string;
  content: any;
  createdAt: string;
  authorId?: number;
  tags: { name: string }[];
};

export const dynamic = 'force-dynamic';

export default function ArticlesPage() {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        console.log('API /api/articles data:', data);
        setArticles(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then((data: any[]) => setAllTags(data.map(t => t.name)));
  }, []);

  const parsedArticles: ArticleParsed[] = articles.map(a => {
    let content = {};
    try {
      content = JSON.parse(a.content);
    } catch {}
    const tags = Array.isArray(a.tags)
      ? a.tags.map((t: any) => t.name ? { name: t.name } : t)
      : [];
    return {
      ...a,
      content,
      tags,
    };
  });

  const filteredArticles = selectedTag === 'Tất cả'
    ? parsedArticles
    : parsedArticles.filter(a => Array.isArray(a.tags) && a.tags.some((t: any) => t.name.trim().toLowerCase() === selectedTag.trim().toLowerCase()));

  if (loading) return <div style={{textAlign:'center',padding:40}}>Đang tải bài viết...</div>;
  if (!parsedArticles.length) return <div style={{textAlign:'center',padding:40}}>Chưa có bài viết nào.</div>;

  return (
    <>
      <Head>
        <title>{t("articles.title")}</title>
        <meta name="description" content={t("articles.description")} />
      </Head>
      <div>
        <h1>{t("articles.heading")}</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          {/* Filter tags */}
          <div style={{ display: 'flex', gap: 12 }}>
            {['Tất cả', ...allTags].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '8px 22px',
                  borderRadius: 999,
                  border: '2px solid #2a7ae4',
                  background: selectedTag === tag ? '#2a7ae4' : '#fff',
                  color: selectedTag === tag ? '#fff' : '#2a7ae4',
                  fontWeight: 600,
                  fontSize: 15,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: 80
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Nút truy cập nhanh */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => router.push('/user/favorites')}
              style={{
                background: '#E5873E',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px #f3e0d0',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#d17a36';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#E5873E';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:4}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              Bài viết yêu thích
            </button>
            <button
              onClick={() => router.push('/user/history')}
              style={{
                background: '#48664E',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 20px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px #d9e4e2',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#3d523e';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#48664E';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight:4}}><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Lịch sử xem
            </button>
          </div>
        </div>
        <div className="articles-list">
          {filteredArticles.map(art => {
            const lang = art.content[locale] ? locale : 'vi';
            const artContent = art.content[lang] || {};
            return (
              <div
                className="article-card"
                key={art.id}
                style={{ cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s', boxShadow: '0 2px 8px #eee', borderRadius: 16, background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320 }}
              >
                <div style={{ marginBottom: 8 }}>
                  {art.tags && art.tags.length > 0 && (
                    <span style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>
                      {art.tags[0].name}
                    </span>
                  )}
                </div>
                <h3
                  style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px 0', color: '#2056c9', cursor: 'pointer' }}
                  onClick={() => router.push(`/articles/${art.id}`)}
                >
                  {artContent.title || art.title}
                </h3>
                <div style={{ color: '#555', marginBottom: 16 }}>{artContent.excerpt}</div>
                <button
                  onClick={() => router.push(`/articles/${art.id}`)}
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
            );
          })}
        </div>
      </div>
    </>
  );
} 