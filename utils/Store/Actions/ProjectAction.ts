import supabase from "../../supabase/createClient";
import { setProjectItems } from "../Slices/projectSlice";
import { TablesInsert } from "../Models/Database";
import { addAppNotification } from "../Slices/appNotificationSlice";


export const getProjectAction = () => {
    return async (dispatch: any, getState: () => any) => {
        try {

            let { data: proiecte, error } = await supabase
                .from('proiecte')
                .select(`*,strazi(*,markers(*))`)


            if (!error) {
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
                dispatch(addAppNotification({ message: `Proiectul ${data[0].city} a fost adaugat!`, severity: 'success' }))

                dispatch(getProjectAction())

            }

            if (error) {
                dispatch(addAppNotification({ message: `Proiectul nu a putut fi adaugat!`, severity: 'error' }))

            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};