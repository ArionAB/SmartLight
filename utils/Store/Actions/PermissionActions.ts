import supabase from "@/utils/supabase/createClient";
import { Tables, TablesInsert } from "../Models/Database";
import { addAppNotification } from "../Slices/appNotificationSlice";
import { setAssignedUsers } from "../Slices/usersSlice";

export const assignUsersToProjectAction = (users: TablesInsert<'users_projects'>[], project: Tables<'proiecte'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const data = await supabase
                .from('users_projects')
                .delete()
                .eq('project_id', project.id)

            if (!data.error) {
                const { data, error } = await supabase
                    .from('users_projects')
                    .insert(users)
                    .select()
                if (!error) {
                    dispatch(addAppNotification({ message: `Userii au fost adaugati la proiect!`, severity: 'success' }))
                }
                if (error) {
                    dispatch(addAppNotification({ message: `Eroare adaugare useri la proiect!`, severity: 'error' }))
                }
            } else {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: data.error.message ?? 'Eroare asignare useri'
                }))
            }

        } catch (error) {
            console.error('Error adding users to project', error);
        }
    };
};

// export const assignuser = (users: any) => {
//     return async (dispatch: any, getState: () => any) => {
//         try {
//             let { data, error } = await supabase
//                 //@ts-ignore
//                 .rpc('assigned_users2', {
//                     p_project_id: 'a1c6c7e0-9faa-4dbb-9f7e-ce389126d734',
//                     p_users: users
//                 })
//             if (error) console.error(error)
//             else console.log(data)

//         } catch (error) {
//             console.error('Error adding users to project', error);
//         }
//     };
// }

export const getAssignedUsersAction = (project_id: string) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            let { data: users_projects, error } = await supabase
                .from('users_projects')
                .select('*, users(email)')
                .eq('project_id', project_id)

            if (!error) {
                dispatch(setAssignedUsers(users_projects))
                // dispatch(setUsers(users))
                // return {
                //     data: users,
                //     severity: 'success'
                // }
            }


            if (error) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: error.message
                }))
                throw error;
            }

        } catch (error) {
            console.error('Error retrieveing users:', error);
        }
    }
}