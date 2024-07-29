import { Enums } from "../Database"
import { StreetModel } from "../Street/StreetModel"

export interface MarkerModel {
    accuracy: string | null
    created_at: string | null
    hub_c: boolean
    id: string
    images: string[] | null
    lamp_type: Enums<'lamp_type'> | null
    latitude: string
    longitude: string
    marker_status: Enums<'marker_status'>
    marker_type: Enums<'marker_type'> | null
    name: string | null
    number: number
    observatii: string | null
    pole_type: Enums<'pole_type'> | null
    power_type: Enums<'power_type'> | null
    proiect_id: string
    sensor_type: Enums<'sensor_type'> | null
    series_number: string | null
    street_id: string
    user_id: string | null,
    strazi: StreetModel | any,
    is_on: Enums<'marker_is_functional_type'> | null
}
