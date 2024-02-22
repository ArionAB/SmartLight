import { createSlice } from '@reduxjs/toolkit';
import { miscState } from './miscState';

const initialState: miscState = {
    drawer: false,
    tooltips: false,
    hasInternet: true,
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
        }
    },
});

export const { setDrawer, setTooltips, setHasInternet } = miscSlice.actions;

export default miscSlice.reducer;