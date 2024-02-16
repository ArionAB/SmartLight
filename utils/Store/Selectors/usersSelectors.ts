import { Tables } from "../Models/Database";
import { getAssignedUsersModel } from "../Models/Users/GetAssignedUsersModel";
import { getUserModel } from "../Models/Users/GetUsersModel";
import { RootState } from "../store";

export const selectUsers = (state: RootState): Tables<'users'>[] => {
    return state.users.users
};

export const selectAssignedUsers = (state: RootState): getAssignedUsersModel[] | [] => {
    return state.users.assignedUsers
}

export const selectCurrentUser = (state: RootState): getUserModel | null => {
    return state.users.currentUser
}