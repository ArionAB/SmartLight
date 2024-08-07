import { createSlice } from '@reduxjs/toolkit';
import { miscState } from './miscState';

const initialState: miscState = {
    drawer: false,
    tooltips: false,
    hasInternet: true,
    filters: {
        pictures: 'all_pictures',
        lamps: "all_lamps",
        type: "both",
        observatii: 'both'
    },
    myProjects: true
};

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
        setTooltips: (state, action) => {
            state.tooltips = action.payload
        },
        setHasInternet: (state, action) => {
            state.hasInternet = action.payload
        },
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        setMyProjects: (state, action) => {
            state.myProjects = action.payload
        }
    },
});

export const { setDrawer, setTooltips, setHasInternet, setFilters, setMyProjects } = miscSlice.actions;

export default miscSlice.reducer;