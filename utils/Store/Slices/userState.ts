import { getAssignedUsersModel } from "../Models/Users/GetAssignedUsersModel";
import { getUserModel } from "../Models/Users/GetUsersModel";

export interface userState {
    users: getUserModel[],
    assignedUsers: getAssignedUsersModel[]
}
