import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'user') {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const { firstName, lastName } = await req.json();
  if (!firstName || !lastName) {
    return new Response(JSON.stringify({ message: "Thiếu thông tin" }), { status: 400 });
  }
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { firstName, lastName },
    });
    return new Response(JSON.stringify({ message: "Cập nhật thành công" }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Lỗi server" }), { status: 500 });
  }
} 