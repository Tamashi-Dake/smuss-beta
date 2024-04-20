export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artist: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          name: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          created_at: string
          song_id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          song_id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          song_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_history_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: true
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_history_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: true
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      liked_songs: {
        Row: {
          created_at: string
          song_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          song_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          song_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_liked_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_liked_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_liked_songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      playlist: {
        Row: {
          artist_id: number | null
          created_at: string
          description: string | null
          id: number
          image_path: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          artist_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          artist_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_playlist_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      rel_song_artist: {
        Row: {
          artist_id: number
          created_at: string
          song_id: number
        }
        Insert: {
          artist_id: number
          created_at?: string
          song_id?: number
        }
        Update: {
          artist_id?: number
          created_at?: string
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_rel_song_artist_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_artist_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_artist_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      rel_song_category: {
        Row: {
          category_id: number
          created_at: string
          song_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          song_id?: number
        }
        Update: {
          category_id?: number
          created_at?: string
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_rel_song_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_category_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_category_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      rel_song_playlist: {
        Row: {
          created_at: string
          playlist_id: number
          song_id: number
        }
        Insert: {
          created_at?: string
          playlist_id: number
          song_id?: number
        }
        Update: {
          created_at?: string
          playlist_id?: number
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_rel_song_playlist_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_playlist_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "random_playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_playlist_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_rel_song_playlist_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      songs: {
        Row: {
          created_at: string
          id: number
          image_path: string | null
          lyric: string | null
          song_path: string | null
          time: string | null
          title: string | null
          user_id: string | null
          view: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_path?: string | null
          lyric?: string | null
          song_path?: string | null
          time?: string | null
          title?: string | null
          user_id?: string | null
          view?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          image_path?: string | null
          lyric?: string | null
          song_path?: string | null
          time?: string | null
          title?: string | null
          user_id?: string | null
          view?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active: boolean | null
          avatar_url: string | null
          billing_address: Json | null
          id: string
          payment_method: Json | null
          role: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          avatar_url?: string | null
          billing_address?: Json | null
          id: string
          payment_method?: Json | null
          role?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          avatar_url?: string | null
          billing_address?: Json | null
          id?: string
          payment_method?: Json | null
          role?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      views: {
        Row: {
          created_at: string
          song_id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          song_id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          song_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_views_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: true
            referencedRelation: "random_songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_views_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: true
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      random_playlists: {
        Row: {
          artist_id: number | null
          created_at: string | null
          description: string | null
          id: number | null
          image_path: string | null
          name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_playlist_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
        ]
      }
      random_songs: {
        Row: {
          created_at: string | null
          id: number | null
          image_path: string | null
          lyric: string | null
          song_path: string | null
          time: string | null
          title: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
