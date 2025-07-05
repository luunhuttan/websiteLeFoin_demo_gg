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
        favoriteArticles: {
          include: {
            articletag: { include: { tag: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Map articles with tags
    const articlesWithTags = user.favoriteArticles.map(article => {
      const tagsMapped = (article.articletag || []).map((t: any) => ({ name: t.tag.name }));
      return { ...article, tags: tagsMapped };
    });

    return new Response(JSON.stringify({ articles: articlesWithTags }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 