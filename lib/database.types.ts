export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          sale_price: number | null
          category_id: string
          image_url: string | null
          in_stock: boolean
          featured: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          sale_price?: number | null
          category_id: string
          image_url?: string | null
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          category_id?: string
          image_url?: string | null
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number | null
          sale_price: number | null
          size: string | null
          color: string | null
          in_stock: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price?: number | null
          sale_price?: number | null
          size?: string | null
          color?: string | null
          in_stock?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price?: number | null
          sale_price?: number | null
          size?: string | null
          color?: string | null
          in_stock?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt_text: string | null
          is_primary: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt_text?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt_text?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: string
          total_amount: number
          shipping_address: Json | null
          billing_address: Json | null
          payment_intent_id: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount: number
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount?: number
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_intent_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_variant_id: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_variant_id?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          product_variant_id?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
