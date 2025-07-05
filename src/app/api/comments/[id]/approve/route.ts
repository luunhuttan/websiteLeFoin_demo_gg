import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const commentId = Number(params.id);
  if (!commentId) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 });
  }

  const body = await req.json();
  const { isApproved } = body;

  if (typeof isApproved !== 'boolean') {
    return NextResponse.json({ error: 'Invalid approval status' }, { status: 400 });
  }

  // Cập nhật trạng thái duyệt
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { isApproved }
  });

  return NextResponse.json({ success: true, comment });
} 