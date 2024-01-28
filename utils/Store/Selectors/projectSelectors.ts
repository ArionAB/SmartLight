import { Tables } from "../Models/Database";
import { FocusedProjectModel } from "../Models/Project/FocusedProjectModel";
import { ProjectModel } from "../Models/Project/ProjectModel";
import { RootState } from "../store";

export const selectProjectItems = (state: RootState): ProjectModel[] => {
    return state.project.projects;
};

export const selectStreetItems = (state: RootState): Tables<'strazi'>[] => {
    return state.project.streets
}

export const selectFocusedProject = (state: RootState): FocusedProjectModel => {
    return state.project.focusedProject
}