import { Enums, Tables } from "../Database"
import { StreetModel } from "../Street/StreetModel"

export interface ProjectModel {
    created_at: string,
    id: string,
    lat?: string,
    long?: string,
    name: string,
    city: string,
    county: string,
    markers: [{
        count: number
    }],
    project_type: Enums<'project_type'>,
    strazi: StreetModel[]
}