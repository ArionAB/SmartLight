import { Enums } from "../Database"
import { StreetModel } from "./StreetModel"

export interface ProjectModel {
    created_at: string,
    id: string,
    lat?: string,
    long?: string,
    name: string,
    city: string,
    county: string,
    project_type: Enums<'project_type'>,
    strazi: StreetModel[]

}