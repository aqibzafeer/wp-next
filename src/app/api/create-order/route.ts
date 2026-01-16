import { NextRequest, NextResponse } from 'next/server';
import { createWooOrder, CreateOrderData } from '@/lib/woocommerceAPI';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      items, 
      customerInfo, 
      paymentMethod, 
      paymentMethodTitle,
      isPaid,
      stripePaymentIntentId 
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    if (!customerInfo) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      );
    }

    // Prepare line items for WooCommerce
    const lineItems = items.map((item: { id: number; quantity: number; name?: string; price?: number }) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    // Prepare billing and shipping info
    const billing = {
      first_name: customerInfo.firstName || '',
      last_name: customerInfo.lastName || '',
      email: customerInfo.email || '',
      phone: customerInfo.phone || '',
      address_1: customerInfo.address || '',
      city: customerInfo.city || '',
      postcode: customerInfo.postalCode || '',
      country: customerInfo.country || 'PK',
    };

    const shipping = {
      first_name: customerInfo.firstName || '',
      last_name: customerInfo.lastName || '',
      address_1: customerInfo.address || '',
      city: customerInfo.city || '',
      postcode: customerInfo.postalCode || '',
      country: customerInfo.country || 'PK',
    };

    // Build order data
    const orderData: CreateOrderData = {
      payment_method: paymentMethod || 'cod',
      payment_method_title: paymentMethodTitle || 'Cash on Delivery',
      set_paid: isPaid || false,
      billing,
      shipping,
      line_items: lineItems,
      meta_data: stripePaymentIntentId 
        ? [{ key: '_stripe_payment_intent_id', value: stripePaymentIntentId }]
        : [],
    };

    // Create order in WooCommerce
    const order = await createWooOrder(orderData);

    if (!order) {
      return NextResponse.json(
        { error: 'Failed to create order in WooCommerce' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.number,
      orderStatus: order.status,
      orderTotal: order.total,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
