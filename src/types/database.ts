export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'client' | 'designer' | 'admin'
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'client' | 'designer' | 'admin'
          phone?: string | null
          created_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          design_id: string
          client_id: string
          designer_id: string
          status: 'pending' | 'in_progress' | 'delivered' | 'paid' | 'completed' | 'revision_requested'
          tier: 'basic' | 'intermediate' | 'premium'
          price: number
          retouches_used: number
          max_retouches: number
          custom_text: string | null
          phone_number: string | null
          event_date: string | null
          event_location: string | null
          additional_notes: string | null
          color_preference: string | null
          amount: string | null
          social_links: Json | null
          photo_url: string | null
          logo_url: string | null
          delivery_deadline: string | null
          paid_at: string | null
          delivered_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          design_id: string
          client_id: string
          designer_id: string
          status?: 'pending' | 'in_progress' | 'delivered' | 'paid' | 'completed' | 'revision_requested'
          tier: 'basic' | 'intermediate' | 'premium'
          price: number
          retouches_used?: number
          max_retouches: number
          custom_text?: string | null
          phone_number?: string | null
          event_date?: string | null
          event_location?: string | null
          additional_notes?: string | null
          color_preference?: string | null
          amount?: string | null
          social_links?: Json | null
          photo_url?: string | null
          logo_url?: string | null
          delivery_deadline?: string | null
          paid_at?: string | null
          delivered_at?: string | null
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'in_progress' | 'delivered' | 'paid' | 'completed' | 'revision_requested'
          retouches_used?: number
          photo_url?: string | null
          logo_url?: string | null
          paid_at?: string | null
          delivered_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          order_id: string
          sender_id: string | null
          sender_type: 'client' | 'designer' | 'system'
          content: string
          attachments: Json | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          sender_id?: string | null
          sender_type: 'client' | 'designer' | 'system'
          content: string
          attachments?: Json | null
          read?: boolean
          created_at?: string
        }
        Update: {
          read?: boolean
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
