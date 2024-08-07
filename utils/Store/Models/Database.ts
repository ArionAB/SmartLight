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
          hub_c: boolean
          id: string
          images: string[] | null
          is_on: Database["public"]["Enums"]["marker_is_functional_type"] | null
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
          series_number: string | null
          street_id: string
          user_id: string | null
        }
        Insert: {
          accuracy?: string | null
          created_at?: string | null
          hub_c?: boolean
          id?: string
          images?: string[] | null
          is_on?:
            | Database["public"]["Enums"]["marker_is_functional_type"]
            | null
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
          series_number?: string | null
          street_id?: string
          user_id?: string | null
        }
        Update: {
          accuracy?: string | null
          created_at?: string | null
          hub_c?: boolean
          id?: string
          images?: string[] | null
          is_on?:
            | Database["public"]["Enums"]["marker_is_functional_type"]
            | null
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
          series_number?: string | null
          street_id?: string
          user_id?: string | null
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
          },
          {
            foreignKeyName: "public_markers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      proiecte: {
        Row: {
          city: string
          county: string
          created_at: string | null
          id: string
          info: string | null
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
          info?: string | null
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
          info?: string | null
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
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role_type: Database["public"]["Enums"]["role_type"]
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role_type?: Database["public"]["Enums"]["role_type"]
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
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
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assigned_users: {
        Args: {
          project_id: string
        }
        Returns: undefined
      }
      assigned_users2: {
        Args: {
          p_project_id: string
          p_users: Json
        }
        Returns: undefined
      }
      count_network_road_types: {
        Args: Record<PropertyKey, never>
        Returns: {
          network_type: Database["public"]["Enums"]["network_type"]
          road_type: Database["public"]["Enums"]["road_type"]
          count: number
        }[]
      }
    }
    Enums: {
      lamp_type: "Cu lampa" | "Fara lampa"
      marker_is_functional_type: "Functional" | "Nefunctional"
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
        | "Lemn"
        | "Panou solar"
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
