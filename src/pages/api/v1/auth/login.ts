import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import UserService from '@/services/UserService';
import connectDB from '@/lib/db';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      await connectDB();
      const userService = new UserService();
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
          // Login succesful
          console.log('La contraseña es correcta');
          console.log('Login correcto');

          return res.json('Login succesful');
        }

        return res.json("La contraseña no es correcta");
      }

      return res.json("El e-mail no es correcto");

    } catch (e) {
      console.error(e);
    }
  }
}