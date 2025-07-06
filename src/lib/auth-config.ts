import { cleanUrl } from './utils';

// Helper function to get base URL safely
export function getBaseUrl(): string {
  // During build time, always return a safe fallback
  if (typeof window === 'undefined') {
    return 'https://website-le-foin-demo-gg.vercel.app';
  }
  
  // Only process environment variables at runtime
  let rawUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  return cleanUrl(rawUrl);
}

// Safe environment variable access
export function getAuthConfig() {
  // During build time, return minimal config
  if (typeof window === 'undefined') {
    return {
      url: 'https://website-le-foin-demo-gg.vercel.app',
      secret: 'fallback-secret',
      providers: {
        google: { clientId: '', clientSecret: '' },
        facebook: { clientId: '', clientSecret: '' },
        github: { clientId: '', clientSecret: '' },
        linkedin: { clientId: '', clientSecret: '' },
      }
    };
  }
  
  return {
    url: getBaseUrl(),
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret',
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
      facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      },
      linkedin: {
        clientId: process.env.LINKEDIN_CLIENT_ID || '',
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      },
    }
  };
} 