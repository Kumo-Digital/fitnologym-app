import { DatabaseUser } from "@/lib/auth";
import { Schema, model, models } from "mongoose";

// Define the Mongoose schema for the User model
const userSchema = new Schema<DatabaseUser>({
  _id: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
} as const);

const UserModel = models.User || model<DatabaseUser>("User", userSchema);

export default UserModel;
