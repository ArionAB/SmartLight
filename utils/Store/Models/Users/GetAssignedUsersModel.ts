export interface getAssignedUsersModel {
    created_at: string;
    id: string;
    project_id: string;
    user_id: string;
    users: {
        email: string;
    }
}