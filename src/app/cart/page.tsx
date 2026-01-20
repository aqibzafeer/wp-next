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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
            <div className="text-5xl sm:text-6xl mb-4">🛒</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Looks like you haven't added any items yet</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-semibold"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center bg-gray-50">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Cart Items</h2>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {showClearConfirm && (
                <div className="p-3 sm:p-4 bg-yellow-50 border-b border-yellow-200 flex flex-col sm:flex-row gap-3">
                  <p className="text-xs sm:text-sm text-yellow-800 flex-1">Are you sure you want to clear your cart?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="text-xs sm:text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="text-xs sm:text-sm px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}

              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item.id} className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 hover:bg-gray-50 transition">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.id}`}
                        className="font-semibold text-sm sm:text-base text-gray-900 hover:text-blue-600 transition line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.category}</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">Rs {item.price}</p>
                    </div>

                    {/* Quantity Controls & Subtotal */}
                    <div className="flex flex-col items-end gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-200 rounded transition text-lg font-bold"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-900 w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-200 rounded transition text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm sm:text-base">Rs {item.price * item.quantity}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden lg:sticky lg:top-24">
              <div className="bg-gray-50 p-3 sm:p-4 border-b border-gray-200">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">Order Summary</h3>
              </div>

              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {/* Summary Details */}
                <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Rs 0</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Tax</span>
                    <span>Rs 0</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-base sm:text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rs {totalPrice}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full block text-center bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="w-full block text-center border-2 border-blue-600 text-blue-600 py-1.5 sm:py-2 rounded-lg hover:bg-blue-50 transition font-semibold text-sm sm:text-base"
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
