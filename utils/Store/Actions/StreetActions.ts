import supabase from "../../supabase/createClient";
import { TablesInsert } from "../Models/Database";
import { setStreetItems } from "../Slices/projectSlice";

export const addStreetAction = (street: TablesInsert<'strazi'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            console.log(street)
            const { data, error } = await supabase
                .from('strazi')
                .insert([
                    street
                ])
                .select()

            if (!error) {
                console.log("street added", data)
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const getStreetAction = (proiect_id?: string) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            if (proiect_id) {
                let { data: strazi, error } = await supabase
                    .from('strazi')
                    .select('*')
                    .eq('proiect_id', proiect_id)

                if (!error) {
                    console.log("Lista strazi", strazi)
                    return {
                        severity: 'success',
                        data: strazi
                    }
                }

                if (error) {
                    throw error;
                }

            } else {
                let { data: strazi, error } = await supabase
                    .from('strazi')
                    .select('*')


                if (!error) {
                    console.log("Lista strazi", strazi)
                    dispatch(setStreetItems(strazi))

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

