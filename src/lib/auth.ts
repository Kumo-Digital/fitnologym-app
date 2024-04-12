import { Lucia, Session, TimeSpan, User } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import connectDB from "./db";
import { IncomingMessage, ServerResponse } from "http";

connectDB();

export interface DatabaseUser {
  _id: string;
  fullname: string;
  email: string;
  dni: string;
  password: string;
  gender: string;
  user_type: string;
  gym_id: string;
  role: string;
  targets: 
    {
      target_metric: string;
      target_value: number;
    }[];
  last_logged_in?: Date | null;
}

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions") as any,
  mongoose.connection.collection("users") as any
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    },
  },
  getUserAttributes: (attributes) => {
    return {
      fullname: attributes.fullname,
      email: attributes.email,
      dni: attributes.dni,
      user_type: attributes.user_type,
      role: attributes.role,
      last_logged_in: attributes.last_logged_in,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"), // no more active/idle
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "password">;
  }
}

export async function validateRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionId);

  if (result.session && result.session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(result.session.id).serialize()
    );
  }
  if (!result.session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  return result;
}
