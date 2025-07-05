'use client';

import { useState, useEffect } from 'react';

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ReviewSummaryProps {
  productId?: number;
}

export default function ReviewSummary({ productId }: ReviewSummaryProps) {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverallStats();
  }, [productId]);

  const fetchOverallStats = async () => {
    try {
      const url = productId ? `/api/reviews/stats?productId=${productId}` : '/api/reviews/stats';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching review stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-lg">
            {star <= fullStars ? '⭐' : star === fullStars + 1 && hasHalfStar ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
        <p className="mt-2">Đang tải thống kê...</p>
      </div>
    );
  }

  if (!stats || stats.totalReviews === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-leaf mb-4">Đánh giá từ khách hàng</h3>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600">{stats.averageRating}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Điểm trung bình</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {renderStars(Math.round(stats.averageRating))}
            <span className="text-sm text-gray-600 dark:text-gray-300">
              ({stats.totalReviews} đánh giá)
            </span>
          </div>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-8">{star}⭐</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: `${stats.totalReviews > 0 ? (stats.ratingCounts[star as keyof typeof stats.ratingCounts] / stats.totalReviews) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 w-8">
                  {stats.ratingCounts[star as keyof typeof stats.ratingCounts]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Dựa trên {stats.totalReviews} đánh giá từ khách hàng thực tế
        </p>
      </div>
    </div>
  );
} 