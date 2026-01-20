// Redis caching layer for WooCommerce API
import type { CacheOptions } from '@/types';

let redis: any = null;

// Initialize Redis only if properly configured
try {
  if (process.env.REDIS_URL && process.env.REDIS_TOKEN) {
    const { Redis } = await import('@upstash/redis');
    redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
  }
} catch (error) {
  console.warn('Redis not available, falling back to direct API calls:', error);
}

class WooCommerceCache {
  private static instance: WooCommerceCache;
  private defaultTTL = 300; // 5 minutes

  static getInstance(): WooCommerceCache {
    if (!WooCommerceCache.instance) {
      WooCommerceCache.instance = new WooCommerceCache();
    }
    return WooCommerceCache.instance;
  }

  /**
   * Get cached data or fetch from API
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // If Redis is not available, fetch directly
    if (!redis) {
      return fetcher();
    }

    const cacheKey = `woo:${key}`;
    const ttl = options.ttl || this.defaultTTL;

    try {
      // Try to get from cache first
      const cached = await redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached as string);
      }

      // Fetch fresh data
      const data = await fetcher();

      // Cache the result
      await redis.setex(cacheKey, ttl, JSON.stringify(data));

      return data;
    } catch (error) {
      console.error('Cache error:', error);
      // Fallback to direct fetch if caching fails
      return fetcher();
    }
  }

  /**
   * Invalidate cache keys
   */
  async invalidate(pattern: string): Promise<void> {
    if (!redis) return;

    try {
      const keys = await redis.keys(`woo:${pattern}*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }

  /**
   * Clear all WooCommerce cache
   */
  async clearAll(): Promise<void> {
    if (!redis) return;

    try {
      const keys = await redis.keys('woo:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

export const wooCache = WooCommerceCache.getInstance();