import supabase from "../../supabase/createClient";
import { setMarkersItems } from "../Slices/markersSlice";

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

