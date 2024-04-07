import { Enums } from "../Database";

export interface CreateUserModel {
    email: string,
    password: string,
    role: Enums<'role_type'> | string;
}