import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    coordinates: []

};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setCoordinates: (state, action) => {
            state.coordinates = action.payload;
        },
    },
});

export const { setCoordinates } = mapSlice.actions;

export default mapSlice.reducer;