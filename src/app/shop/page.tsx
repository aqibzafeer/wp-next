'use client';

import HeroSection from '@/components/HeroSection';
import ProductsWithFilters from '@/components/ProductsWithFilters';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useWooProducts } from '@/hooks';

export default function WooProPage() {
  const { products, categories, loading, error } = useWooProducts({
    per_page: 50,
  });

  return (
    <div>
      <HeroSection
        title="SHOP"
        subtitle="Live products from your WordPress/WooCommerce store"
        eyebrow="WOO COMMERCE"
        image="/hero-section.jpeg"
        imageAlt="Shop collection"
        minHeight="lg"
        align="center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Loading Products...</h2>
              <p className="text-gray-600 mt-1">Please wait while we fetch your products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
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
            href={(id) => `/shop/${id}`}
            isWooCommerce={true}
          />
        )}
      </div>
    </div>
  );
}
