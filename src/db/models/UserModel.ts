import { DatabaseUser } from "@/lib/auth";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<DatabaseUser>(
  {
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
    gym_id: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    targets: {
      type: [
        {
          target_metric: { type: String, required: true },
          target_value: { type: Number, required: true },
          _id: false,
      }],
      required: false,
    },
    last_logged_in: {
      type: Date,
      required: false,
    },
  } as const,
  {
    timestamps: true,
  }
);

const UserModel = models.User || model<DatabaseUser>("User", userSchema);

export default UserModel;
