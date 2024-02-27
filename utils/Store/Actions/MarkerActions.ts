import supabase from "../../supabase/createClient";
import { Tables, TablesInsert, TablesUpdate } from "../Models/Database";
import { ProjectModel } from "../Models/Project/ProjectModel";
import { addAppNotification } from "../Slices/appNotificationSlice";
import { setTooltips } from "../Slices/miscSlice";
import { deleteMarker, setFocusedProject, setMarker, setMarkersItems, setMarkersLoading, updateMarker } from "../Slices/projectSlice";

let fetchedStreets: string[] = []
export const getMarkersAction = (street_id?: string, project?: ProjectModel) => {
    return async (dispatch: any, getState: () => any) => {
        try {


            if (street_id) {
                if (fetchedStreets.includes(street_id)) {
                    return
                }

                dispatch(setMarkersLoading(true))

                let { data: markers, error } = await supabase
                    .from('markers')
                    .select('*')
                    .eq('street_id', street_id)

                if (!error) {
                    fetchedStreets.push(street_id)
                    if (markers && markers.length > 0) {
                        dispatch(setMarkersItems({ markers: markers, proiect_id: markers[0].proiect_id, street_id: markers[0].street_id }))
                    } else {
                        dispatch(setMarkersLoading(false))
                    }

                }

                if (error) {
                    dispatch(setMarkersLoading(false))
                    dispatch(addAppNotification({
                        severity: 'error',
                        message: error.message
                    }))
                    throw error;
                }
            }

            if (project) {

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

                        dispatch(addAppNotification({
                            severity: 'success',
                            message: "Markerii sunt afișati pe hartă!"
                        }))
                    }

                    if (error) {
                        dispatch(addAppNotification({ message: `Eroare markeri: ${error}`, severity: 'error' }))
                        throw error;
                    }
                }
                //in StreetMarkers facem map pe focusedProject.street.markersArray
                dispatch(setTooltips(false))
                dispatch(setFocusedProject({
                    street: {
                        markersArray: totalMarkers
                    }
                }))
            }


        } catch (error) {
            console.error('Error fetch markers:', error);
        }
    };
};


export const addMarkerAction = (marker: TablesInsert<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('markers')
                .insert([
                    marker
                ])
                .select()

            if (!error) {
                dispatch(addAppNotification({ message: `${data[0].marker_type} a fost adaugat!`, severity: 'success' }))
                dispatch(setMarker(data[0]))
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare adaugare marker!`, severity: 'error' }))

            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const updateMarkerAction = (marker: TablesUpdate<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {


            const { data, error } = await supabase
                .from('markers')
                .update(marker)
                .eq('id', marker.id!)
                .select()

            if (!error) {
                dispatch(addAppNotification({ message: `${data[0].marker_type} actualizat cu success`, severity: 'success' }))
                dispatch(updateMarker(data[0]))
                return {
                    data: data,
                    severity: 'success',
                    message: `{${data[0].marker_type} actualizat cu success}`
                }
            }

            if (error) {
                dispatch(addAppNotification({ message: `Eroare update marker!`, severity: 'error' }))
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};

export const deleteMarkerAction = (marker: Tables<'markers'>) => {
    return async (dispatch: any, getState: () => any) => {
        try {
            const { error } = await supabase
                .from('markers')
                .delete()
                .eq('id', marker.id)

            if (!error) {
                dispatch(deleteMarker(marker))
                dispatch(addAppNotification({ message: `${marker?.number} a fost sters!`, severity: 'success' }))
            }

            if (error) {
                dispatch(addAppNotification({ message: `eroare stergere marker!`, severity: 'error' }))
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
}

export const addOfflineMarkers = (markers: Tables<'markers'>[]) => {
    return async (dispatch: any, getState: () => any) => {
        try {

            const { data, error } = await supabase
                .from('markers')
                .insert(
                    markers
                )
                .select()

            if (!error) {
                localStorage.removeItem('project')
                dispatch(addAppNotification({ message: `Markerii offline au fost adaugati cu success!`, severity: 'success' }))
            }

            if (error) {
                dispatch(addAppNotification({ message: error.message, severity: 'error' }))
            }

        } catch (error) {
            console.error('error adding offline markers')
        }
    }
}