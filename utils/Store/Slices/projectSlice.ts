import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';
import { ProjectModel } from '../Models/Project/ProjectModel';

const initialState: any = {
    projects: [] as ProjectModel[],
    streets: [] as Tables<'strazi'>[]

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
        }

    },
});

export const { setProjectItems, setStreetItems } = projectSlice.actions;

export default projectSlice.reducer;