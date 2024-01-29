import { RootState } from "../store";

export const selectCoordinates = (state: RootState): [] => {
    return state.map.coordinates
};

