import { Enums, Tables } from "../Database"
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
    strazi: {
        created_at: string
        id: string
        name: string
        network_type: Enums<'network_type'>
        proiect_id: string
        road_type: Enums<'road_type'>
        markers: Tables<'markers'>[]
    }[]

}