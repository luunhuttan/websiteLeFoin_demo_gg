'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  user: {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    avatar?: string;
  };
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingCounts: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ProductReviewProps {
  productId: number;
  productName: string;
}

export default function ProductReview({ productId, productName }: ProductReviewProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
        setStats({
          averageRating: data.averageRating,
          totalReviews: data.totalReviews,
          ratingCounts: data.ratingCounts
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error('Vui lòng đăng nhập để đánh giá sản phẩm');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, rating, comment })
      });

      if (response.ok) {
        toast.success('Cảm ơn bạn đã đánh giá sản phẩm!');
        setShowReviewForm(false);
        setRating(5);
        setComment('');
        fetchReviews(); // Refresh reviews
      } else {
        const error = await response.json();
        toast.error(error.error || 'Có lỗi xảy ra khi gửi đánh giá');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
            className={`text-xl ${interactive ? 'cursor-pointer' : ''}`}
            disabled={!interactive}
          >
            {star <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
        <p className="mt-2">Đang tải đánh giá...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-leaf mb-6">Đánh giá sản phẩm</h3>

      {/* Review Stats */}
      {stats && (
        <div className="flex items-center gap-8 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
      )}

      {/* Review Form */}
      {session && !showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="mb-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Viết đánh giá
        </button>
      )}

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <h4 className="font-semibold text-leaf mb-4">Đánh giá của bạn</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Đánh giá
            </label>
            {renderStars(rating, true)}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nhận xét (tùy chọn)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Chưa có đánh giá nào cho sản phẩm này.
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.user.firstName ? review.user.firstName.charAt(0).toUpperCase() : review.user.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-leaf">
                      {review.user.firstName ? `${review.user.firstName} ${review.user.lastName || ''}` : review.user.email}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="mb-2">
                    {renderStars(review.rating)}
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 