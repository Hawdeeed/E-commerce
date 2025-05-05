export interface Category {
  id: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  sale_price?: number | null;
  category_id: string;
  image_url?: string | null;
  in_stock?: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string | null;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku?: string | null;
  price?: number | null;
  sale_price?: number | null;
  size?: string | null;
  color?: string[] | null;
  in_stock?: boolean;
  created_at?: string;
  updated_at?: string | null;
}

export interface Order {
  id: string;
  user_id?: string | null;
  status: string;
  total_amount: number;
  shipping_address?: Address | null;
  billing_address?: Address | null;
  payment_method?: string | null;
  customer_email?: string | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  // Extended properties
  items?: OrderItem[];
  tracking_number?: string | null;
  notes?: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_variant_id?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
  updated_at?: string | null;
  product?: {
    name: string;
    images: { url: string }[];
  };
  variant?: {
    name: string;
    size?: string;
    color?: string[];
  } | null;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
}

// Address interfaces for shipping and billing
export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Cart item interface
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: {
    name: string;
    size?: string;
    color?: string[];
  } | null;
}