import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key is not configured');
}

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;
