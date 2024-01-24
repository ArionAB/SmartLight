import { StreetModel } from "./StreetModel"

export interface ProjectModel {
    created_at: string,
    id: string,
    lat?: string,
    long?: string,
    name: string
    strazi: StreetModel[]

}