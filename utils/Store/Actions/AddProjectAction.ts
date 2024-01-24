import supabase from "../../supabase/createClient";
import { TablesInsert } from "../Models/Database";

export const addProjectAction = (project: TablesInsert<'proiecte'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {


            const { data, error } = await supabase
                .from('proiecte')
                .insert([
                    project
                ])
                .select()

            if (!error) {
                console.log("Project addded", data)
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

