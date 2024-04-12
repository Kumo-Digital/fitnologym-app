import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { DatabaseUser } from "@/lib/auth";
import { UserForm } from "@/types/user";
import { ROLES } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const userService = new UserService();
      const users = await userService.getAllUsers();

      if (!users) res.status(404).json({ message: "Users not found" });
      res.status(200).json(users);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const userService = new UserService();
      const user = req.body as UserForm;

      const existingUser = await userService.getUserByEmail(user.email);
      if (existingUser) {
        return res.status(400).json({ message: "Lo sentimos, este correo electrónico ya está registrado. Revise las credenciales." });
      }

      const newUser = await userService.createUser(user, ROLES.USER);

      if (!newUser)
        return res.status(400).json({ message: "User not created" });

      return res.status(201).json(newUser);
    } catch (e) {
      console.error(e);
    }
  }
}
