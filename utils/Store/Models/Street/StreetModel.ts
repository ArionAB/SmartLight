import { Enums, Tables } from "../Database";

export interface StreetModel {
    created_at: string,
    id: string,
    name: string,
    network_type: Enums<'network_type'>,
    proiect_id: string,
    road_type: Enums<'road_type'>,
    markersArray: Tables<'markers'>[],
    markers: [{
        count: number
    }]
}