import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        articleViews: {
          include: {
            article: {
              include: {
                articletag: { include: { tag: true } }
              }
            }
          },
          orderBy: { viewedAt: 'desc' }
        }
      }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Map articles with tags and view history
    const articlesWithHistory = user.articleViews.map(view => {
      const article = view.article;
      const tagsMapped = (article.articletag || []).map((t: any) => ({ name: t.tag.name }));
      return { 
        ...article, 
        tags: tagsMapped,
        viewedAt: view.viewedAt
      };
    });

    return new Response(JSON.stringify({ articles: articlesWithHistory }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user history:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 