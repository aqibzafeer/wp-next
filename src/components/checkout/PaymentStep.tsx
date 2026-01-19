'use client';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';
import type { PaymentMethod } from '@/types';

interface PaymentStepProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  clientSecret: string | null;
  paymentError: string | null;
  onPaymentSuccess: (paymentIntentId?: string) => void;
  onCODSubmit: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

export default function PaymentStep({
  paymentMethod,
  onPaymentMethodChange,
  clientSecret,
  paymentError,
  onPaymentSuccess,
  onCODSubmit,
  onBack,
  isProcessing,
}: PaymentStepProps) {
  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) =>
                onPaymentMethodChange(e.target.value as PaymentMethod)
              }
              className="mr-3"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Credit/Debit Card</p>
              <p className="text-sm text-gray-500">
                Pay securely with Stripe
              </p>
            </div>
            <div className="text-2xl">💳</div>
          </label>

          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) =>
                onPaymentMethodChange(e.target.value as PaymentMethod)
              }
              className="mr-3"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Cash on Delivery</p>
              <p className="text-sm text-gray-500">
                Pay when you receive your order
              </p>
            </div>
            <div className="text-2xl">💵</div>
          </label>
        </div>
      </div>

      {/* Stripe Payment Form */}
      {paymentMethod === 'stripe' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-800 text-sm">{paymentError}</p>
            </div>
          )}
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm
                onSuccess={onPaymentSuccess}
                onBack={onBack}
              />
            </Elements>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Initializing payment...</p>
            </div>
          )}
        </div>
      )}

      {/* COD Confirmation */}
      {paymentMethod === 'cod' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">
            Cash on Delivery Confirmation
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              You will pay in cash when your order is delivered.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Back
            </button>
            <button
              onClick={onCODSubmit}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              {isProcessing ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
