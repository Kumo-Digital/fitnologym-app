import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from 'bcrypt';
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
      const userService = new UserService();
      const existingUser = await userService.getLoginUserByEmail(email);

      if (existingUser) {
        const validPassword = await new Argon2id().verify(
          existingUser.password.toString(),
          password.toString()
        );
        // const match = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
          res.status(400).json({
            error: "Incorrect username or password",
          });
        }

        const session = await lucia.createSession(existingUser._id, {});
        console.log("session created:", session);

        res
          .appendHeader(
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
          )
          .status(200)
          .json({ message: "Login successful" });
        // .end();
        // if (match) {
        //   // Login succesful
        //   console.log('La contraseña es correcta');
        //   console.log('Login correcto');

        //   const session = await lucia.createSession(existingUser.uid, {});
        //   console.log('la session es:', session);
        //   res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
        //     .status(200)
        //     .end();
        // }

        // return res.json("La contraseña no es correcta");
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
