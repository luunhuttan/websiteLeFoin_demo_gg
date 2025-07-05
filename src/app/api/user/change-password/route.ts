import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'user') {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const { oldPassword, newPassword } = await req.json();
  if (!oldPassword || !newPassword) {
    return new Response(JSON.stringify({ message: "Thiếu thông tin" }), { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return new Response(JSON.stringify({ message: "User không tồn tại" }), { status: 404 });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Mật khẩu cũ không đúng" }), { status: 400 });
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email: session.user.email }, data: { password: hashed } });
  return new Response(JSON.stringify({ message: "Đổi mật khẩu thành công" }), { status: 200 });
} 