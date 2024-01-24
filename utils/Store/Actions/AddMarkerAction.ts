import { TablesInsert } from "@/utils/Store/Models/Database";
import supabase from "@/utils/supabase/createClient";

export const addLampAction = (marker: TablesInsert<'markers'>) => {
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
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

