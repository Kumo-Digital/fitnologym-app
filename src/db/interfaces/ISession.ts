import { Document } from "mongoose";

export interface ISession extends Document {
  id: string;
  user_id: string;
	expires_at: Date;
	fresh: boolean;
}