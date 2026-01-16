import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('Stripe secret key is not configured');
}

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate total amount in cents (Stripe requires amounts in smallest currency unit)
    const amount = items.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity * 100,
      0
    );

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'pkr',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_name: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',
        shipping_address: customerInfo?.address || '',
        shipping_city: customerInfo?.city || '',
        shipping_postal: customerInfo?.postalCode || '',
        shipping_country: customerInfo?.country || '',
        items_count: items.length.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
