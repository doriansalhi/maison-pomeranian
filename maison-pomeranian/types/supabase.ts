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
      dog_profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          weight: number
          color: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          weight: number
          color?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          weight?: number
          color?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          stripe_session_id: string
          stripe_payment_intent: string | null
          customer_email: string
          customer_name: string | null
          amount_total: number
          amount_subtotal: number | null
          amount_shipping: number
          currency: string
          shipping_address: Json | null
          status: string
          payment_status: string | null
          paid_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          tracking_carrier: string | null
          tracking_number: string | null
          tracking_url: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          stripe_session_id: string
          stripe_payment_intent?: string | null
          customer_email: string
          customer_name?: string | null
          amount_total: number
          amount_subtotal?: number | null
          amount_shipping?: number
          currency?: string
          shipping_address?: Json | null
          status?: string
          payment_status?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          tracking_carrier?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          stripe_session_id?: string
          stripe_payment_intent?: string | null
          customer_email?: string
          customer_name?: string | null
          amount_total?: number
          amount_subtotal?: number | null
          amount_shipping?: number
          currency?: string
          shipping_address?: Json | null
          status?: string
          payment_status?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          tracking_carrier?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_slug: string | null
          product_name: string
          product_image: string | null
          selected_color: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_slug?: string | null
          product_name: string
          product_image?: string | null
          selected_color?: string | null
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_slug?: string | null
          product_name?: string
          product_image?: string | null
          selected_color?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      customer_profiles: {
        Row: {
          id: string
          clerk_id: string
          email: string
          first_name: string | null
          last_name: string | null
          stripe_customer_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          stripe_customer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          stripe_customer_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}