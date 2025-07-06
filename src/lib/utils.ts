import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans and validates a URL by removing extra spaces and fixing malformed protocols
 * @param url - The URL to clean
 * @returns A cleaned URL string
 */
export function cleanUrl(url: string): string {
  if (!url) return '';
  
  // During build time in production, return a safe fallback
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    // If the URL contains the malformed pattern, return the safe fallback
    if (url.includes('     https://') || url.includes('https://     https://')) {
      return 'https://website-le-foin-demo-gg.vercel.app';
    }
  }
  
  // Remove all whitespace
  let cleaned = url.trim().replace(/\s+/g, '');
  
  // Fix duplicate https:// protocols
  cleaned = cleaned.replace(/^https?:\/\/[\s]*https?:\/\//, 'https://');
  
  // Ensure it starts with http:// or https://
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }
  
  return cleaned;
}

/**
 * Safely creates a URL object with proper error handling
 * @param url - The URL to create
 * @param base - Optional base URL
 * @returns URL object or null if invalid
 */
export function createSafeUrl(url: string, base?: string): URL | null {
  try {
    const cleanedUrl = cleanUrl(url);
    return new URL(cleanedUrl, base);
  } catch (error) {
    console.error('Error creating URL:', error);
    return null;
  }
} 