import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "PUT") {
        res.status(404).end();
        return;
    }

    if (!req.query.id)
      return res.status(400).json({
        message:
          "Missing user id in request URL. Please provide a valid user id.",
      });

    try {
      await connectDB();
      const userService = new UserService();

      const { current_password, new_password, confirm_new_password } = req.body;
      
      const passwordData = {
        current_password,
        new_password,
        confirm_new_password,
      }

      const userId = req.query.id as string;
      const changePassword = await userService.changePassword(userId, passwordData);

      res.status(200).json(changePassword);
    } catch (e) {
      console.error(e);
    }
}
