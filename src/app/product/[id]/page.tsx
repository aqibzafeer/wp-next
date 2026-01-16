import HeroSection from '@/components/HeroSection';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { calculateDiscount } from '@/lib/utils';
import Link from 'next/link';
import ProductAddToCart from '@/components/ProductAddToCart';
import { use } from 'react';

export const generateStaticParams = async () => {
  return DUMMY_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = DUMMY_PRODUCTS.find(p => p.id === parseInt(resolvedParams.id));

  if (!product) {
    return (
      <div>
        <HeroSection
          title="Product Not Found"
          subtitle="The product you're looking for doesn't exist"
          minHeight="sm"
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/products" className="text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.price, product.sale_price!) : 0;

  return (
    <div>
      <HeroSection
        title={product.name}
        subtitle={product.category}
        minHeight="sm"
        image={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 md:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>

            {/* Price */}
            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">Rs {product.sale_price}</span>
                  <span className="text-lg text-gray-500 line-through">Rs {product.price}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded">-{discountPercent}%</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">Rs {product.price}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock_status === 'instock' ? (
                <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded">
                  In Stock
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <ProductAddToCart productId={product.id} />
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400">
                ♡ Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• High quality materials</li>
                <li>• Comfortable fit</li>
                <li>• Premium finishing</li>
                <li>• Perfect for any occasion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
