import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 