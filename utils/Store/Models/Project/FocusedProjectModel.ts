import { Tables } from "../Database";

export interface FocusedProjectModel {
    item: Tables<'proiecte'>,
    street: Tables<'strazi'>
}