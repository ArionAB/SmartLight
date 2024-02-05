import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';
import { ProjectModel } from '../Models/Project/ProjectModel';
import { ProjectState } from './ProjectState';

const initialState: any = {
    projects: [],
    streets: [],
    focusedProject: null!,

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

            if (street) {
                if (!street.markers) {
                    street.markers = [];
                }

                street.markers.push(action.payload);

                // if (!state.focusedProject.streeItem) {
                //     state.focusedProject.streetItem = {};
                // }

                // if (!state.focusedProject.streetItem.markers) {
                //     state.focusedProject.streetItem.markers = [];
                // }

                if (!state.focusedProject.street) {
                    state.focusedProject.street = {};
                }

                if (!state.focusedProject.street.markers) {
                    state.focusedProject.street.markers = [];
                }

                state.focusedProject.street.markers.push(action.payload);
            }
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
                state.focusedProject.streetItem.markers.splice(markerIndex!, 1)
            }
        },
        updateStreet: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const streetIndex = project.strazi.findIndex((street) => street.id === action.payload.id)
            if (streetIndex !== -1) {
                project.strazi[streetIndex] = action.payload
            }
        },
        deleteStreet: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const streetIndex = project.strazi.findIndex((street) => street.id === action.payload.id)
            if (streetIndex !== -1) {
                project.strazi.splice(streetIndex, 1)
            }
        },
        updateProject: (state, action) => {
            const projectIndex = state.projects.findIndex((project: ProjectModel) => project.id === action.payload.id);
            if (projectIndex !== -1) {
                state.projects[projectIndex] = action.payload
            }
        },
        deleteProject: (state, action) => {
            const projectIndex = state.projects.findIndex((project: ProjectModel) => project.id === action.payload.id);
            if (projectIndex !== -1) {
                state.projects.splice(projectIndex, 1)
            }
        }

    },
});

export const { setProjectItems, setStreetItems, setStreet, setFocusedProject, setMarker, updateMarker, deleteMarker, updateStreet, deleteStreet, updateProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;