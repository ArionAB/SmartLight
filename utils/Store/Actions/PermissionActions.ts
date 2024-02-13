import supabase from "@/utils/supabase/createClient";
import { TablesInsert } from "../Models/Database";
import { addAppNotification } from "../Slices/appNotificationSlice";

export const assignUsersToProjectAction = (users: TablesInsert<'users_projects'>[]) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            console.log('users', users)
            const { data, error } = await supabase
                .from('users_projects')
                .insert(users)
                .select()
            if (!error) {
                console.log('data', data)
                dispatch(addAppNotification({ message: `Userii au fost adaugati la proiect!`, severity: 'success' }))
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare adaugare useri la proiect!`, severity: 'error' }))

            }

        } catch (error) {
            console.error('Error adding users to project', error);
        }
    };
};

