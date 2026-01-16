'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { calculateDiscount } from '@/lib/utils';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';

export default function ProductGrid({
  products = DUMMY_PRODUCTS,
  isLoading = false,
}: {
  products?: typeof DUMMY_PRODUCTS;
  isLoading?: boolean;
}) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const hasDiscount = product.sale_price && product.sale_price < product.price;
        const discountPercent = hasDiscount ? calculateDiscount(product.price, product.sale_price!) : 0;

        return (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <Link href={`/product/${product.id}`} className="block relative">
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
                {product.stock_status === "instock" && (
                  <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    In Stock
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition line-clamp-2 text-sm">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs text-gray-500 mt-1">{product.category}</p>

              <div className="mt-3 flex items-baseline gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">Rs {product.sale_price}</span>
                    <span className="text-sm text-gray-500 line-through">Rs {product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">Rs {product.price}</span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={`flex-1 py-2 px-3 rounded-lg transition text-sm font-medium ${
                    addedId === product.id
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {addedId === product.id ? '✓ Added' : 'Add to Cart'}
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition">
                  ♡
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
