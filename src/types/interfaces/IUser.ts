import { Document } from "mongoose";
import { UserType } from "../UserType";

export interface IUser extends Document {
    id: string;
    fullname: string;
    dni: string;
    email: string;
    password: string;
    gym_id: number;
    role: string;
    user_type: UserType;
}