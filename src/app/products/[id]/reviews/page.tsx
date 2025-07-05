'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import ProductReview from '@/components/ProductReview';
import ReviewSummary from '@/components/ReviewSummary';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
}

export default function ProductReviewsPage() {
  const params = useParams();
  const productId = params?.id ? parseInt(params.id as string) : 0;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        // Fallback product data
        setProduct({
          id: productId,
          name: `Sản phẩm #${productId}`,
          description: 'Thông tin sản phẩm',
          price: 0,
          image: '/images/default-product.jpg'
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct({
        id: productId,
        name: `Sản phẩm #${productId}`,
        description: 'Thông tin sản phẩm',
        price: 0,
        image: '/images/default-product.jpg'
      });
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p className="mt-2">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Đánh giá - {product.name} | Le Foin</title>
        <meta name="description" content={`Đánh giá và nhận xét về sản phẩm ${product.name} từ Le Foin`} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Product Info Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={product.image || '/images/default-product.jpg'}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-leaf mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
              )}
              {product.category && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mb-2">
                  {product.category}
                </span>
              )}
              <div className="text-xl font-bold text-amber-600">
                {formatPrice(product.price)}
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href={`https://shopee.vn/search?keyword=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Mua trên Shopee
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSummary productId={productId} />
        <ProductReview productId={productId} productName={product.name} />
      </div>
    </>
  );
} 