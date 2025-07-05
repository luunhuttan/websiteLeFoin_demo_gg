import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    console.log('POST /api/articles called');
    
    // Tạm thời bỏ qua middleware để test
    const { title, content, tags } = await req.json();
    console.log('Request body:', { title, content, tags });
    
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing title or content' }), { status: 400 });
    }
    
    // Đảm bảo tags luôn là mảng string
    const tagsArray = Array.isArray(tags) ? tags : (tags ? [tags] : []);
    // 1. Tạo bài viết trước
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: 1, // ID của admin user
      },
    });
    // 2. Xử lý tags: tạo mới nếu chưa có, sau đó tạo ArticleTag
    if (tagsArray.length > 0) {
      for (const tagName of tagsArray) {
        let tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (!tag) {
          tag = await prisma.tag.create({ data: { name: tagName } });
        }
        await prisma.articletag.create({
          data: {
            articleId: article.id,
            tagId: tag.id,
          },
        });
      }
    }
    // 3. Lấy lại bài viết kèm tags
    const articleWithTags = await prisma.article.findUnique({
      where: { id: article.id },
      include: {
        articletag: { include: { tag: true } },
      },
    });
    // Map tags về dạng { name }
    const tagsMapped = (articleWithTags?.articletag || []).map((t: any) => ({ name: t.tag.name }));
    return new Response(JSON.stringify({
      id: articleWithTags?.id,
      title: articleWithTags?.title,
      content: articleWithTags?.content,
      createdAt: articleWithTags?.createdAt,
      tags: tagsMapped
    }), { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('GET /api/articles called');
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        articletag: { include: { tag: true } },
      },
    });
    console.log('Found articles:', articles.length);
    // Map tags về dạng { name }
    const articlesMapped = Array.isArray(articles) ? articles.map(a => ({
      ...a,
      author: a.user ? { id: a.user.id, email: a.user.email } : null,
      tags: Array.isArray(a.articletag) ? a.articletag.map((t: any) => ({ name: t.tag?.name })) : [],
    })) : [];
    return new Response(JSON.stringify(articlesMapped), { status: 200 });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 