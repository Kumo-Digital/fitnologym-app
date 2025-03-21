import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query as { id: string };

    try {
      await connectDB();
      const userService = new UserService();
      const users = await userService.getUserById(id);

      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}
