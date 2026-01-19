import { useState, useEffect } from 'react';
import { fetchWooProducts } from '@/lib/woocommerceAPI';
import type { WooProduct } from '@/types';

interface UseWooProductsOptions {
  per_page?: number;
  page?: number;
  autoFetch?: boolean;
}

interface UseWooProductsReturn {
  products: WooProduct[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching WooCommerce products
 * Handles loading states, error handling, and category extraction
 */
export function useWooProducts(
  options: UseWooProductsOptions = {}
): UseWooProductsReturn {
  const { per_page = 50, page = 1, autoFetch = true } = options;

  const [products, setProducts] = useState<WooProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedProducts = await fetchWooProducts({ per_page, page });
      setProducts(fetchedProducts);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(fetchedProducts.map((p) => p.category))
      ).sort();
      setCategories(['All', ...uniqueCategories]);

      // Set error if no products found
      if (fetchedProducts.length === 0) {
        setError(
          'No products found. Make sure your WordPress API credentials are configured correctly.'
        );
      }
    } catch (err) {
      const errorMessage =
        'Failed to fetch products from WordPress. Please check your API configuration.';
      setError(errorMessage);
      console.error('Error fetching WooCommerce products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [per_page, page, autoFetch]);

  return {
    products,
    categories,
    loading,
    error,
    refetch: fetchProducts,
  };
}
