import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }
    
    // Kiểm tra email đã tồn tại chưa
    const existing = await prisma.newsletter.findUnique({
      where: { email }
    });
    
    if (existing) {
      return new Response(JSON.stringify({ 
        message: 'Email already subscribed',
        success: true 
      }), { status: 200 });
    }
    
    // Lưu email mới
    const newsletter = await prisma.newsletter.create({
      data: {
        email,
        subscribedAt: new Date()
      }
    });
    
    return new Response(JSON.stringify({ 
      message: 'Successfully subscribed to newsletter',
      success: true,
      id: newsletter.id
    }), { status: 201 });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      orderBy: { subscribedAt: 'desc' }
    });
    
    return new Response(JSON.stringify(subscribers), { status: 200 });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), { status: 500 });
  }
} 