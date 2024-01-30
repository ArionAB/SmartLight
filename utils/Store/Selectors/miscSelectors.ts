import { RootState } from "../store";

export const selectIsDrawerOpen = (state: RootState): boolean => {
    return state.misc.drawer;
};

export const selectIsTooltipOpen = (state: RootState): boolean => {
    return state.misc.tooltips
}
