import connectDB from "@/lib/db";
import UserService from "@/services/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // get id from query
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
