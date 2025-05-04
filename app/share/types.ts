export interface Category {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPercentage?: number;
  image: string;
  category: string;
  items?: number;
  description?: string;
  images?: { url: string }[];
  category_id?: string | null;
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

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price: number;
  unit_price?: number;
  product: {
    name: string;
    images: { url: string }[];
    [key: string]: any;
  };
  variant: {
    name: string;
    size: string;
    color: string;
    [key: string]: any;
  } | null;
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  tracking_number: string | null;
  notes: string | null;
  items: OrderItem[];
}

export interface CategoryResponse extends Category {
  [key: string]: any;
}

export interface OrderResponse extends Order {
  [key: string]: any;
}

export interface ProductResponse extends Product {
  [key: string]: any;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  [key: string]: any;
}