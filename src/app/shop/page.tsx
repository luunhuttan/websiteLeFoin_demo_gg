'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

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

export default function ShopPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-leaf mb-6">
        Mua hàng chính hãng Le Foin
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-10">
        Xem tất cả sản phẩm tại Shopee Le Foin
      </p>
      <a
        href="https://shopee.vn/le.foin.original.official"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-full shadow-lg transition-colors duration-200"
      >
        Xem sản phẩm tại Shopee
      </a>
    </div>
  );
} 