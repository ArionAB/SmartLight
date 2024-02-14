import { Tables } from "../Models/Database";
import { getAssignedUsersModel } from "../Models/Users/GetAssignedUsersModel";
import { RootState } from "../store";

export const selectUsers = (state: RootState): Tables<'users'>[] => {
    return state.users.users
};

export const selectAssignedUsers = (state: RootState): getAssignedUsersModel[] | [] => {
    return state.users.assignedUsers
}