import connectDB from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

      return res.json(`So good, the email is ${email} and the hashed password is ${hashedPassword}`);

    } catch (e) {
      console.error(e);
    }
  }
}