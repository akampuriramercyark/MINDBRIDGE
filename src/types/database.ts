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
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      mood_logs: {
        Row: {
          id: string
          user_id: string
          mood: string
          intensity: number | null
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: string
          intensity?: number | null
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: string
          intensity?: number | null
          note?: string | null
          created_at?: string
        }
      }
      journals: {
        Row: {
          id: string
          user_id: string
          title: string | null
          content: string
          mood_tag: string | null
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          content: string
          mood_tag?: string | null
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          content?: string
          mood_tag?: string | null
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          sender: 'user' | 'ai'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          sender: 'user' | 'ai'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          sender?: 'user' | 'ai'
          content?: string
          created_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          author_id: string | null
          content: string
          category: string
          is_anonymous: boolean
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          author_id?: string | null
          content: string
          category: string
          is_anonymous?: boolean
          likes_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          author_id?: string | null
          content?: string
          category?: string
          is_anonymous?: boolean
          likes_count?: number
          created_at?: string
        }
      }
      therapists: {
        Row: {
          id: string
          full_name: string
          specialization: string[]
          bio: string | null
          avatar_url: string | null
          contact_email: string | null
          booking_url: string | null
          is_verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          specialization: string[]
          bio?: string | null
          avatar_url?: string | null
          contact_email?: string | null
          booking_url?: string | null
          is_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          specialization?: string[]
          bio?: string | null
          avatar_url?: string | null
          contact_email?: string | null
          booking_url?: string | null
          is_verified?: boolean
          created_at?: string
        }
      }
    }
  }
}
