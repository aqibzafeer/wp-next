'use client';

import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (items.length === 0) {
    return (
      <div>
        <HeroSection
          title="Shopping Cart"
          subtitle="View and manage your items"
          minHeight="sm"
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div>
      <HeroSection
        title="Shopping Cart"
        subtitle={`${getTotalItems()} item${getTotalItems() !== 1 ? 's' : ''} in your cart`}
        minHeight="sm"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {showClearConfirm && (
                <div className="p-4 bg-yellow-50 border-b border-yellow-200 flex gap-3">
                  <p className="text-sm text-yellow-800 flex-1">Are you sure you want to clear your cart?</p>
                  <button
                    onClick={() => {
                      clearCart();
                      setShowClearConfirm(false);
                    }}
                    className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="text-sm px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                  >
                    No
                  </button>
                </div>
              )}

              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50 transition">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">Rs {item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 h-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-200 rounded transition text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-200 rounded transition text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="font-bold text-gray-900">Rs {item.price * item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-24 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Order Summary</h3>
              </div>

              <div className="p-4 space-y-4">
                {/* Summary Details */}
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Rs 0</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>Rs 0</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rs {totalPrice}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="w-full block text-center border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
