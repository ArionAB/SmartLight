import supabase from "@/utils/supabase/createClient";
import { addAppNotification } from "../Slices/appNotificationSlice";

export const deleteFilesActions = (url: string[]) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .storage
                .from('illumitech-bucket')
                .remove(url)


            if (!error) {
                dispatch(addAppNotification({ message: `Poza a fost ștearsă!`, severity: 'success' }))
                return {
                    severity: 'success',
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare ștergere poza! (${error.message})`, severity: 'error' }))

            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};