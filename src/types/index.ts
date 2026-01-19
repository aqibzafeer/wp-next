// Centralized type definitions for the entire application

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string;
  category: string;
  description: string;
  stock_status: string;
}

export interface WooProduct extends Product {
  short_description: string;
  images: Array<{ src: string }>;
  categories: Array<{ name: string }>;
  sku: string;
  type?: string;
  attributes?: WooAttribute[];
  default_attributes?: WooDefaultAttribute[];
  variations?: number[];
  date_created?: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WooVariation {
  id: number;
  price: string;
  sale_price: string | null;
  stock_status: string;
  attributes: Array<{ name: string; option: string }>;
  images: Array<{ src: string }>;
}

// ============================================
// CART TYPES
// ============================================

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
  category: string;
}

export interface ProductInfo {
  id: number;
  name: string;
  price: number;
  sale_price?: number | null;
  image: string;
  category: string;
}

// ============================================
// ORDER TYPES
// ============================================

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

export interface WooOrderInfo {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  orderTotal: string;
}

// ============================================
// CHECKOUT TYPES
// ============================================

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutFormData extends CustomerInfo {
  paymentMethod: 'stripe' | 'cod';
}

export type CheckoutStep = 'shipping' | 'payment' | 'success';

export type PaymentMethod = 'stripe' | 'cod';

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  error?: string;
}

export interface OrderCreationResponse {
  success: boolean;
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  orderTotal: string;
  message: string;
  error?: string;
}
