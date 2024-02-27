import connectDB from '@/lib/db';
import GymService from '@/services/gym';
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectDB();
      const gymService = new GymService();
      const gyms = await gymService.getAllGyms();

      res.json(gyms);
    } catch (e) {
      console.error(e);
    }
  }
}