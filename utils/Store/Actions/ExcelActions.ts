import supabase from "@/utils/supabase/createClient";
import { ProjectModel } from "../Models/Project/ProjectModel";
import { addAppNotification } from "../Slices/appNotificationSlice";
import { Tables } from "../Models/Database";

export const exportProjectAsExcel = (project: ProjectModel) => {
    return async (dispatch: any, getState: () => any) => {
        try {


            let numberOfPages = 1
            if (project.markers[0].count > 1000) {
                numberOfPages = Math.ceil(project.markers[0].count / 1000)
            }

            let totalMarkers: Tables<'markers'>[] = []
            for (let i = 1; i <= numberOfPages; i++) {
                let offset = (i - 1) * 1000;

                let { data: markers, error } = await supabase
                    .from('markers')
                    .select('*')
                    .eq('proiect_id', project.id)
                    .range(offset, offset + 999);

                if (!error) {
                    if (markers && markers.length > 0) {
                        totalMarkers.push(...markers)
                    }
                }

                if (error) {
                    dispatch(addAppNotification({ message: `Eroare generare excel: ${error}`, severity: 'error' }))
                    throw error;
                }
            }

            dispatch(addAppNotification({
                severity: 'success',
                message: `Proiectul ${project.city} descărcat ca Excel!`
            }))
            return totalMarkers


        } catch (error) {
            console.error('Error fetch markers:', error);
        }
    };
};