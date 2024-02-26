import connectDB from '@/lib/db';
import UserService from '@/services/UserService';
import { IUser } from '@/types/interfaces/IUser';
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectDB();
      const userService = new UserService();
      const users = await userService.getAllUsers();

      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}