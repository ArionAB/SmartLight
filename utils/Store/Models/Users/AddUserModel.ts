import { Enums } from "../Database";

export interface AddUserModel {
    email: string,
    password: string,
    role: Enums<'role_type'> | string;
}