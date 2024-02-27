import connectDB from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import UserService from '@/services/user';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
		res.status(404).end();
		return;
	}

  if (req.method === 'POST') {
    try {
        await connectDB();
        const userService = new UserService();
        const res = await userService.createUser(req.body);

        if (res.ok) {
            return await res.json();
        }
        console.log('Hubo un error');

    } catch (e) {
      console.error(e);
    }
  }
}