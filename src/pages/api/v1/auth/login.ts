import connectDB from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      console.log(email);
      console.log(password);
      return;
      // console.log(email);
      // console.log(password);
      // return res.json('Very good!');
    } catch (e) {
      console.error(e);
    }
  }
}