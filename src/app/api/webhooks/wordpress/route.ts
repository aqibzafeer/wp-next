import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Webhook endpoint for WordPress content updates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, post_id, post_type } = body;

    // Verify webhook signature (implement proper verification)
    const signature = request.headers.get('x-wp-webhook-signature');
    // Add signature verification logic here

    if (action === 'updated' && post_type === 'product') {
      // Revalidate shop page
      revalidatePath('/shop');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}