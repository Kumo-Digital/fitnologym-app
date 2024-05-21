import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.identifier) {
      res.status(400).json({
        message:
          "Missing identifier in request URL. Please provide a valid user id or email.",
      });

      return;
    }

    const isEmail = req.query.identifier.includes("@");
    if (isEmail) {
      try {
        await connectDB();
        const userService = new UserService();

        const email = decodeURIComponent(req.query.identifier as string);
        const user = await userService.getUserByEmail(email);

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        res.status(200).json(user);
      } catch (e) {
        console.error(e);
        return;
      }
    } else {
      try {
        await connectDB();
        const userService = new UserService();

        const userId = req.query.identifier as string;
        const user = await userService.getUserById(userId);

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.status(200).json(user);
      } catch (e) {
        console.error(e);
        return;
      }
    }
  }

  if (req.method === "PUT") {
    if (!req.query.identifier) {
      res.status(400).json({
        message:
          "Missing identifier in request URL. Please provide a valid user id or email.",
      });

      return;
    }

    try {
      await connectDB();
      const userService = new UserService();

      const { target_metric, target_value, ...rest } = req.body;
      const editUserData = {
        ...rest,
        targets: [{ target_metric, target_value }],
      };

      const userId = req.query.identifier as string;
      const user = await userService.editUser(editUserData, userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  if (req.method === "DELETE") {
    if (!req.query.identifier) {
      res.status(400).json({
        message:
          "Missing identifier in request URL. Please provide a valid user id or email.",
      });

      return;
    }

    try {
      await connectDB();
      const userService = new UserService();

      const userId = req.query.identifier as string;
      const user = await userService.deleteUser(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
