import { Tables } from "../Database";
import { StreetModel } from "./StreetModel";

export interface FocusedProjectModel {
    item: Tables<'proiecte'>,
    streetItem: StreetModel
}