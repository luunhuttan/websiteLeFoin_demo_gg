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
  '/images/body_lotion_lefoin.jpg',
  '/images/orange_farm_collection.jpg',
  '/images/cam_cam_orange_farm.jpg',
  '/images/facewash_lefoin.jpg',
  '/images/forest_after_rain.jpg',
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
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#ff5722] hover:bg-[#ff3d00] text-white text-2xl font-extrabold rounded-full shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-200 drop-shadow-lg focus:ring-4 focus:ring-orange-300 focus:outline-none"
        >
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="#fff"/>
            <path d="M24 14c-5.523 0-10 3.134-10 7v7c0 3.866 4.477 7 10 7s10-3.134 10-7v-7c0-3.866-4.477-7-10-7Zm0 2c4.418 0 8 2.239 8 5v2h-16v-2c0-2.761 3.582-5 8-5Zm-8 7h16v5c0 2.761-3.582 5-8 5s-8-2.239-8-5v-5Z" fill="#ff5722"/>
            <circle cx="24" cy="24" r="23" stroke="#ff5722" strokeWidth="2"/>
          </svg>
          Xem sản phẩm tại Shopee
          <span className="ml-2 text-lg font-semibold bg-white/20 px-4 py-1 rounded-full border border-white/40">Click here!</span>
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