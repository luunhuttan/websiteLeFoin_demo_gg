import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, content, tags } = await req.json();
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing title or content' }), { status: 400 });
    }
    const tagsArray = Array.isArray(tags) ? tags : (tags ? [tags] : []);
    const article = await prisma.article.update({
      where: { id: Number(params.id) },
      data: { title, content },
    });
    // Xóa hết tag cũ
    await prisma.articletag.deleteMany({ where: { articleId: article.id } });
    // Gán lại tag mới
    if (tagsArray.length > 0) {
      for (const tagName of tagsArray) {
        let tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (!tag) {
          tag = await prisma.tag.create({ data: { name: tagName } });
        }
        await prisma.articletag.create({
          data: { articleId: article.id, tagId: tag.id },
        });
      }
    }
    const articleWithTags = await prisma.article.findUnique({
      where: { id: article.id },
      include: {
        articletag: { include: { tag: true } },
      },
    });
    const tagsMapped = (articleWithTags?.articletag || []).map((t: any) => ({ name: t.tag.name }));
    return new Response(JSON.stringify({ ...articleWithTags, tags: tagsMapped }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  await prisma.article.delete({ where: { id: Number(params.id) } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const article = await prisma.article.findUnique({
      where: { id: Number(params.id) },
      include: {
        articletag: { include: { tag: true } },
      },
    });
    if (!article) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    
    const tagsMapped = (article.articletag || []).map((t: any) => ({ name: t.tag.name }));
    
    // Kiểm tra xem user đã đăng nhập và đã favorite bài viết này chưa
    let isFavorite = false;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { favoriteArticles: { where: { id: article.id } } },
      });
      isFavorite = (user?.favoriteArticles?.length || 0) > 0;
    }
    
    return new Response(JSON.stringify({ ...article, tags: tagsMapped, isFavorite }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // Yêu cầu user đăng nhập
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { favoriteArticles: true } });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
  const articleId = Number(params.id);
  const isFavorite = user.favoriteArticles.some((a) => a.id === articleId);
  if (isFavorite) {
    // Unfavorite
    await prisma.user.update({
      where: { id: user.id },
      data: { favoriteArticles: { disconnect: { id: articleId } } },
    });
    return new Response(JSON.stringify({ favorited: false }), { status: 200 });
  } else {
    // Favorite
    await prisma.user.update({
      where: { id: user.id },
      data: { favoriteArticles: { connect: { id: articleId } } },
    });
    return new Response(JSON.stringify({ favorited: true }), { status: 200 });
  }
} 