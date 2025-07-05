import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const commentId = Number(params.id);
  if (!commentId) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 });
  }

  // Tìm comment
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { user: true }
  });

  if (!comment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  // Kiểm tra quyền: chỉ user tạo comment hoặc admin mới được xóa
  if (comment.userId !== session.user.id && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Xóa comment và tất cả replies (nếu có)
  await prisma.comment.deleteMany({
    where: {
      OR: [
        { id: commentId },
        { parentId: commentId }
      ]
    }
  });

  return NextResponse.json({ success: true });
} 