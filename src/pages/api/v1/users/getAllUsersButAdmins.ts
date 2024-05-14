import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { IUser } from "@/db/interfaces/IUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const userService = new UserService();
      const users = await userService.getAllUsersButAdmins();

      if (!users) {
        return NextResponse.json({ error: 'Users not found' }, { status: 404 })
        // res.status(404).json({ message: "Users not found" });
        // return;
      }
      return NextResponse.json(users, { status: 200 });
      // res.status(200).json(users);
      // return;
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      // res.status(500).json({ error: "Internal Server Error" });
      // return;
    }
  }
}
