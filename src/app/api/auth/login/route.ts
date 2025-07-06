import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("LOGIN REQUEST:", email, password);
    if (!email || !password) {
      console.log("Thiếu email hoặc password");
      return new Response(JSON.stringify({ error: 'Missing email or password' }), { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("Không tìm thấy user");
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Sai mật khẩu");
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }
    const name = user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user.email;
    console.log("Đăng nhập thành công cho user:", user.email);
    return new Response(JSON.stringify({ id: user.id, email: user.email, role: user.role, name, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar }), { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
} 