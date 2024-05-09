import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { IUser } from "@/db/interfaces/IUser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const userService = new UserService();
      const users = await userService.getAllUsersButAdmins();

      if (!users) res.status(404).json({ message: "Users not found" });
      res.json(users);
      return res.status(200).end();
      // res.status(200).json(users);
    } catch (e) {
      console.error(e);
    }
  }
}
