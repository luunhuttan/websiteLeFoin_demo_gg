import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const status = searchParams.get('status'); // 'approved', 'pending', 'all'
  const search = searchParams.get('search') || '';

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};
  
  if (status === 'approved') {
    where.isApproved = true;
  } else if (status === 'pending') {
    where.isApproved = false;
  }
  
  if (search) {
    where.content = {
      contains: search,
      mode: 'insensitive'
    };
  }

  // Get comments with pagination
  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, role: true } },
        article: { select: { id: true, title: true } },
        parent: { select: { id: true, content: true } }
      }
    }),
    prisma.comment.count({ where })
  ]);

  return NextResponse.json({
    comments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
} 