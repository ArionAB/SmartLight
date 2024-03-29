import { FocusedProjectModel } from "../Models/Project/FocusedProjectModel";
import { ProjectModel } from "../Models/Project/ProjectModel";
import { StreetModel } from "../Models/Street/StreetModel";

export interface ProjectState {
    projects: ProjectModel[] | undefined,
    streets: StreetModel[],
    focusedProject: FocusedProjectModel
}
