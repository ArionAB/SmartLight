import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    drawer: false,
    tooltips: true
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
        }
    },
});

export const { setDrawer, setTooltips } = miscSlice.actions;

export default miscSlice.reducer;