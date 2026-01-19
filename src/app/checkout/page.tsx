'use client';

import { useCart } from '@/lib/cartContext';
import HeroSection from '@/components/HeroSection';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';

interface WooOrderInfo {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  orderTotal: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [wooOrder, setWooOrder] = useState<WooOrderInfo | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const orderNumberRef = useRef<string>(Math.random().toString(36).substr(2, 9).toUpperCase());
  
  // Store items before clearing cart (for order creation)
  const cartItemsRef = useRef(items);

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',

    // Payment method selection
    paymentMethod: 'stripe',
  });

  const totalPrice = getTotalPrice();

  // Keep track of cart items for order creation
  useEffect(() => {
    if (items.length > 0) {
      cartItemsRef.current = items;
    }
  }, [items]);

  // Create PaymentIntent when moving to payment step
  useEffect(() => {
    if (step === 'payment' && formData.paymentMethod === 'stripe' && items.length > 0) {
      createPaymentIntent();
    }
  }, [step, formData.paymentMethod]);

  const createPaymentIntent = async () => {
    try {
      setPaymentError(null);
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        setPaymentError(data.error);
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentError('Failed to initialize payment. Please try again.');
    }
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div>
        <HeroSection title="Checkout" subtitle="Complete your purchase" minHeight="sm" />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-6">Your cart is empty. Please add items before checkout.</p>
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
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

  // Create order in WooCommerce
  const createWooCommerceOrder = async (paymentMethod: 'stripe' | 'cod', stripePaymentIntentId?: string) => {
    const orderItems = cartItemsRef.current.length > 0 ? cartItemsRef.current : items;
    
    try {
      setOrderError(null);
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          paymentMethod: paymentMethod === 'stripe' ? 'stripe' : 'cod',
          paymentMethodTitle: paymentMethod === 'stripe' ? 'Credit/Debit Card (Stripe)' : 'Cash on Delivery',
          isPaid: paymentMethod === 'stripe',
          stripePaymentIntentId,
        }),
      });

      const data = await response.json();

      if (data.success && data.orderId) {
        setWooOrder({
          orderId: data.orderId,
          orderNumber: data.orderNumber,
          orderStatus: data.orderStatus,
          orderTotal: data.orderTotal,
        });
        return true;
      } else {
        console.error('Failed to create WooCommerce order:', data.error);
        setOrderError(data.error || 'Failed to create order');
        return false;
      }
    } catch (error) {
      console.error('Error creating WooCommerce order:', error);
      setOrderError('Failed to save order. Please contact support.');
      return false;
    }
  };

  const handlePaymentSuccess = async (paymentIntentId?: string) => {
    setIsProcessing(true);
    await createWooCommerceOrder('stripe', paymentIntentId);
    clearCart();
    setStep('success');
    setIsProcessing(false);
  };

  const handleCODSubmit = async () => {
    setIsProcessing(true);
    const success = await createWooCommerceOrder('cod');
    if (success) {
      clearCart();
      setStep('success');
    }
    setIsProcessing(false);
  };

  if (step === 'success') {
    return (
      <div>
        <HeroSection title="Order Complete!" subtitle="Thank you for your purchase" minHeight="sm" />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow p-8 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {formData.paymentMethod === 'stripe' ? 'Payment Successful!' : 'Order Placed!'}
            </h2>
            <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
            <p className="text-gray-600 mb-6">
              A confirmation email will be sent to <strong>{formData.email}</strong>
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">
                #{wooOrder?.orderNumber || orderNumberRef.current}
              </p>
              {wooOrder && (
                <p className="text-sm text-gray-500 mt-2">
                  Status: <span className="capitalize font-medium text-indigo-600">{wooOrder.orderStatus}</span>
                </p>
              )}
            </div>
            {formData.paymentMethod === 'cod' && (
              <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-left">
                <p className="text-yellow-800 font-medium mb-1">💵 Cash on Delivery</p>
                <p className="text-yellow-700 text-sm">
                  Please have <strong>Rs {wooOrder?.orderTotal || totalPrice}</strong> ready when your order arrives.
                </p>
              </div>
            )}
            {orderError && (
              <div className="bg-orange-50 p-4 rounded-lg mb-6 text-left">
                <p className="text-orange-800 font-medium mb-1">⚠️ Note</p>
                <p className="text-orange-700 text-sm">
                  Your payment was successful, but there was an issue saving the order. 
                  Please contact support with reference: {orderNumberRef.current}
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
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection title="Checkout" subtitle="Complete your purchase securely" minHeight="sm" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="mb-8 flex justify-between">
              {['shipping', 'payment'].map((s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step === s
                        ? 'bg-indigo-600 text-white'
                        : ['shipping', 'payment'].indexOf(step) > idx
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {['shipping', 'payment'].indexOf(step) > idx ? '✓' : idx + 1}
                  </div>
                  {idx < 1 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200">
                      <div
                        className={`h-full transition-all ${
                          ['shipping', 'payment'].indexOf(step) > idx
                            ? 'bg-green-600 w-full'
                            : 'bg-gray-200 w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Step */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={formData.paymentMethod === 'stripe'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Pay with Card</span>
                        <p className="text-sm text-gray-500">Credit/Debit Card via Stripe</p>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-2xl">💳</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Cash on Delivery</span>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                      <span className="text-2xl">💵</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/cart"
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold text-center"
                  >
                    Back to Cart
                  </Link>
                  <button
                    type="submit"
                    disabled={!isShippingValid}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {/* Payment Step - Stripe */}
            {step === 'payment' && formData.paymentMethod === 'stripe' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                {/* Shipping Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Shipping to:</p>
                      <p className="font-medium text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-gray-700">{formData.address}</p>
                      <p className="text-gray-700">
                        {formData.city}, {formData.postalCode}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {paymentError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {paymentError}
                    <button
                      onClick={createPaymentIntent}
                      className="ml-2 underline hover:no-underline"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {clientSecret && stripePromise ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#4f46e5',
                          borderRadius: '8px',
                        },
                      },
                    }}
                  >
                    <StripeCheckoutForm
                      onSuccess={handlePaymentSuccess}
                      onBack={() => setStep('shipping')}
                    />
                  </Elements>
                ) : !paymentError ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-600">Initializing payment...</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Payment Step - COD */}
            {step === 'payment' && formData.paymentMethod === 'cod' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cash on Delivery</h2>

                {/* Order Summary */}
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium mb-2">📦 Cash on Delivery Selected</p>
                  <p className="text-yellow-700 text-sm">
                    Please have the exact amount of <strong>Rs {totalPrice}</strong> ready when your order arrives.
                  </p>
                </div>

                {/* Shipping Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
                  <p className="text-gray-700">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-gray-700">{formData.address}</p>
                  <p className="text-gray-700">
                    {formData.city}, {formData.postalCode}
                  </p>
                  <p className="text-gray-700">{formData.country}</p>
                  <p className="text-gray-700 mt-2">
                    Email: {formData.email}
                  </p>
                  <p className="text-gray-700">
                    Phone: {formData.phone}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-gray-700 py-2 border-b border-gray-100">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">Rs {item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                      <span>Total</span>
                      <span>Rs {totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCODSubmit}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Placing Order...
                      </span>
                    ) : (
                      'Confirm Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-24 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Order Summary</h3>
              </div>

              <div className="p-4">
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">Rs {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>Rs {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Tax</span>
                    <span>Rs 0</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>Rs {totalPrice}</span>
                  </div>
                </div>

                {/* Secure Payment Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure checkout powered by Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
