import { Tables } from "../Models/Database";
import { RootState } from "../store";

export const selectUsers = (state: RootState): Tables<'users'>[] => {
    return state.users.users
};

