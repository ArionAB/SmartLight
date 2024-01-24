import supabase from "../../supabase/createClient";
import { setProjectItems } from "../Slices/projectSlice";
import { TablesInsert } from "../Models/Database";


export const getProjectAction = () => {
    return async (dispatch: any, getState: () => any) => {
        try {

            let { data: proiecte, error } = await supabase
                .from('proiecte')
                .select(`*,strazi(*,markers(*))`)


            if (!error) {
                console.log("Lista proiecte", proiecte)
                dispatch(setProjectItems(proiecte))
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

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