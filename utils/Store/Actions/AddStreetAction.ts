import supabase from "../../supabase/createClient";
import { TablesInsert } from "../Models/Database";

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

