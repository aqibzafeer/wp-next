// Security middleware for API routes
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import type { SecurityConfig } from '@/types';

const securityConfig: SecurityConfig = {
  allowedOrigins: [
    'http://localhost:3000',
    'https://your-domain.com',
    process.env.NEXT_PUBLIC_SITE_URL || '',
  ].filter(Boolean),

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },

  corsHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  },
};

class SecurityMiddleware {
  private requestCounts = new Map<string, { count: number; resetTime: number }>();

  /**
   * Apply security checks to request
   */
  async applySecurityChecks(request: NextRequest): Promise<NextResponse | null> {
    // Rate limiting
    const clientIP = this.getClientIP(request);
    if (this.isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '900' } }
      );
    }

    // CORS validation
    if (!this.isValidOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }

    // Input sanitization for POST/PUT requests
    if (['POST', 'PUT'].includes(request.method)) {
      const sanitized = await this.sanitizeInput(request);
      if (sanitized instanceof NextResponse) {
        return sanitized;
      }
    }

    return null; // No security violations
  }

  /**
   * Get client IP address
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const clientIP = request.headers.get('x-client-ip');

    return forwarded?.split(',')[0] ||
           realIP ||
           clientIP ||
           'unknown';
  }

  /**
   * Check if request is rate limited
   */
  private isRateLimited(clientIP: string): boolean {
    const now = Date.now();
    const windowMs = securityConfig.rateLimit.windowMs;
    const maxRequests = securityConfig.rateLimit.maxRequests;

    const clientData = this.requestCounts.get(clientIP);

    if (!clientData || now > clientData.resetTime) {
      // First request or window expired
      this.requestCounts.set(clientIP, {
        count: 1,
        resetTime: now + windowMs,
      });
      return false;
    }

    if (clientData.count >= maxRequests) {
      return true; // Rate limited
    }

    clientData.count++;
    return false;
  }

  /**
   * Validate request origin
   */
  private isValidOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return true; // Allow requests without origin (server-to-server)

    return securityConfig.allowedOrigins.includes(origin);
  }

  /**
   * Sanitize input data
   */
  private async sanitizeInput(request: NextRequest): Promise<NextResponse | null> {
    try {
      const body = await request.json();

      // Basic XSS prevention
      const sanitized = this.sanitizeObject(body);

      // Recreate request with sanitized body
      const sanitizedRequest = new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(sanitized),
      });

      // Replace the original request body
      Object.defineProperty(request, 'json', {
        value: () => Promise.resolve(sanitized),
      });

      return null;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
  }

  /**
   * Recursively sanitize object values
   */
  private sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }

    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value);
      }
      return sanitized;
    }

    return obj;
  }

  /**
   * Get security headers for responses
   */
  getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
      ...securityConfig.corsHeaders,
    };
  }
}

export const securityMiddleware = new SecurityMiddleware();