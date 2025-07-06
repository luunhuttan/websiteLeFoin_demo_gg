import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/reviews/stats?productId=... - Get review statistics (all or by product)
export async function GET(request: NextRequest) {
  try {
    // Validate URL before creating URL object
    if (!request.url || request.url.includes('     ')) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    // Lấy review theo sản phẩm nếu có productId, không thì lấy toàn bộ
    const where = productId ? { productId: parseInt(productId) } : {};
    const reviews = await prisma.review.findMany({
      where,
      select: {
        rating: true,
        verified: true
      }
    });

    // Calculate statistics
    const totalReviews = reviews.length;
    const verifiedReviews = reviews.filter(review => review.verified);
    
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    // Count ratings
    const ratingCounts = {
      5: reviews.filter(review => review.rating === 5).length,
      4: reviews.filter(review => review.rating === 4).length,
      3: reviews.filter(review => review.rating === 3).length,
      2: reviews.filter(review => review.rating === 2).length,
      1: reviews.filter(review => review.rating === 1).length,
    };

    return NextResponse.json({
      totalReviews,
      verifiedReviews: verifiedReviews.length,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      ratingCounts
    });
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 