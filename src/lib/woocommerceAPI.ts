// WordPress/WooCommerce API utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL || 'https://demo.woocommerce.com/wp-json/wc/v3';
const CUSTOMER_KEY = process.env.NEXT_PUBLIC_WOO_CUSTOMER_KEY || '';
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || '';

interface WooAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

interface WooProduct {
  id: number;
  name: string;
  price: string;
  sale_price: string | null;
  description: string;
  short_description: string;
  images: Array<{ src: string }>;
  stock_status: string;
  categories: Array<{ name: string }>;
  sku: string;
  type?: string;
  attributes?: WooAttribute[];
  default_attributes?: WooDefaultAttribute[];
  variations?: number[];
  date_created?: string;
}

// Create Basic Auth header for WooCommerce API
const createAuthHeader = (): Record<string, string> => {
  if (!CUSTOMER_KEY || !CONSUMER_SECRET) {
    console.warn('⚠️ WooCommerce API credentials not configured');
    return {};
  }
  const credentials = btoa(`${CUSTOMER_KEY}:${CONSUMER_SECRET}`);
  return {
    Authorization: `Basic ${credentials}`,
  };
};

export async function fetchWooProducts(params?: { per_page?: number; page?: number }) {
  try {
    const searchParams = new URLSearchParams({
      per_page: (params?.per_page || 10).toString(),
      page: (params?.page || 1).toString(),
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(
      `${API_BASE_URL}/products?${searchParams.toString()}`,
      {
        method: 'GET',
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products: WooProduct[] = await response.json();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price || '0'),
      sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
      description: product.description || '',
      short_description: product.short_description || '',
      image: product.images?.[0]?.src || '',
      images: product.images || [],
      stock_status: product.stock_status,
      category: product.categories?.[0]?.name || 'Uncategorized',
      categories: product.categories || [],
      sku: product.sku,
      type: product.type || 'simple',
      attributes: product.attributes || [],
      default_attributes: product.default_attributes || [],
      variations: product.variations || [],
      date_created: product.date_created || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    return [];
  }
}

export async function fetchWooProductById(id: number) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product: WooProduct = await response.json();
    return {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price || '0'),
      sale_price: product.sale_price ? parseFloat(product.sale_price) : null,
      description: product.description || '',
      short_description: product.short_description || '',
      image: product.images?.[0]?.src || '',
      images: product.images || [],
      stock_status: product.stock_status,
      category: product.categories?.[0]?.name || 'Uncategorized',
      categories: product.categories || [],
      sku: product.sku,
      type: product.type || 'simple',
      attributes: product.attributes || [],
      default_attributes: product.default_attributes || [],
      variations: product.variations || [],
      date_created: product.date_created || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function fetchWooProductVariations(productId: number) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/products/${productId}/variations`, {
      method: 'GET',
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch variations: ${response.statusText}`);
    }

    const variations = await response.json();
    return variations;
  } catch (error) {
    console.error(`Error fetching variations for product ${productId}:`, error);
    return [];
  }
}

export async function fetchWooCategories() {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      method: 'GET',
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching WooCommerce categories:', error);
    return [];
  }
}

// Order interfaces
export interface OrderLineItem {
  product_id: number;
  quantity: number;
  price?: number;
  name?: string;
}

export interface OrderBilling {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
}

export interface OrderShipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CreateOrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: OrderBilling;
  shipping: OrderShipping;
  line_items: OrderLineItem[];
  customer_note?: string;
  meta_data?: Array<{ key: string; value: string }>;
}

export interface WooOrderResponse {
  id: number;
  number: string;
  status: string;
  total: string;
  date_created: string;
  billing: OrderBilling;
  shipping: OrderShipping;
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    total: string;
  }>;
}

// Create a new order in WooCommerce
export async function createWooOrder(orderData: CreateOrderData): Promise<WooOrderResponse | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WooCommerce order creation failed:', errorText);
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    const order: WooOrderResponse = await response.json();
    return order;
  } catch (error) {
    console.error('Error creating WooCommerce order:', error);
    return null;
  }
}

// Get order by ID
export async function getWooOrder(orderId: number): Promise<WooOrderResponse | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.statusText}`);
    }

    const order: WooOrderResponse = await response.json();
    return order;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
}

// Update order status
export async function updateWooOrderStatus(orderId: number, status: string): Promise<WooOrderResponse | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.statusText}`);
    }

    const order: WooOrderResponse = await response.json();
    return order;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    return null;
  }
}
