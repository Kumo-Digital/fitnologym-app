import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import { lucia } from "@/lib/auth";
import { Argon2id } from "oslo/password";
import UserService from "@/db/services/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      await connectDB();
      console.log('1) Me conecté a la DB...');
      const userService = new UserService();
      console.log('2) Creé el Service de Usuarios...');
      const existingUser = await userService.getLoginUserByEmail(email);
      console.log('3) Busqué el usuario existente con el User Service...');

      if (existingUser) {
        const validPassword = await new Argon2id().verify(
          existingUser.password,
          password,
        );
        if (!validPassword) {
          res.status(400).json({
            error: "Incorrect username or password",
          });
        }

        const session = await lucia.createSession(existingUser._id, {});

        res
          .appendHeader(
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
          )
          .status(200)
          .json({ data: {
            last_logged_in: existingUser.last_logged_in,
            role: existingUser.role,
          }, 
          message: "Login successful" });
      } else {
        throw new Error("No existe un usuario con ese correo. Revise las credenciales.");
      }

      return res.json("El e-mail no es correcto");
    } catch (e) {
      console.error(e);
      res.status(400).json({
        error: "Something went wrong",
      });
    }
  }
}
