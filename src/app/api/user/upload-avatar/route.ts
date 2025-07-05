import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'user') {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get("avatar");
  if (!file || typeof file === "string") {
    return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = (file.name || "").split(".").pop() || "jpg";
  const fileName = `${uuidv4()}.${ext}`;
  const filePath = path.join(process.cwd(), "public", "avatars", fileName);
  await writeFile(filePath, buffer);
  const avatarUrl = `/avatars/${fileName}`;
  await prisma.user.update({
    where: { email: session.user.email },
    data: { avatar: avatarUrl },
  });
  return new Response(JSON.stringify({ message: "Upload thành công", avatar: avatarUrl }), { status: 200 });
} 