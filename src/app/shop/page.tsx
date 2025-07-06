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
  const { t, locale } = useLanguage();
  const [products, setProducts] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        
        // Fetch ratings for each product
        const productsWithRatings = await Promise.all(
          data.map(async (product: Product) => {
            try {
              const reviewResponse = await fetch(`/api/reviews?productId=${product.id}`);
              if (reviewResponse.ok) {
                const reviewData = await reviewResponse.json();
                return {
                  ...product,
                  averageRating: reviewData.averageRating,
                  totalReviews: reviewData.totalReviews
                };
              }
            } catch (error) {
              console.error(`Error fetching reviews for product ${product.id}:`, error);
            }
            return product;
          })
        );
        
        setProducts(productsWithRatings);
      } else {
        // Use fallback data if API fails
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p className="mt-2">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t("shop.title")}</title>
        <meta name="description" content={t("shop.description")} />
        <meta property="og:title" content={t("shop.title")} />
        <meta property="og:description" content={t("shop.description")} />
        <meta property="og:image" content="/images/og-lefoin.jpg" />
        <meta property="og:url" content="https://lefoin.vn/shop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={t("shop.title")} />
        <meta name="twitter:description" content={t("shop.description")} />
        <meta name="twitter:image" content="/images/og-lefoin.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-leaf mb-8 text-center">
          {t("shop.heading")}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.image || '/images/default-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Hết hàng
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-leaf mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {product.category && (
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-4">
                    {product.category}
                  </span>
                )}

                {/* Rating */}
                {product.averageRating && product.totalReviews && (
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(product.averageRating)}
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      ({product.totalReviews} đánh giá)
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-amber-600">
                    {formatPrice(product.price)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`https://shopee.vn/search?keyword=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors text-center"
                  >
                    Mua trên Shopee
                  </a>
                </div>

                {/* Review Link */}
                <div className="mt-4 text-center">
                  <Link
                    href={`/products/${product.id}/reviews`}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                  >
                    Xem đánh giá chi tiết →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shopee Link */}
        <div className="text-center mt-12">
          <a
            href="https://shopee.vn/le.foin.original.official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-leaf hover:text-amber-600 font-semibold text-lg transition-colors"
          >
            {t("shop.viewAll")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
} 