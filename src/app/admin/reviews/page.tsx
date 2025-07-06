'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import toast from 'react-hot-toast';

interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  verified: boolean;
  user: {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  product: {
    id: number;
    name: string;
  };
}

export const dynamic = 'force-dynamic';

export default function AdminReviewsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, verified
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.user?.role !== 'admin') {
      router.push('/auth');
      return;
    }
    fetchReviews();
  }, [session, router]);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa đánh giá này?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Đã xóa đánh giá thành công!');
        fetchReviews();
      } else {
        toast.error('Có lỗi xảy ra khi xóa đánh giá');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Có lỗi xảy ra khi xóa đánh giá');
    }
  };

  const handleToggleVerified = async (reviewId: number, currentVerified: boolean) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !currentVerified })
      });

      if (response.ok) {
        toast.success('Đã cập nhật trạng thái đánh giá!');
        fetchReviews();
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-lg">
            {star <= rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || 
      (filter === 'verified' && review.verified) ||
      (filter === 'pending' && !review.verified);
    
    const matchesSearch = review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.comment && review.comment.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (session?.user?.role !== 'admin') {
    return <div className="text-center py-8">Đang chuyển hướng...</div>;
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p className="mt-2">Đang tải đánh giá...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quản lý đánh giá - Admin | Le Foin</title>
        <meta name="description" content="Quản lý đánh giá sản phẩm" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-leaf">Quản lý đánh giá</h1>
          <div className="text-sm text-gray-600">
            Tổng cộng: {reviews.length} đánh giá
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo sản phẩm, email hoặc nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Tất cả</option>
                <option value="verified">Đã xác thực</option>
                <option value="pending">Chờ xác thực</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Người đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-leaf">
                        {review.product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {review.product.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {review.user.firstName ? `${review.user.firstName} ${review.user.lastName || ''}` : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {review.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {review.comment || 'Không có nhận xét'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        review.verified
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {review.verified ? 'Đã xác thực' : 'Chờ xác thực'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleVerified(review.id, review.verified)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                            review.verified
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {review.verified ? 'Bỏ xác thực' : 'Xác thực'}
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filter !== 'all' 
                  ? 'Không tìm thấy đánh giá nào phù hợp với bộ lọc.'
                  : 'Chưa có đánh giá nào.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 