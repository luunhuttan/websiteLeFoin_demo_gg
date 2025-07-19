"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { useRouter } from 'next/navigation';

// Kiểu dữ liệu bài viết từ API
type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
  tags?: { tag: { name: string } }[];
  image?: string;
};

type ArticleParsed = {
  id: number;
  title: string;
  content: any;
  createdAt: string;
  authorId?: number;
  tags: { name: string }[];
  image?: string;
};

// Hàm parse dữ liệu bài viết
function parseArticle(a: Article): ArticleParsed {
  let content: any = {};
  try { content = JSON.parse(a.content); } catch {}
  const tags = Array.isArray(a.tags)
    ? a.tags.map((t: any) => t.name ? { name: t.name } : t)
    : [];
  return { ...a, content, tags };
}

// Component hiển thị 1 bài viết
function ArticleCard({ art, locale, onClick }: { art: ArticleParsed, locale: string, onClick: () => void }) {
  const lang = art.content[locale] ? locale : 'vi';
  const artContent = art.content[lang] || {};
  // Lấy url ảnh từ database trước, sau đó từ content, cuối cùng là fallback
  const imageUrl = art.image || artContent.image || '/images/1751360257771-Cam_banner_Le_Foin_logo.png';
  return (
    <div
      className="article-card"
      style={{ cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s', boxShadow: '0 2px 8px #eee', borderRadius: 16, background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320 }}
    >
      {/* Hiển thị ảnh nếu có */}
      <div style={{ position: 'relative', width: '100%', height: 160, marginBottom: 8, borderRadius: 12, overflow: 'hidden', background: '#f5f5f5' }}>
        <Image
          src={imageUrl}
          alt={artContent.title || art.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/1751360257771-Cam_banner_Le_Foin_logo.png';
          }}
          priority={false}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        {art.tags && art.tags.length > 0 && (
          <span style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>
            {art.tags[0].name}
          </span>
        )}
      </div>
      <h3
        style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 4px 0', color: '#2056c9', cursor: 'pointer' }}
        onClick={onClick}
      >
        {artContent.title || art.title}
      </h3>
      <div style={{ color: '#555', marginBottom: 16 }}>{artContent.excerpt}</div>
      <button
        onClick={onClick}
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
}

export const dynamic = 'force-dynamic';

export default function ArticlesPage() {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch song song articles và tags
  useEffect(() => {
    Promise.all([
      fetch('/api/articles').then(res => res.json()),
      fetch('/api/tags').then(res => res.json())
    ]).then(([articlesData, tagsData]) => {
      setArticles(articlesData);
      setAllTags(tagsData.map((t: any) => t.name));
      setLoading(false);
    });
  }, []);

  const articlesParsed: ArticleParsed[] = articles.map(parseArticle);
  const filteredArticles = selectedTag === 'Tất cả'
    ? articlesParsed
    : articlesParsed.filter(a => Array.isArray(a.tags) && a.tags.some((t: any) => t.name.trim().toLowerCase() === selectedTag.trim().toLowerCase()));

  if (loading) return <div style={{textAlign:'center',padding:40}}>Đang tải bài viết...</div>;
  if (!articlesParsed.length) return <div style={{textAlign:'center',padding:40}}>Chưa có bài viết nào.</div>;

  return (
    <>
      <Head>
        <title>{t("articles.title")}</title>
        <meta name="description" content={t("articles.description")}/>
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: '1.5px solid #2a7ae4',
                  background: selectedTag === tag ? '#2a7ae4' : '#fff',
                  color: selectedTag === tag ? '#fff' : '#2a7ae4',
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1.35,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: 110,
                  minHeight: 48,
                  maxWidth: 140,
                  textAlign: 'center',
                  boxShadow: selectedTag === tag ? '0 2px 8px #dbeafe' : '0 1px 4px #e3f0fd',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
                onMouseOver={e => {
                  if (selectedTag !== tag) e.currentTarget.style.background = '#e3f0fd';
                }}
                onMouseOut={e => {
                  if (selectedTag !== tag) e.currentTarget.style.background = '#fff';
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
                padding: '6px 20px',
                fontWeight: 600,
                fontSize: 15,
                minWidth: 110,
                minHeight: 48,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px #f3e0d0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#d17a36';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#E5873E';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginBottom:2}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              <span style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Bài viết<br />yêu thích
              </span>
            </button>
            <button
              onClick={() => router.push('/user/history')}
              style={{
                background: '#48664E',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '6px 20px',
                fontWeight: 600,
                fontSize: 15,
                minWidth: 110,
                minHeight: 48,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px #d9e4e2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#3d523e';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#48664E';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginBottom:2}}><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Lịch<br />sử xem
              </span>
            </button>
          </div>
        </div>
        <div className="articles-list">
          {filteredArticles.map(art => (
            <ArticleCard
              key={art.id}
              art={art}
              locale={locale}
              onClick={() => router.push(`/articles/${art.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
} 