import supabase from "../../supabase/createClient";
import { Tables, TablesInsert, TablesUpdate } from "../Models/Database";
import { setMarkersItems } from "../Slices/markersSlice";
import { setMarker } from "../Slices/projectSlice";

export const getMarkersAction = (street_id?: string) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            if (street_id) {
                let { data: markers, error } = await supabase
                    .from('markers')
                    .select('*')
                    .eq('street_id', street_id)

                if (!error) {
                    console.log("1 marker", markers)
                    // dispatch(setMarkersItems(markers))
                }

                if (error) {
                    throw error;
                }
            } else {
                let { data: markers, error } = await supabase
                    .from('markers')
                    .select('*')

                if (!error) {
                    console.log("Lista markers", markers)
                    dispatch(setMarkersItems(markers))
                }

                if (error) {
                    throw error;
                }
            }


        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};


export const addMarkerAction = (marker: TablesInsert<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('markers')
                .insert([
                    marker
                ])
                .select()

            if (!error) {
                console.log("marker added", data)
                dispatch(setMarker(data[0]))
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const updateMarkerAction = (marker: TablesUpdate<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            console.log(marker)

            const { data, error } = await supabase
                .from('markers')
                .update(marker)
                .eq('id', marker.id!)
                .select()

            if (!error) {
                console.log("marker updatingd", data)
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const deleteMarkerAction = (marker: Tables<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {


            const { error } = await supabase
                .from('markers')
                .delete()
                .eq('id', marker.id)

            if (!error) {
                console.log("Marker deleted", marker)
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
}
