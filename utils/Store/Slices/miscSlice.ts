import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    drawer: false,
};

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.drawer = action.payload
        },
    },
});

export const { setDrawer } = miscSlice.actions;

export default miscSlice.reducer;