import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();
    
    // Validation
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 });
    }
    
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400 });
    }
    
    if (!email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }
    
    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 409 });
    }
    
    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();
    const user = await prisma.user.create({ 
      data: { 
        email, 
        password: hashed,
        firstName: firstName || null,
        lastName: lastName || null,
        updatedAt: now
      } 
    });
    
    return new Response(JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    }), { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 