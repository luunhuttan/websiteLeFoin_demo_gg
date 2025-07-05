import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

type CommentWithUser = any;
type CommentTree = any;

function buildCommentTree(comments: CommentWithUser[]): CommentTree[] {
  const map: Record<number, CommentTree> = {};
  const roots: CommentTree[] = [];
  comments.forEach((c) => (map[c.id] = { ...c, replies: [] }));
  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.replies.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const articleId = Number(params.id);
  if (!articleId) return NextResponse.json({ error: 'Invalid article id' }, { status: 400 });
  const comments = await prisma.comment.findMany({
    where: { articleId, isApproved: true },
    orderBy: { createdAt: 'asc' },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, avatar: true, role: true } },
    },
  });
  return NextResponse.json(buildCommentTree(comments as CommentWithUser[]));
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  console.log('DEBUG COMMENT SESSION:', session);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const articleId = Number(params.id);
  if (!articleId) return NextResponse.json({ error: 'Invalid article id' }, { status: 400 });
  const body = await req.json();
  const { content, parentId } = body;
  if (!content || content.trim().length < 2) {
    return NextResponse.json({ error: 'Nội dung bình luận quá ngắn.' }, { status: 400 });
  }
  const comment = await prisma.comment.create({
    data: {
      content,
      userId: Number(session.user.id),
      articleId,
      parentId: parentId || null,
      isApproved: false, // Chờ admin duyệt
    },
  });
  return NextResponse.json({ success: true, comment });
} 