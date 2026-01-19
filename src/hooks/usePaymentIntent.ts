import { useState, useCallback } from 'react';
import type { CartItem, CustomerInfo, PaymentIntentResponse } from '@/types';

interface UsePaymentIntentReturn {
  clientSecret: string | null;
  error: string | null;
  loading: boolean;
  createPaymentIntent: (items: CartItem[], customerInfo: CustomerInfo) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for managing Stripe payment intents
 * Isolates payment creation logic from UI components
 */
export function usePaymentIntent(): UsePaymentIntentReturn {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createPaymentIntent = useCallback(
    async (items: CartItem[], customerInfo: CustomerInfo) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/create-payment-intent', {
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
            customerInfo,
          }),
        });

        const data: PaymentIntentResponse = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setClientSecret(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    clientSecret,
    error,
    loading,
    createPaymentIntent,
    reset,
  };
}
