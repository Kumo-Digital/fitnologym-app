import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { ROLES } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(404).end();
        return;
    }

    if (!req.body.dni)
      return res.status(400).json({
        message:
          "Missing DNI in body URL. Please provide a DNI.",
      });

    try {
      await connectDB();
      const userService = new UserService();

      const { dni } = req.body;

      const existingUser = await userService.getUserByDNI(dni);

      if (existingUser && existingUser.role !== ROLES.ADMIN) {
        const recoverPass = await userService.recoverPassword(existingUser._id, dni);

        res.status(200).json(recoverPass);
        return;
      } else {
        return res.status(400).json({
        message:
            "DNI does not match any user in the database.",
        });
      }

    } catch (e) {
      console.error(e);
    }
}
