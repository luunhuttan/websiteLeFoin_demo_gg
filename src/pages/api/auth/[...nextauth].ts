import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionStrategy } from 'next-auth';
import prisma from "@/lib/prisma";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      role?: string;
      firstName?: string;
      lastName?: string;
      name?: string | null;
      image?: string | null;
    }
  }
  interface User {
    id: number;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
  }
}

console.log('DEBUG NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('DEBUG VERCEL_URL:', process.env.VERCEL_URL);

export const authOptions = {
  // adapter: PrismaAdapter(prisma), // Bỏ comment nếu muốn lưu user vào DB
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Gọi API backend để xác thực user
        // Sử dụng URL tuyệt đối với fallback an toàn
        let rawUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        // Làm sạch URL: loại bỏ khoảng trắng và lặp https://
        rawUrl = rawUrl.trim().replace(/^https?:\/\/[\s]*https?:\/\//, 'https://').replace(/\s+/g, '');
        const baseUrl = rawUrl;
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar || token.avatar;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        // Truy vấn lại user từ database để lấy avatar mới nhất
        const userDb = await prisma.user.findUnique({ where: { email: session.user.email } });
        session.user.avatar = userDb?.avatar || token.avatar as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
};

const handler = NextAuth(authOptions);
export default handler; 