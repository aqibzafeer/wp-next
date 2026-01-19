'use client';

import Link from 'next/link';
import type { WooOrderInfo, PaymentMethod } from '@/types';

interface OrderSuccessProps {
  orderNumber: string;
  email: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  wooOrder: WooOrderInfo | null;
  orderError: string | null;
}

export default function OrderSuccess({
  orderNumber,
  email,
  paymentMethod,
  totalPrice,
  wooOrder,
  orderError,
}: OrderSuccessProps) {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {paymentMethod === 'stripe' ? 'Payment Successful!' : 'Order Placed!'}
      </h2>

      <p className="text-gray-600 mb-2">
        Your order has been placed successfully.
      </p>

      <p className="text-gray-600 mb-6">
        A confirmation email will be sent to <strong>{email}</strong>
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-1">Order Number</p>
        <p className="text-2xl font-bold text-gray-900">
          #{wooOrder?.orderNumber || orderNumber}
        </p>
        {wooOrder && (
          <p className="text-sm text-gray-500 mt-2">
            Status:{' '}
            <span className="capitalize font-medium text-indigo-600">
              {wooOrder.orderStatus}
            </span>
          </p>
        )}
      </div>

      {paymentMethod === 'cod' && (
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-left">
          <p className="text-yellow-800 font-medium mb-1">
            💵 Cash on Delivery
          </p>
          <p className="text-yellow-700 text-sm">
            Please have <strong>Rs {wooOrder?.orderTotal || totalPrice}</strong>{' '}
            ready when your order arrives.
          </p>
        </div>
      )}

      {orderError && (
        <div className="bg-orange-50 p-4 rounded-lg mb-6 text-left">
          <p className="text-orange-800 font-medium mb-1">⚠️ Note</p>
          <p className="text-orange-700 text-sm">
            Your payment was successful, but there was an issue saving the
            order. Please contact support with reference: {orderNumber}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          href="/shop"
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="flex-1 border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
