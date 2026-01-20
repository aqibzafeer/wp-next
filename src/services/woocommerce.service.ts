import type {
  WooProduct,
  WooProductRaw,
  WooVariation,
  WooOrderResponse,
  CreateOrderData,
} from '@/types';

// Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL ||
  'https://demo.woocommerce.com/wp-json/wc/v3';
const CUSTOMER_KEY = process.env.NEXT_PUBLIC_WOO_CUSTOMER_KEY || '';
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOO_CONSUMER_SECRET || '';

// ============================================
// CORE API CLIENT
// ============================================

/**
 * Creates Basic Auth header for WooCommerce API
 */
function createAuthHeader(): Record<string, string> {
  if (!CUSTOMER_KEY || !CONSUMER_SECRET) {
    console.warn('⚠️ WooCommerce API credentials not configured');
    return {};
  }
  const credentials = btoa(`${CUSTOMER_KEY}:${CONSUMER_SECRET}`);
  return {
    Authorization: `Basic ${credentials}`,
  };
}

/**
 * Generic WooCommerce API client with consistent error handling
 */
async function wooApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...createAuthHeader(),
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `WooCommerce API Error [${endpoint}]:`,
        response.status,
        errorText
      );
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in WooCommerce API request [${endpoint}]:`, error);
    return null;
  }
}

// ============================================
// PRODUCT SERVICES
// ============================================

interface FetchProductsParams {
  per_page?: number;
  page?: number;
}

/**
 * Fetch paginated products from WooCommerce
 */
export async function fetchWooProducts(
  params: FetchProductsParams = {}
): Promise<{ products: WooProduct[]; totalPages: number }> {
  const { per_page = 10, page = 1 } = params;

  const searchParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });

  const products = await wooApiRequest<WooProductRaw[]>(
    `/products?${searchParams.toString()}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!products) return { products: [], totalPages: 0 };

  // Get total pages from response headers if available
  const totalPages = 1; // This would need to be extracted from headers in a real implementation

  const mappedProducts = products.map((product) => ({
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

  return { products: mappedProducts, totalPages };
}

/**
 * Fetch single product by ID
 */
export async function fetchWooProductById(
  id: number
): Promise<WooProduct | null> {
  const product = await wooApiRequest<WooProductRaw>(`/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!product) return null;

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
  } as WooProduct;
}

/**
 * Fetch product variations for variable products
 */
export async function fetchWooProductVariations(
  productId: number
): Promise<WooVariation[]> {
  const variations = await wooApiRequest<WooVariation[]>(
    `/products/${productId}/variations`,
    {
      next: { revalidate: 3600 },
    }
  );

  return variations || [];
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: { src: string } | null;
  count: number;
}

/**
 * Fetch all product categories
 */
export async function fetchWooCategories(): Promise<WooCategory[]> {
  const categories = await wooApiRequest<WooCategory[]>(`/products/categories`, {
    next: { revalidate: 3600 },
  });

  return categories || [];
}

// ============================================
// ORDER SERVICES
// ============================================

/**
 * Create a new order in WooCommerce
 */
export async function createWooOrder(
  orderData: CreateOrderData
): Promise<WooOrderResponse | null> {
  return await wooApiRequest<WooOrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

/**
 * Get order by ID
 */
export async function getWooOrder(
  orderId: number
): Promise<WooOrderResponse | null> {
  return await wooApiRequest<WooOrderResponse>(`/orders/${orderId}`);
}

/**
 * Update order status
 */
export async function updateWooOrderStatus(
  orderId: number,
  status: string
): Promise<WooOrderResponse | null> {
  return await wooApiRequest<WooOrderResponse>(`/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
