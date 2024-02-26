import supabase from "../../supabase/createClient";
import { CreateUserModel } from "../Models/Auth/CreateUserModel";
import { TablesUpdate } from "../Models/Database";
import { addAppNotification } from "../Slices/appNotificationSlice";
import { addUser, editUser, removeUser, setCurrentUser, setUsers } from "../Slices/usersSlice";


export const createUserAction = (form: CreateUserModel) => {
    return async (dispatch: any, getState: () => any) => {

        try {
            let { data, error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password
            })

            if (!error) {
                dispatch(addAppNotification({
                    severity: 'success',
                    message: 'User creat cu success!'
                }))
                dispatch(addUser(data.user))
            }


            if (error) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: error.message
                }))
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const getUsersAction = () => {
    return async (dispatch: any, getState: () => any) => {
        try {

            let { data: users, error } = await supabase
                .from('users')
                .select('*')
                .is('deleted_at', null)

            if (!error) {
                dispatch(setUsers(users))
                return {
                    data: users,
                    severity: 'success'
                }
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

export const editUserAction = (form: TablesUpdate<'users'>) => {
    return async (dispatch: any, getState: () => any) => {

        try {
            const { data, error } = await supabase
                .from('users')
                .update(form)
                .eq('id', form.id!)
                .select()

            if (!error) {
                dispatch(addAppNotification({
                    severity: 'success',
                    message: `Userul ${data[0].email} actualizat cu success!`
                }))
                dispatch(editUser(data[0]))
                return {
                    severity: 'success',
                    data: data
                }
            }


            if (error) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: error.message
                }))
                throw error;
            }

        } catch (error) {
            console.error('Error edit item:', error);
        }
    };
};

export const getUserAction = (id: string) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            let { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)

            if (!error) {
                if (user) {
                    dispatch(setCurrentUser(user[0]))
                }
                return {
                    data: user,
                    severity: 'success'
                }
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

export const deleteUserAction = (id: string) => {
    return async (dispatch: any, getState: () => any) => {

        try {
            const { data, error } = await supabase
                .from('users')
                .update({ deleted_at: new Date().toISOString() })
                .eq('id', id)
                .select()

            if (!error) {
                dispatch(addAppNotification({
                    severity: 'success',
                    message: `Userul a fost șters!`
                }))
                console.log(data[0])
                dispatch(removeUser(data[0]))
                return {
                    severity: 'success',
                    data: data
                }
            }


            if (error) {
                dispatch(addAppNotification({
                    severity: 'error',
                    message: error.message
                }))
                throw error;
            }

        } catch (error) {
            console.error('Error edit item:', error);
        }
    };
};