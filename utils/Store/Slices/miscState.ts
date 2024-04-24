import { FilterModel } from "../Models/Filter/FilterModel";

export interface miscState {
    drawer: boolean,
    tooltips: boolean,
    hasInternet: boolean,
    filters: FilterModel,
    myProjects: boolean
}