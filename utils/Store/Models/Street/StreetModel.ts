import { Enums, Tables } from "../Database";
import { MarkerModel } from "../Markers/MarkerModel";

export interface StreetModel {
    created_at: string,
    id: string,
    name: string,
    network_type: Enums<'network_type'>,
    proiect_id: string,
    road_type: Enums<'road_type'>,
    markersArray: MarkerModel[],
    markers: [{
        count: number
    }]
}