'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';

export default function ProductAddToCart({ productId }: { productId: number }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showCartLink, setShowCartLink] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId, quantity);
    setIsAdded(true);
    setShowCartLink(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-center border border-border rounded-lg w-fit">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-2 hover:bg-secondary transition"
        >
          −
        </button>
        <span className="px-4 py-2 font-weight-bold border-l border-r border-border">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-2 hover:bg-secondary transition"
        >
          +
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 rounded-lg font-weight-bold transition ${
            isAdded
              ? 'bg-green-600 text-background'
              : 'bg-primary text-background hover:bg-primary-hover'
          }`}
        >
          {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
        {showCartLink && (
          <Link
            href="/cart"
            className="px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary-hover font-weight-bold transition"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
}
