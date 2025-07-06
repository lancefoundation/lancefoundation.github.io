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
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          donor_email: string | null
          donor_id: string | null
          donor_name: string | null
          donor_phone: string | null
          id: string
          is_anonymous: boolean | null
          metadata: Json | null
          payment_method: string
          project_id: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          is_anonymous?: boolean | null
          metadata?: Json | null
          payment_method: string
          project_id?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          is_anonymous?: boolean | null
          metadata?: Json | null
          payment_method?: string
          project_id?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          status: Database["public"]["Enums"]["account_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: Database["public"]["Enums"]["account_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: Database["public"]["Enums"]["account_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          current_amount: number | null
          description: string | null
          end_date: string | null
          goal_amount: number
          id: string
          image_url: string | null
          location: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_amount?: number | null
          description?: string | null
          end_date?: string | null
          goal_amount?: number
          id?: string
          image_url?: string | null
          location?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_amount?: number | null
          description?: string | null
          end_date?: string | null
          goal_amount?: number
          id?: string
          image_url?: string | null
          location?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_stats: {
        Row: {
          id: string
          stat_name: string
          stat_value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          stat_name: string
          stat_value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          stat_name?: string
          stat_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          admin_notes: string | null
          applied_at: string
          availability: string | null
          cover_letter: string | null
          experience: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          role_id: string
          status: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          applied_at?: string
          availability?: string | null
          cover_letter?: string | null
          experience?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_id: string
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          applied_at?: string
          availability?: string | null
          cover_letter?: string | null
          experience?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_applications_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "volunteer_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          location: string | null
          open_positions: number | null
          requirements: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          open_positions?: number | null
          requirements?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          open_positions?: number | null
          requirements?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_user_approved: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      account_status: "pending" | "approved" | "rejected" | "suspended"
      application_status: "pending" | "reviewed" | "accepted" | "rejected"
      user_role: "superadmin" | "content_manager" | "volunteer" | "developer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["pending", "approved", "rejected", "suspended"],
      application_status: ["pending", "reviewed", "accepted", "rejected"],
      user_role: ["superadmin", "content_manager", "volunteer", "developer"],
    },
  },
} as const
