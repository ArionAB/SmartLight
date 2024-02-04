import supabase from "../../supabase/createClient";
import { Tables, TablesInsert, TablesUpdate } from "../Models/Database";
import { addAppNotification } from "../Slices/appNotificationSlice";
import { deleteStreet, setStreet, setStreetItems, updateStreet } from "../Slices/projectSlice";

export const addStreetAction = (street: TablesInsert<'strazi'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('strazi')
                .insert([
                    street
                ])
                .select()

            if (!error) {
                dispatch(addAppNotification({ message: `Strada ${data[0].name} a fost adaugata!`, severity: 'success' }))
                dispatch(setStreet(data[0]))
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare adaugare strada!`, severity: 'error' }))

            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const getStreetAction = (proiect_id?: string) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            if (proiect_id) {
                let { data: strazi, error } = await supabase
                    .from('strazi')
                    .select('*')
                    .eq('proiect_id', proiect_id)

                if (!error) {
                    return {
                        severity: 'success',
                        data: strazi
                    }
                }

                if (error) {
                    throw error;
                }

            } else {
                let { data: strazi, error } = await supabase
                    .from('strazi')
                    .select('*')


                if (!error) {
                    dispatch(setStreetItems(strazi))

                }

                if (error) {
                    throw error;
                }
            }



        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const updateStreetAction = (street: TablesUpdate<'strazi'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('strazi')
                .update(street)
                .eq('id', street.id!)
                .select()

            if (!error) {
                dispatch(addAppNotification({ message: `Strada ${data[0].name} a fost actualizata!`, severity: 'success' }))
                dispatch(updateStreet(data[0]))
                return {
                    severity: 'success',
                    data: data[0]
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare editare strada!`, severity: 'error' }))
                return {
                    severity: 'error'
                }
            }

        } catch (error) {
            console.error('Errore editare strada:', error);
        }
    };
};

export const deleteStreetAction = (street: Tables<'strazi'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {
            const { error } = await supabase
                .from('strazi')
                .delete()
                .eq('id', street.id)

            if (!error) {
                dispatch(deleteStreet(street))
                dispatch(addAppNotification({ message: ` Strada ${street?.name} a fost stersă!`, severity: 'success' }))
                return {
                    severity: 'success'
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `eroare stergere strada!`, severity: 'error' }))
                return {
                    severity: 'error'
                }
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
}