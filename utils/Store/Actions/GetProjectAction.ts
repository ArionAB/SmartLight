import supabase from "../../supabase/createClient";
import { setProjectItems } from "../Slices/projectSlice";

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

