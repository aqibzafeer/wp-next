'use client';

import { useState, useEffect, useMemo } from 'react';
import HeroSection from '@/components/HeroSection';
import ProductsWithFilters from '@/components/ProductsWithFilters';
import { fetchWooProducts, fetchWooCategories } from '@/lib/woocommerceAPI';

interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string;
  category: string;
  description: string;
  stock_status: string;
}

export default function WooProPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const wooProducts = await fetchWooProducts({ per_page: 50 });
        setProducts(wooProducts);

        const uniqueCategories = Array.from(
          new Set(wooProducts.map((p) => p.category))
        ).sort();
        setCategories(['All', ...uniqueCategories]);

        if (wooProducts.length === 0) {
          setError('No products found. Make sure your WordPress API credentials are configured correctly.');
        }
      } catch (err) {
        setError('Failed to fetch products from WordPress. Please check your API configuration.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <HeroSection
        title="WordPress Products"
        subtitle="Live products from your WordPress/WooCommerce store"
        eyebrow="WOO COMMERCE"
        minHeight="sm"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              <strong>Note:</strong> {error}
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              To fetch products, configure your WordPress/WooCommerce API credentials in{' '}
              <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        )}

        {!loading && products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Setup Required</h3>
              <p className="text-blue-700 text-sm mb-4">To fetch products from WordPress, you need to:</p>
              <ol className="text-left text-blue-700 text-sm space-y-2 mb-4">
                <li>1. Generate WooCommerce REST API keys</li>
                <li>
                  2. Add them to your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code>
                </li>
                <li>3. Ensure the API URL is correct</li>
                <li>4. Refresh the page</li>
              </ol>
              <a
                href="https://woocommerce.com/document/rest-api/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View API Documentation →
              </a>
            </div>
          </div>
        ) : (
          <ProductsWithFilters
            products={products}
            categories={categories}
            href={(id) => `/wp-pro/${id}`}
            isWooCommerce={true}
          />
        )}
      </div>
    </div>
  );
}
