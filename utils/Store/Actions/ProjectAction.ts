import supabase from "../../supabase/createClient";
import { deleteProject, setProjectItems, updateProject } from "../Slices/projectSlice";
import { Tables, TablesInsert, TablesUpdate } from "../Models/Database";
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

export const updateProjectAction = (project: TablesUpdate<'proiecte'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('proiecte')
                .update(project)
                .eq('id', project.id!)
                .select()

            if (!error) {
                dispatch(addAppNotification({ message: `Proiectul ${data[0].city} a fost actualizata!`, severity: 'success' }))
                dispatch(updateProject(data[0]))
                return {
                    severity: 'success',
                    data: data[0]
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare editare proiect!`, severity: 'error' }))
                return {
                    severity: 'error'
                }
            }

        } catch (error) {
            console.error('Errore editare proiect:', error);
        }
    };
};

export const deleteProjectAction = (project: Tables<'proiecte'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {
            const { error } = await supabase
                .from('proiecte')
                .delete()
                .eq('id', project.id)

            if (!error) {
                dispatch(deleteProject(project))
                dispatch(addAppNotification({ message: `Proiectul ${project?.city} a fost sters!`, severity: 'success' }))
                return {
                    severity: 'success'
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `eroare stergere proiect!`, severity: 'error' }))
                return {
                    severity: 'error'
                }
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
}