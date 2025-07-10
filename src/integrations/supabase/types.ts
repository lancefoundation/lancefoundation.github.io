export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      communication_logs: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string | null
          recipient_ids: string[] | null
          sender_id: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          template_used: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type?: string | null
          recipient_ids?: string[] | null
          sender_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_used?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string | null
          recipient_ids?: string[] | null
          sender_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_used?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_template_used_fkey"
            columns: ["template_used"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pages: {
        Row: {
          content: string | null
          created_at: string
          featured_image: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          page_type: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          page_type?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          page_type?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      email_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          updated_at: string
          variables: string[] | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          updated_at?: string
          variables?: string[] | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          updated_at?: string
          variables?: string[] | null
        }
        Relationships: []
      }
      impact_reports: {
        Row: {
          charts_data: Json | null
          content: string | null
          created_at: string
          generated_by: string | null
          id: string
          metrics: Json | null
          period_end: string
          period_start: string
          published_at: string | null
          report_type: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          charts_data?: Json | null
          content?: string | null
          created_at?: string
          generated_by?: string | null
          id?: string
          metrics?: Json | null
          period_end: string
          period_start: string
          published_at?: string | null
          report_type?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          charts_data?: Json | null
          content?: string | null
          created_at?: string
          generated_by?: string | null
          id?: string
          metrics?: Json | null
          period_end?: string
          period_start?: string
          published_at?: string | null
          report_type?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          cover_letter: string | null
          created_at: string
          id: string
          interview_date: string | null
          interview_notes: string | null
          job_id: string
          resume_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          interview_date?: string | null
          interview_notes?: string | null
          job_id: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          cover_letter?: string | null
          created_at?: string
          id?: string
          interview_date?: string | null
          interview_notes?: string | null
          job_id?: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          benefits: string[] | null
          created_at: string
          created_by: string | null
          deadline: string | null
          department: string | null
          description: string | null
          experience_level: string | null
          id: string
          job_type: string | null
          location: string | null
          positions_available: number | null
          requirements: string | null
          salary_range: string | null
          skills_required: string[] | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          positions_available?: number | null
          requirements?: string | null
          salary_range?: string | null
          skills_required?: string[] | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          department?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          positions_available?: number | null
          requirements?: string | null
          salary_range?: string | null
          skills_required?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          file_size: number
          file_type: string
          filename: string
          folder_path: string | null
          id: string
          is_public: boolean | null
          mime_type: string
          original_name: string
          tags: string[] | null
          updated_at: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          folder_path?: string | null
          id?: string
          is_public?: boolean | null
          mime_type: string
          original_name: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          folder_path?: string | null
          id?: string
          is_public?: boolean | null
          mime_type?: string
          original_name?: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      mpesa_transactions: {
        Row: {
          amount: number
          checkout_request_id: string | null
          created_at: string
          donation_id: string | null
          id: string
          merchant_request_id: string | null
          mpesa_receipt_number: string | null
          phone_number: string
          result_code: number | null
          result_desc: string | null
          status: string | null
          transaction_date: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          checkout_request_id?: string | null
          created_at?: string
          donation_id?: string | null
          id?: string
          merchant_request_id?: string | null
          mpesa_receipt_number?: string | null
          phone_number: string
          result_code?: number | null
          result_desc?: string | null
          status?: string | null
          transaction_date?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          checkout_request_id?: string | null
          created_at?: string
          donation_id?: string | null
          id?: string
          merchant_request_id?: string | null
          mpesa_receipt_number?: string | null
          phone_number?: string
          result_code?: number | null
          result_desc?: string | null
          status?: string | null
          transaction_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mpesa_transactions_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          approved: boolean | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          status: Database["public"]["Enums"]["account_status"] | null
          updated_at: string
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: Database["public"]["Enums"]["account_status"] | null
          updated_at?: string
        }
        Update: {
          approved?: boolean | null
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
      volunteer_management: {
        Row: {
          coordinator_id: string | null
          created_at: string
          hours_logged: number | null
          id: string
          last_activity_date: string | null
          performance_notes: string | null
          project_id: string | null
          role_assigned: string | null
          status: string | null
          tasks_assigned: string[] | null
          tasks_completed: string[] | null
          updated_at: string
          volunteer_id: string | null
        }
        Insert: {
          coordinator_id?: string | null
          created_at?: string
          hours_logged?: number | null
          id?: string
          last_activity_date?: string | null
          performance_notes?: string | null
          project_id?: string | null
          role_assigned?: string | null
          status?: string | null
          tasks_assigned?: string[] | null
          tasks_completed?: string[] | null
          updated_at?: string
          volunteer_id?: string | null
        }
        Update: {
          coordinator_id?: string | null
          created_at?: string
          hours_logged?: number | null
          id?: string
          last_activity_date?: string | null
          performance_notes?: string | null
          project_id?: string | null
          role_assigned?: string | null
          status?: string | null
          tasks_assigned?: string[] | null
          tasks_completed?: string[] | null
          updated_at?: string
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_management_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      website_analytics: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          country: string | null
          created_at: string
          date: string
          device_type: string | null
          id: string
          page_path: string
          page_views: number | null
          referrer_source: string | null
          updated_at: string
          visitors: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          country?: string | null
          created_at?: string
          date: string
          device_type?: string | null
          id?: string
          page_path: string
          page_views?: number | null
          referrer_source?: string | null
          updated_at?: string
          visitors?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          country?: string | null
          created_at?: string
          date?: string
          device_type?: string | null
          id?: string
          page_path?: string
          page_views?: number | null
          referrer_source?: string | null
          updated_at?: string
          visitors?: number | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
