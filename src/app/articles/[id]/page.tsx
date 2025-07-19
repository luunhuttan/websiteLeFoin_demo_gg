"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import CommentSection from '@/components/CommentSection';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
  tags?: any[];
  title_vi?: string;
  title_en?: string;
  excerpt_vi?: string;
  excerpt_en?: string;
  content_vi?: string;
  content_en?: string;
  image?: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { locale, t } = useLanguage();
  const { data: session } = useSession();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const router = useRouter();

  // Hàm toggle favorite
  const toggleFavorite = async () => {
    if (!session) {
      router.push('/auth');
      return;
    }
    
    setFavoriteLoading(true);
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.favorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setTags(Array.isArray(data.tags) ? data.tags : []);
        setIsFavorite(data.isFavorite || false);
        setLoading(false);
        
        // Lưu lịch sử xem bài viết
        if (session) {
          fetch(`/api/articles/${id}/view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }).catch(error => {
            console.error('Error saving view history:', error);
          });
        }
      })
      .catch(() => {
        setError("Không thể tải bài viết");
        setLoading(false);
      });
  }, [id, session]);

  if (loading) return <div style={{textAlign:'center',padding:40}}>Đang tải bài viết...</div>;
  if (error || !article) return <div style={{textAlign:'center',padding:40}}>{error || "Không tìm thấy bài viết."}</div>;

  // Ưu tiên lấy trường content_vi, content_en, title_vi, title_en, image
  const art = {
    title: article.title_vi || article.title_en || article.title || '',
    excerpt: article.excerpt_vi || article.excerpt_en || '',
    content: article.content_vi || article.content_en || '',
    image: article.image || '/images/1751360257771-Cam_banner_Le_Foin_logo.png',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto my-10 rounded-2xl shadow-2xl p-8 bg-white dark:bg-[#23272f] border border-gray-200 dark:border-gray-700"
    >
      {/* Badge tag đồng bộ style */}
      <div className="mb-6">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((at: any) => (
            <span
              key={at.tag?.id}
              onClick={() => router.push(`/?tag=${encodeURIComponent(at.tag?.name)}`)}
              title={`Xem các bài viết với tag "${at.tag?.name}"`}
              className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 border border-amber-200 dark:border-amber-700 rounded-full px-4 py-1 text-sm font-semibold cursor-pointer transition hover:bg-amber-200 dark:hover:bg-amber-800"
              style={{ display: 'inline-block' }}
            >
              {at.tag?.name}
            </span>
          ))}
        </div>
        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap items-center">
          {/* Nút Favorite */}
          <button
            onClick={toggleFavorite}
            disabled={favoriteLoading}
            className={`border-2 rounded-full px-5 py-2 font-semibold text-base flex items-center gap-2 transition-all shadow-sm
              ${isFavorite ? 'bg-amber-500 text-white border-amber-500 dark:bg-amber-600 dark:border-amber-600' : 'bg-transparent text-amber-500 border-amber-500 dark:text-amber-300 dark:border-amber-300'}
              hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white
              ${favoriteLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            onMouseOver={e => {
              if (!favoriteLoading) {
                e.currentTarget.style.background = '#e5873e';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={e => {
              if (!favoriteLoading) {
                e.currentTarget.style.background = isFavorite ? '#e5873e' : 'transparent';
                e.currentTarget.style.color = isFavorite ? '#fff' : '#e5873e';
              }
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favoriteLoading ? 'Đang xử lý...' : (isFavorite ? 'Đã yêu thích' : 'Yêu thích')}
          </button>
          {/* Nút Bài viết yêu thích */}
          <button
            onClick={() => router.push('/user/favorites')}
            className="border-2 border-amber-500 dark:border-amber-300 rounded-full px-5 py-2 font-semibold text-base flex items-center gap-2 bg-transparent text-amber-500 dark:text-amber-300 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-all shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Bài viết yêu thích
          </button>
          {/* Nút Lịch sử xem */}
          <button
            onClick={() => router.push('/user/history')}
            className="border-2 border-leaf dark:border-green-300 rounded-full px-5 py-2 font-semibold text-base flex items-center gap-2 bg-transparent text-leaf dark:text-green-200 hover:bg-leaf hover:text-white dark:hover:bg-green-700 dark:hover:text-white transition-all shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Lịch sử xem
          </button>
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 320, borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
        <Image
          src={art.image}
          alt={art.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/1751360257771-Cam_banner_Le_Foin_logo.png';
          }}
          priority={true}
        />
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">{art.title}</h1>
      <div className="text-lg mb-6 text-gray-500 dark:text-gray-400 font-medium">{art.excerpt}</div>
      <div className="text-xl leading-8 text-gray-800 dark:text-gray-100 mb-10" dangerouslySetInnerHTML={{ __html: art.content }} />
      {/* Comment Section */}
      <CommentSection articleId={article.id} />
    </motion.div>
  );
} 