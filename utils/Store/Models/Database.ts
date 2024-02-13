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
      markers: {
        Row: {
          accuracy: string | null
          created_at: string | null
          id: string
          images: string[] | null
          lamp_type: Database["public"]["Enums"]["lamp_type"] | null
          latitude: string
          longitude: string
          marker_status: Database["public"]["Enums"]["marker_status"]
          marker_type: Database["public"]["Enums"]["marker_type"] | null
          name: string | null
          number: number
          observatii: string | null
          pole_type: Database["public"]["Enums"]["pole_type"] | null
          power_type: Database["public"]["Enums"]["power_type"] | null
          proiect_id: string
          sensor_type: Database["public"]["Enums"]["sensor_type"] | null
          street_id: string
        }
        Insert: {
          accuracy?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          lamp_type?: Database["public"]["Enums"]["lamp_type"] | null
          latitude: string
          longitude: string
          marker_status: Database["public"]["Enums"]["marker_status"]
          marker_type?: Database["public"]["Enums"]["marker_type"] | null
          name?: string | null
          number: number
          observatii?: string | null
          pole_type?: Database["public"]["Enums"]["pole_type"] | null
          power_type?: Database["public"]["Enums"]["power_type"] | null
          proiect_id?: string
          sensor_type?: Database["public"]["Enums"]["sensor_type"] | null
          street_id?: string
        }
        Update: {
          accuracy?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          lamp_type?: Database["public"]["Enums"]["lamp_type"] | null
          latitude?: string
          longitude?: string
          marker_status?: Database["public"]["Enums"]["marker_status"]
          marker_type?: Database["public"]["Enums"]["marker_type"] | null
          name?: string | null
          number?: number
          observatii?: string | null
          pole_type?: Database["public"]["Enums"]["pole_type"] | null
          power_type?: Database["public"]["Enums"]["power_type"] | null
          proiect_id?: string
          sensor_type?: Database["public"]["Enums"]["sensor_type"] | null
          street_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_markers_proiect_id_fkey"
            columns: ["proiect_id"]
            isOneToOne: false
            referencedRelation: "proiecte"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_markers_street_id_fkey"
            columns: ["street_id"]
            isOneToOne: false
            referencedRelation: "strazi"
            referencedColumns: ["id"]
          }
        ]
      }
      proiecte: {
        Row: {
          city: string
          county: string
          created_at: string | null
          id: string
          lat: number
          long: number
          name: string | null
          project_type: Database["public"]["Enums"]["project_type"]
        }
        Insert: {
          city: string
          county: string
          created_at?: string | null
          id?: string
          lat: number
          long: number
          name?: string | null
          project_type: Database["public"]["Enums"]["project_type"]
        }
        Update: {
          city?: string
          county?: string
          created_at?: string | null
          id?: string
          lat?: number
          long?: number
          name?: string | null
          project_type?: Database["public"]["Enums"]["project_type"]
        }
        Relationships: []
      }
      strazi: {
        Row: {
          created_at: string | null
          id: string
          name: string
          network_type: Database["public"]["Enums"]["network_type"]
          proiect_id: string
          road_type: Database["public"]["Enums"]["road_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          network_type: Database["public"]["Enums"]["network_type"]
          proiect_id?: string
          road_type: Database["public"]["Enums"]["road_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          network_type?: Database["public"]["Enums"]["network_type"]
          proiect_id?: string
          road_type?: Database["public"]["Enums"]["road_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_strazi_proiect_id_fkey"
            columns: ["proiect_id"]
            isOneToOne: false
            referencedRelation: "proiecte"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role_type: Database["public"]["Enums"]["role_type"]
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role_type: Database["public"]["Enums"]["role_type"]
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role_type?: Database["public"]["Enums"]["role_type"]
        }
        Relationships: []
      }
      users_projects: {
        Row: {
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "proiecte"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      lamp_type: "Cu lampa" | "Fara lampa"
      marker_status: "Ok" | "Bad"
      marker_type: "Lampa" | "Stalp" | "Senzor"
      network_type: "Torsadat" | "Subteran" | "Clasic"
      pole_type:
        | "SE4"
        | "SE10"
        | "SE11"
        | "SCP10001"
        | "SCP10002"
        | "SCP10005"
        | "Metal h6"
        | "Lampadar Metalic"
        | "Metal h8"
        | "Lampadar beton"
        | "SCP10007"
      power_type: "30W" | "60W" | "80W"
      project_type: "Stalpi" | "Lampi"
      road_type: "M1" | "M2" | "M3" | "M4" | "M5" | "M6"
      role_type: "Admin" | "User" | "Visitor"
      sensor_type: "Senzor" | "Punct de aprindere"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
