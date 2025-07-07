'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  inStock: boolean;
}

interface ProductWithRating extends Product {
  averageRating?: number;
  totalReviews?: number;
}

// Fallback products data if API fails
const fallbackProducts = [
  {
    id: 1,
    name: 'Sáng da, giảm viêm nang lông Cam Sả Body Lotion',
    description: 'Sữa dưỡng thể Lightening thẩm thấu nhanh',
    price: 235000,
    image: '/mua-hang/body_lotion.png',
    category: 'Body Care',
    inStock: true,
  },
  {
    id: 2,
    name: 'Gel rửa mặt tạo bọt SẠCH sâu SÁNG tự nhiên Face Wash',
    description: 'PureDetox OrangeFarm CamCam Facewash',
    price: 115000,
    image: '/mua-hang/sua_rua_mat.png',
    category: 'Face Care',
    inStock: true,
  },
  {
    id: 3,
    name: 'Kem dưỡng da tay Handcream Orange Farm',
    description: 'Dưỡng ẩm và bảo vệ da tay',
    price: 115000,
    image: '/mua-hang/kem_duong_da_tay.png',
    category: 'Hand Care',
    inStock: true,
  },
];

// Force dynamic rendering to prevent build-time URL construction issues
export const dynamic = 'force-dynamic';

const productImages = [
  '/images/1751357595794-camcam.jpg',
  '/images/1751358606630-camcam.jpg',
  '/mua-hang/body_lotion.png',
  '/mua-hang/kem_duong_da_tay.png',
  '/mua-hang/sua_rua_mat.png',
];

export default function ShopPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 dark:from-[#23272f] dark:to-[#2a2e39]">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 flex items-center justify-center mb-8">
        <Image
          src="/images/1751360257771-Cam_banner_Le_Foin_logo.png"
          alt="Le Foin Banner"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
          <Image src="/images/logo-lefoin.png" alt="Le Foin Logo" width={120} height={120} className="mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">Le Foin Official Shop</h1>
          <p className="text-lg md:text-xl text-white font-medium drop-shadow">Mua hàng chính hãng, an tâm trải nghiệm</p>
        </div>
      </div>

      {/* Slogan & CTA */}
      <div className="max-w-2xl mx-auto text-center mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-leaf mb-4">Khám phá sản phẩm thiên nhiên, an toàn cho làn da Việt</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">Tất cả sản phẩm Le Foin đều được kiểm định chất lượng, giao hàng nhanh, ưu đãi hấp dẫn trên Shopee.</p>
        <a
          href="https://shopee.vn/le.foin.original.official"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-full shadow-lg transition-colors duration-200"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8 0-4.411 3.589-8 8-8s8 3.589 8 8c0 4.411-3.589 8-8 8zm2-13h-4v2h4V7zm-1 4h-2v6h2v-6z"/></svg>
          Xem sản phẩm tại Shopee
        </a>
      </div>

      {/* Lợi ích */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">🚚</span>
          <h3 className="font-bold text-lg mb-1">Giao hàng nhanh</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Đặt hàng trên Shopee, nhận hàng chỉ sau 1-3 ngày làm việc.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">✅</span>
          <h3 className="font-bold text-lg mb-1">Chính hãng 100%</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Sản phẩm Le Foin cam kết chính hãng, an toàn cho mọi loại da.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl mb-2">🎁</span>
          <h3 className="font-bold text-lg mb-1">Ưu đãi hấp dẫn</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Nhiều voucher, freeship và quà tặng khi mua tại Shopee Le Foin.</p>
        </div>
      </div>

      {/* Grid sản phẩm nổi bật */}
      <div className="max-w-5xl mx-auto mb-16 px-4">
        <h4 className="text-xl font-bold text-leaf mb-6 text-center">Một số sản phẩm nổi bật</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {productImages.map((img, idx) => (
            <div key={img} className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 flex flex-col items-center">
              <div className="relative w-28 h-28 mb-2">
                <Image src={img} alt={`Le Foin sản phẩm ${idx + 1}`} fill className="object-contain rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 