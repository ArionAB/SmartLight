'use client'

import { createSlice } from '@reduxjs/toolkit';
import { ProjectModel } from '../Models/Project/ProjectModel';

const initialState: any = {
    projects: [],
    streets: [],
    focusedProject: null!,
    loadingProjects: false,
    loadingStreets: false,
    loadingMarkers: false,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectItems: (state, action) => {
            state.projects = action.payload;
            state.loadingProjects = false
        },
        setProjectsLoading: (state, action) => {
            state.loadingProjects = action.payload
        },
        setStreetItems: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id)
            project.strazi = action.payload.streets
            state.loadingStreets = false
        },
        setStreetsLoading: (state, action) => {
            state.loadingStreets = action.payload
        },
        setMarkersItems: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id)
            const street = project.strazi.find((street) => street.id === action.payload.street_id)
            if (street) {
                if (!street.markersArray) {
                    street.markersArray = action.payload.markers
                } else {
                    street?.markersArray.push(action.payload.markers)
                }

                state.focusedProject = state.focusedProject || {};
                state.focusedProject.street = state.focusedProject.street || {};

                if (!state.focusedProject.street.markersArray) {
                    state.focusedProject.street.markersArray = action.payload.markers;
                } else {
                    state.focusedProject.street.markersArray.push(action.payload.markers);
                }

            }
            state.loadingMarkers = false

        },
        setMarkersLoading: (state, action) => {
            state.loadingMarkers = action.payload
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
            console.log('aciton.payload', action.payload)
            if (street) {
                if (!street.markersArray) {
                    street.markersArray = [];
                }

                street.markersArray.push(action.payload);

                if (!state.focusedProject.street) {
                    state.focusedProject.street = {};
                }

                if (!state.focusedProject.street.markersArray) {
                    state.focusedProject.street.markersArray = [];
                }

                state.focusedProject.street.markersArray.push(action.payload);
            }
        },
        updateMarker: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const street = project.strazi.find((street) => street.id === action.payload.street_id);
            const markerIndex = street?.markersArray.findIndex((marker) => marker.id === action.payload.id);
            if (markerIndex !== -1) {
                street!.markersArray[markerIndex!] = action.payload;
            }
        },
        deleteMarker: (state, action) => {
            const project: ProjectModel = state.projects.find((project: ProjectModel) => project.id === action.payload.proiect_id);
            const street = project.strazi.find((street) => street.id === action.payload.street_id);
            const markerIndex = street?.markersArray.findIndex((marker) => marker.id === action.payload.id);
            if (markerIndex !== -1) {
                street!.markersArray.splice(markerIndex!, 1);
                state.focusedProject.street.markersArray.splice(markerIndex!, 1)
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

export const { setProjectItems, setStreetItems, setStreet, setFocusedProject, setMarker, updateMarker, deleteMarker, updateStreet, deleteStreet, updateProject, deleteProject, setMarkersItems, setProjectsLoading, setStreetsLoading, setMarkersLoading } = projectSlice.actions;

export default projectSlice.reducer;