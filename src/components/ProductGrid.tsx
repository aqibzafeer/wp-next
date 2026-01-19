'use client';

import Image from 'next/image';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { calculateDiscount } from '@/lib/utils';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/lib/toasterContext';
import type { WooProduct } from '@/types';

export default function ProductGrid({
  products = DUMMY_PRODUCTS as any,
  isLoading = false,
}: {
  products?: typeof DUMMY_PRODUCTS | WooProduct[];
  isLoading?: boolean;
}) {
  const { addToCart, addProductToCart } = useCart();
  const { addToast } = useToast();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (product: any) => {
    // Handle both WooProduct and dummy product formats
    if ('sku' in product) {
      // It's a WooProduct
      addProductToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        sale_price: product.sale_price,
        image: product.image,
        category: product.category,
      }, 1);
    } else {
      // It's a dummy product
      addToCart(product.id, 1);
    }
    setAddedId(product.id);
    addToast(`${product.name} added to cart`, 'success', 3000);
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
            className="group bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
          >
            <div className="block relative">
              <div className="aspect-square overflow-hidden bg-secondary relative">
                <img
                  src={product.image || '/products/not-found.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/products/not-found.jpg';
                  }}
                />
              </div>
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-accent text-text text-xs font-bold px-2 py-1 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
                {product.stock_status === "instock" && (
                  <span className="bg-primary text-text text-xs font-medium px-2 py-1 rounded-full">
                    In Stock
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-text line-clamp-2 text-sm">
                {product.name}
              </h3>

              <p className="text-text/70 text-xs mt-1">{product.category}</p>

              <div className="mt-3 flex items-baseline gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-lg font-bold text-text">Rs {product.sale_price}</span>
                    <span className="text-sm text-text/70 line-through">Rs {product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-text">Rs {product.price}</span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`flex-1 py-2 px-3 rounded-lg transition text-sm font-medium ${
                    addedId === product.id
                      ? 'bg-primary-hover text-background'
                      : 'bg-primary text-background hover:bg-primary-hover'
                  }`}
                >
                  {addedId === product.id ? '✓ Added' : 'Add to Cart'}
                </button>
                <button className="px-3 py-2 border border-border rounded-lg hover:border-primary transition">
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
