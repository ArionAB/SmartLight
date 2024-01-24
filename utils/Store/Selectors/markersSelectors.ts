import { Tables } from "../Models/Database";
import { RootState } from "../store";

export const selectMarkersItems = (state: RootState): Tables<'markers'>[] => {
    return state.project.projects;
};

