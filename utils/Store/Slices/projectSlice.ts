import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';
import { ProjectModel } from '../Models/Project/ProjectModel';

const initialState: any = {
    projects: [] as ProjectModel[],
    streets: [] as Tables<'strazi'>[],
    focusedProject: null,

};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectItems: (state, action) => {
            state.projects = action.payload;
        },
        setStreetItems: (state, action) => {
            state.streets = action.payload
        },
        setStreet: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id)
            project.strazi.push(action.payload)
        },
        setFocusedProject: (state, action) => {
            state.focusedProject = action.payload
        },
        setMarker: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id)
            const street = project.strazi.find((street) => street.id === action.payload.street_id)
            street?.markers.push(action.payload)
        },
        updateMarker: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const street = project.strazi.find((street) => street.id === action.payload.street_id);
            const markerIndex = street?.markers.findIndex((marker) => marker.id === action.payload.id);
            if (markerIndex !== -1) {
                street!.markers[markerIndex!] = action.payload;
            }
        },
        deleteMarker: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const street = project.strazi.find((street) => street.id === action.payload.street_id);
            const markerIndex = street?.markers.findIndex((marker) => marker.id === action.payload.id);
            if (markerIndex !== -1) {
                street!.markers.splice(markerIndex!, 1);
            }
        },

    },
});

export const { setProjectItems, setStreetItems, setStreet, setFocusedProject, setMarker, updateMarker, deleteMarker } = projectSlice.actions;

export default projectSlice.reducer;