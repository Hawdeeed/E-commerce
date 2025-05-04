const { supabase } = require('./supabase');
import { Database } from './database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductWithImages = Product & { images: Database['public']['Tables']['product_images']['Row'][] };
export type ProductWithVariants = Product & { variants: Database['public']['Tables']['product_variants']['Row'][] };
export type ProductComplete = Product & { 
  images: Database['public']['Tables']['product_images']['Row'][], 
  variants: Database['public']['Tables']['product_variants']['Row'][], 
  category: Database['public']['Tables']['categories']['Row'] 
};

// Fetch all products with complete data
export async function getAllProducts(): Promise<ProductComplete[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*),
      variants:product_variants(*),
      category:categories(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as unknown as ProductComplete[];
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<ProductWithImages[]> {
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

  return data as unknown as ProductWithImages[];
}

// Fetch products by category
export async function getProductsByCategory(categoryId: string): Promise<ProductWithImages[]> {
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

  return data as unknown as ProductWithImages[];
}

// Fetch a single product by ID with all related data
export async function getProductById(productId: string): Promise<ProductComplete | null> {
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

  return data as unknown as ProductComplete;
}

// Fetch all categories
export async function getAllCategories() {
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

// Fetch all orders
export async function getAllOrders() {
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
