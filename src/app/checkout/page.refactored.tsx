'use client';

import { useCart } from '@/lib/cartContext';
import HeroSection from '@/components/HeroSection';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePaymentIntent, useOrderCreation } from '@/hooks';
import {
  ShippingForm,
  PaymentStep,
  OrderSuccess,
  OrderSummary,
} from '@/components/checkout';
import type { CheckoutFormData, CheckoutStep, PaymentMethod, CustomerInfo } from '@/types';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const orderNumberRef = useRef<string>(
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  // Store items before clearing cart (for order creation)
  const cartItemsRef = useRef(items);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'stripe',
  });

  const totalPrice = getTotalPrice();

  // Custom hooks for payment and order creation
  const {
    clientSecret,
    error: paymentError,
    createPaymentIntent,
  } = usePaymentIntent();

  const {
    order: wooOrder,
    error: orderError,
    createOrder,
  } = useOrderCreation();

  // Keep track of cart items for order creation
  useEffect(() => {
    if (items.length > 0) {
      cartItemsRef.current = items;
    }
  }, [items]);

  // Create PaymentIntent when moving to payment step with Stripe
  useEffect(() => {
    if (
      step === 'payment' &&
      formData.paymentMethod === 'stripe' &&
      items.length > 0 &&
      !clientSecret
    ) {
      const customerInfo: CustomerInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };
      createPaymentIntent(items, customerInfo);
    }
  }, [step, formData.paymentMethod, items.length]);

  // Handle empty cart
  if (items.length === 0 && step !== 'success') {
    return (
      <div>
        <HeroSection title="Checkout" subtitle="Complete your purchase" minHeight="sm" />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-6">
              Your cart is empty. Please add items before checkout.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/shop"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                WooCommerce Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isShippingValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.city &&
    formData.postalCode;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isShippingValid) {
      setStep('payment');
    }
  };

  const handlePaymentSuccess = async (paymentIntentId?: string) => {
    setIsProcessing(true);
    const orderItems = cartItemsRef.current.length > 0 ? cartItemsRef.current : items;
    const customerInfo: CustomerInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
    };
    await createOrder(orderItems, customerInfo, 'stripe', paymentIntentId);
    clearCart();
    setStep('success');
    setIsProcessing(false);
  };

  const handleCODSubmit = async () => {
    setIsProcessing(true);
    const orderItems = cartItemsRef.current.length > 0 ? cartItemsRef.current : items;
    const customerInfo: CustomerInfo = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
    };
    const success = await createOrder(orderItems, customerInfo, 'cod');
    if (success) {
      clearCart();
      setStep('success');
    }
    setIsProcessing(false);
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Success screen
  if (step === 'success') {
    return (
      <div>
        <HeroSection
          title="Order Complete!"
          subtitle="Thank you for your purchase"
          minHeight="sm"
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <OrderSuccess
            orderNumber={orderNumberRef.current}
            email={formData.email}
            paymentMethod={formData.paymentMethod}
            totalPrice={totalPrice}
            wooOrder={wooOrder}
            orderError={orderError}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title="Checkout"
        subtitle={`Complete your order - ${items.length} item${items.length !== 1 ? 's' : ''}`}
        minHeight="sm"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step === 'shipping'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {step === 'shipping' ? '1' : '✓'}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step === 'payment'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-gray-300 text-gray-600">
                3
              </div>
              <span className="text-sm font-medium">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {step === 'shipping' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    Shipping Information
                  </h2>
                  <ShippingForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleShippingSubmit}
                    isValid={Boolean(isShippingValid)}
                  />
                </>
              )}

              {step === 'payment' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  <PaymentStep
                    paymentMethod={formData.paymentMethod}
                    onPaymentMethodChange={handlePaymentMethodChange}
                    clientSecret={clientSecret}
                    paymentError={paymentError}
                    onPaymentSuccess={handlePaymentSuccess}
                    onCODSubmit={handleCODSubmit}
                    onBack={() => setStep('shipping')}
                    isProcessing={isProcessing}
                  />
                </>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
