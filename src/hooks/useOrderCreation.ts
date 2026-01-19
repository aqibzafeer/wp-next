import { useState, useCallback } from 'react';
import type {
  CartItem,
  CustomerInfo,
  PaymentMethod,
  WooOrderInfo,
  OrderCreationResponse,
} from '@/types';

interface UseOrderCreationReturn {
  order: WooOrderInfo | null;
  error: string | null;
  loading: boolean;
  createOrder: (
    items: CartItem[],
    customerInfo: CustomerInfo,
    paymentMethod: PaymentMethod,
    stripePaymentIntentId?: string
  ) => Promise<boolean>;
  reset: () => void;
}

/**
 * Custom hook for creating WooCommerce orders
 * Encapsulates order creation logic with proper error handling
 */
export function useOrderCreation(): UseOrderCreationReturn {
  const [order, setOrder] = useState<WooOrderInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createOrder = useCallback(
    async (
      items: CartItem[],
      customerInfo: CustomerInfo,
      paymentMethod: PaymentMethod,
      stripePaymentIntentId?: string
    ): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            customerInfo: {
              firstName: customerInfo.firstName,
              lastName: customerInfo.lastName,
              email: customerInfo.email,
              phone: customerInfo.phone,
              address: customerInfo.address,
              city: customerInfo.city,
              postalCode: customerInfo.postalCode,
              country: customerInfo.country,
            },
            paymentMethod,
            paymentMethodTitle:
              paymentMethod === 'stripe'
                ? 'Credit/Debit Card (Stripe)'
                : 'Cash on Delivery',
            isPaid: paymentMethod === 'stripe',
            stripePaymentIntentId,
          }),
        });

        const data: OrderCreationResponse = await response.json();

        if (data.success && data.orderId) {
          setOrder({
            orderId: data.orderId,
            orderNumber: data.orderNumber,
            orderStatus: data.orderStatus,
            orderTotal: data.orderTotal,
          });
          return true;
        } else {
          console.error('Failed to create WooCommerce order:', data.error);
          setError(data.error || 'Failed to create order');
          return false;
        }
      } catch (err) {
        console.error('Error creating WooCommerce order:', err);
        setError('Failed to save order. Please contact support.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setOrder(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    order,
    error,
    loading,
    createOrder,
    reset,
  };
}
