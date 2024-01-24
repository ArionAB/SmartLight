import { RootState } from "../store";

export const selectIsDrawerOpen = (state: RootState): boolean => {
    return state.misc.drawer;
};

