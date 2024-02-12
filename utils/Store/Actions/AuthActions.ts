import supabase from "../../supabase/createClient";
import { CreateUserModel } from "../Models/Auth/CreateUserModel";
import { addAppNotification } from "../Slices/appNotificationSlice";


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
                    message: 'User create cu success!'
                }))
                console.log('User created:', data)
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

            if (!error) {
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