export interface getUserModel {
    created_at: string;
    email: string;
    first_name: string | null;
    id: string;
    last_name: string | null;
    role_type: "Admin" | "User" | "Visitor";
    deleted_at: string | null;
} 