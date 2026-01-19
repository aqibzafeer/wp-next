'use client';

import type { CartItem } from '@/types';

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export default function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow sticky top-24 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Order Summary</h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-3">Items ({items.length})</p>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded bg-gray-100"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  Rs {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Rs {totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-blue-600">Rs {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
