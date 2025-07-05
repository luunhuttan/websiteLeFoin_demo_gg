import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Chỉ lưu lịch sử nếu user đã đăng nhập
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ message: 'Not logged in' }), { status: 200 });
    }

    const articleId = Number(params.id);
    
    // Kiểm tra bài viết có tồn tại không
    const article = await prisma.article.findUnique({
      where: { id: articleId }
    });
    
    if (!article) {
      return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
    }

    // Lấy user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Lưu hoặc cập nhật lịch sử xem
    await prisma.articleView.upsert({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId: articleId
        }
      },
      update: {
        viewedAt: new Date()
      },
      create: {
        userId: user.id,
        articleId: articleId,
        viewedAt: new Date()
      }
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error saving article view:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 