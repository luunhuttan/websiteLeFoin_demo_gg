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

// Safe environment variable access
function getSafeEnvVar(key: string, fallback: string = ''): string {
  try {
    return process.env[key] || fallback;
  } catch {
    return fallback;
  }
}

// Safe URL construction
function getSafeUrl(): string {
  try {
    // During build time, return safe fallback
    if (typeof window === 'undefined') {
      return 'https://website-le-foin-demo-gg.vercel.app';
    }
    
    const nextAuthUrl = getSafeEnvVar('NEXTAUTH_URL');
    const vercelUrl = getSafeEnvVar('VERCEL_URL');
    
    if (nextAuthUrl) {
      // Clean the URL if it has spaces
      return nextAuthUrl.trim().replace(/\s+/g, '');
    }
    
    if (vercelUrl) {
      return `https://${vercelUrl}`;
    }
    
    return 'http://localhost:3000';
  } catch {
    return 'https://website-le-foin-demo-gg.vercel.app';
  }
}

const baseUrl = getSafeUrl();
console.log('DEBUG BASE_URL:', baseUrl);

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
        try {
          console.log("AUTHORIZE credentials:", credentials);
          // Gọi API backend để xác thực user
          const res = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const user = await res.json();
          console.log("AUTHORIZE response:", res.status, user);
          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: getSafeEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getSafeEnvVar('GOOGLE_CLIENT_SECRET'),
    }),
    FacebookProvider({
      clientId: getSafeEnvVar('FACEBOOK_CLIENT_ID'),
      clientSecret: getSafeEnvVar('FACEBOOK_CLIENT_SECRET'),
    }),
    GithubProvider({
      clientId: getSafeEnvVar('GITHUB_CLIENT_ID'),
      clientSecret: getSafeEnvVar('GITHUB_CLIENT_SECRET'),
    }),
    LinkedInProvider({
      clientId: getSafeEnvVar('LINKEDIN_CLIENT_ID'),
      clientSecret: getSafeEnvVar('LINKEDIN_CLIENT_SECRET'),
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