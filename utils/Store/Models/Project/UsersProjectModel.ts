import { ProjectModel } from "./ProjectModel";

export interface UsersProjectModel {
    created_at: string,
    id: string,
    project_id: string,
    user_id: string,
    proiecte: ProjectModel
}