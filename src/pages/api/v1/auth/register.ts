import connectDB from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import UserService from '@/db/services/user';
import { ROLES } from '@/utils/constants';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }

  if (req.method === "POST") {
    try {
        await connectDB();
        const userService = new UserService();

        const existingUser = await userService.getUserByEmail(req.body.email);
        if (existingUser) {
          return res.status(400).json({ message: "Lo sentimos, este correo electrónico ya está registrado. Revise las credenciales." });
        }

        const newAdmin = await userService.createUser(req.body, ROLES.ADMIN);

        if (!newAdmin)
        return res.status(400).json({ message: "Administrator not created" });

        return res.status(201).json({ message: "Administrator created" });

    } catch (e) {
      console.error(e);
    }
  }
}
