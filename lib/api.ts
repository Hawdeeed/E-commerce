import { supabase } from './supabase';
import { Product } from '../app/share/types';
import { Category } from '../app/share/types';
import { ProductImage } from '../app/share/types';
import { ProductVariant } from '../app/share/types';
import { Order } from '../app/share/types';
import { OrderItem } from '../app/share/types';

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*),
      images:product_images(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as unknown as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data as unknown as Product[];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data as unknown as Product[];
}

export async function getProductById(productId: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*),
      variants:product_variants(*),
      category:categories(*)
    `)
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as unknown as Product;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .update({ ...product, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
}

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    return null;
  }

  return data;
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .update({ ...category, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    return null;
  }

  return data;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    return false;
  }

  return true;
}

// Product Variant Functions
export async function createProductVariant(variant: Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>): Promise<ProductVariant | null> {
  const { data, error } = await supabase
    .from('product_variants')
    .insert(variant)
    .select()
    .single();

  if (error) {
    console.error('Error creating product variant:', error);
    return null;
  }

  return data;
}

export async function updateProductVariant(id: string, variant: Partial<ProductVariant>): Promise<ProductVariant | null> {
  const { data, error } = await supabase
    .from('product_variants')
    .update({ ...variant, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product variant:', error);
    return null;
  }

  return data;
}

export async function deleteProductVariant(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product variant:', error);
    return false;
  }

  return true;
}

// Product Image Functions
export async function createProductImage(image: Omit<ProductImage, 'id' | 'created_at' | 'updated_at'>): Promise<ProductImage | null> {
  const { data, error } = await supabase
    .from('product_images')
    .insert(image)
    .select()
    .single();

  if (error) {
    console.error('Error creating product image:', error);
    return null;
  }

  return data;
}

export async function updateProductImage(id: string, image: Partial<ProductImage>): Promise<ProductImage | null> {
  const { data, error } = await supabase
    .from('product_images')
    .update({ ...image, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product image:', error);
    return null;
  }

  return data;
}

export async function deleteProductImage(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product image:', error);
    return false;
  }

  return true;
}

// Order Functions
export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data;
}

export async function getOrderById(id: string): Promise<(Order & { items: OrderItem[] }) | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(
        *,
        product:products(*),
        variant:product_variants(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data as unknown as (Order & { items: OrderItem[] });
}

export async function createOrder(
  order: Omit<Order, 'id' | 'created_at' | 'updated_at'>,
  items: Array<Omit<OrderItem, 'id' | 'created_at' | 'updated_at' | 'order_id'>>
): Promise<Order | null> {
  // Start a transaction
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    return null;
  }

  // Add order items
  const orderItems = items.map(item => ({
    ...item,
    order_id: orderData.id
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    return null;
  }

  return orderData;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }

  return data;
}

// Dashboard Stats
export async function getDashboardStats(): Promise<{
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
}> {
  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: ordersCount },
    { data: revenue }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total_amount').eq('status', 'completed')
  ]);

  return {
    totalProducts: productsCount || 0,
    totalCategories: categoriesCount || 0,
    totalOrders: ordersCount || 0,
    totalRevenue: revenue?.reduce((total, item) => total + item.total_amount, 0) || 0
  };
}
