import { Enums, Tables } from "../Database"
import { StreetModel } from "../Street/StreetModel"

export interface ProjectModel {
    created_at: string | null,
    id: string,
    lat: number,
    long: number,
    name: string | null,
    city: string,
    county: string,
    info: string | null,
    markers: [{
        count: number
    }],
    project_type: Enums<'project_type'>,
    strazi: StreetModel[]
}