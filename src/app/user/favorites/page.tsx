"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
  tags?: any[];
}

export const dynamic = 'force-dynamic';

export default function UserFavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth');
      return;
    }

    // Fetch favorite articles
    fetch('/api/user/favorites')
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setFavoriteArticles(data.articles);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      });
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #D9E4E2 0%, #AFCBBB 100%)',
        minHeight: '100vh'
      }}>
        <div style={{ fontSize: '18px', color: '#7A5C42' }}>Đang tải bài viết yêu thích...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Sẽ redirect trong useEffect
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #D9E4E2 0%, #AFCBBB 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#7A5C42',
            textAlign: 'center',
            marginBottom: '10px',
            fontFamily: 'Playfair Display, serif'
          }}>
            Bài viết yêu thích
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#48664E',
            fontSize: '1.1rem',
            marginBottom: '40px'
          }}>
            Những bài viết bạn đã lưu để đọc sau
          </p>
        </motion.div>

        {favoriteArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💚</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              color: '#7A5C42',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              Chưa có bài viết yêu thích
            </h3>
            <p style={{ 
              color: '#48664E',
              marginBottom: '30px',
              fontSize: '1rem'
            }}>
              Hãy khám phá các bài viết và nhấn nút "Yêu thích" để lưu lại nhé!
            </p>
            <button
              onClick={() => router.push('/articles')}
              style={{
                background: '#E5873E',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(229, 135, 62, 0.3)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#d17a36';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(229, 135, 62, 0.4)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#E5873E';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 135, 62, 0.3)';
              }}
            >
              Khám phá bài viết
            </button>
          </motion.div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {favoriteArticles.map((article, index) => {
              let content: any = {};
              try {
                content = JSON.parse(article.content);
              } catch {}
              
              const art = content.vi || content.en || {};
              
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => router.push(`/articles/${article.id}`)}
                >
                  <img 
                    src={art.image || '/images/og-lefoin.jpg'} 
                    alt={art.title || article.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#7A5C42',
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {art.title || article.title}
                    </h3>
                    <p style={{
                      color: '#48664E',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {art.excerpt || 'Không có mô tả'}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        color: '#E5873E',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#E5873E'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Đã yêu thích</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 