import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { createSafeUrl } from '@/lib/utils';

// GET /api/reviews - Get reviews for a product
export async function GET(request: NextRequest) {
  try {
    // Use the safe URL creation utility
    const url = createSafeUrl(request.url);
    if (!url) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    
    const { searchParams } = url;
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate average rating
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    // Count ratings by star
    const ratingCounts = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    };

    return NextResponse.json({
      reviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      ratingCounts
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    if (!productId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Product ID and valid rating (1-5) are required' }, { status: 400 });
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_productId: {
          userId: parseInt(session.user.id),
          productId: productId
        }
      }
    });

    if (existingReview) {
      return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: parseInt(session.user.id),
        productId: productId,
        rating: rating,
        comment: comment || null,
        verified: false // Can be set to true if purchase verification is implemented
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          }
        }
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/reviews - Update a review
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reviewId, rating, comment } = await request.json();

    if (!reviewId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Review ID and valid rating (1-5) are required' }, { status: 400 });
    }

    // Check if user owns this review
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId: session.user.id
      }
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating,
        comment: comment || null,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          }
        }
      }
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/reviews - Delete a review
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use the safe URL creation utility
    const url = createSafeUrl(request.url);
    if (!url) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const { searchParams } = url;
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    // Check if user owns this review or is admin
    const existingReview = await prisma.review.findFirst({
      where: {
        id: parseInt(reviewId),
        userId: session.user.id
      }
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }

    await prisma.review.delete({
      where: { id: parseInt(reviewId) }
    });

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 