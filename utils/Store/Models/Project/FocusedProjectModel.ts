import { Tables } from "../Database";
import { StreetModel } from "../Street/StreetModel";

export interface FocusedProjectModel {
    item: Tables<'proiecte'>,
    street: StreetModel,
}