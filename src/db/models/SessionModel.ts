import { ISession } from "@/types/interfaces/ISession";
import { Schema, model, models } from "mongoose";

const sessionSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  expires_at: {
    type: Date,
    required: true
  },
  fresh: {
    type: Boolean,
    required: true,
  },
} as const,
{ _id: false }
);

const SessionModel = models.Session || model<ISession>('Session', sessionSchema);

export default SessionModel;