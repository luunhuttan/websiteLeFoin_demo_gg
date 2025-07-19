"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId?: number;
  tags?: any[];
  viewedAt: string;
}

export const dynamic = 'force-dynamic';

export default function UserHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewedArticles, setViewedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth');
      return;
    }

    // Fetch viewed articles history
    fetch('/api/user/history')
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setViewedArticles(data.articles);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
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
        <div style={{ fontSize: '18px', color: '#7A5C42' }}>Đang tải lịch sử xem...</div>
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
            Lịch sử xem bài viết
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#48664E',
            fontSize: '1.1rem',
            marginBottom: '40px'
          }}>
            Những bài viết bạn đã xem gần đây
          </p>
        </motion.div>

        {viewedArticles.length === 0 ? (
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
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📖</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              color: '#7A5C42',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              Chưa có lịch sử xem
            </h3>
            <p style={{ 
              color: '#48664E',
              marginBottom: '30px',
              fontSize: '1rem'
            }}>
              Hãy khám phá các bài viết để tạo lịch sử xem nhé!
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
            {viewedArticles.map((article, index) => {
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
                  <Image 
                    src={art.image || '/images/1751360257771-Cam_banner_Le_Foin_logo.png'} 
                    alt={art.title || article.title}
                    width={350}
                    height={200}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/1751360257771-Cam_banner_Le_Foin_logo.png';
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
                        color: '#48664E'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                          {new Date(article.viewedAt).toLocaleDateString('vi-VN')}
                        </span>
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