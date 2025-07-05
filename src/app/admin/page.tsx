"use client";
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-leaf">Trang quản trị</h1>
      <div className="flex flex-wrap gap-6">
        <button
          onClick={() => router.push('/admin/articles')}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors flex items-center gap-2"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H8V4h11v16zM6 6H4v16c0 1.1.9 2 2 2h12v-2H6V6z"/></svg>
          Quản lý bài viết
        </button>
        <button
          onClick={() => router.push('/admin/reviews')}
          className="bg-leaf hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors flex items-center gap-2"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          Quản lý đánh giá sản phẩm
        </button>
        <button
          onClick={() => router.push('/admin/comments')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors flex items-center gap-2"
        >
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          Quản lý bình luận
        </button>
        {/* Thêm các tính năng admin khác ở đây */}
      </div>
    </div>
  );
} 