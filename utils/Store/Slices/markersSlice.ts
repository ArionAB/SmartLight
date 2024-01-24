import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';

const initialState: any = {
    markers: [] as Tables<'markers'>[],

};

const markersSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        setMarkersItems: (state, action) => {
            state.markers = action.payload;
        },
    },
});

export const { setMarkersItems } = markersSlice.actions;

export default markersSlice.reducer;