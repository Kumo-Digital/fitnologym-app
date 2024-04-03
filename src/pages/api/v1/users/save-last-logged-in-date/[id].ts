import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(401).end();
        return;
    }

    const { id } = req.query as { id: string };

    try {
      await connectDB();
      const userService = new UserService();
      const user = await userService.saveLastLoggedInDate(id);

      res.json(user);
    } catch (e) {
      console.error(e);
    }
}
