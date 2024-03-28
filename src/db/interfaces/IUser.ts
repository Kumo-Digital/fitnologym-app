import { Document } from "mongoose";
import { UserType } from "../../types/user";

export interface IUser extends Document {
    id: string;
    fullname: string;
    dni: string;
    email: string;
    password: string;
    gym_id: string;
    gender: string;
    role: string;
    user_type: UserType;
}