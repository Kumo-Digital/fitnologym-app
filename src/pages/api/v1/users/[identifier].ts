import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { IUser } from "@/db/interfaces/IUser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.identifier)
      return res.status(400).json({
        message:
          "Missing identifier in request URL. Please provide a valid user id or email.",
      });

    const isEmail = req.query.identifier.includes("@");
    if (isEmail) {
      try {
        await connectDB();
        const userService = new UserService();

        const email = decodeURIComponent(req.query.identifier as string);
        const user = await userService.getUserByEmail(email);

        if (!user) res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await connectDB();
        const userService = new UserService();

        const userId = req.query.identifier as string;
        const user = await userService.getUserById(userId);

        if (!user) res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
