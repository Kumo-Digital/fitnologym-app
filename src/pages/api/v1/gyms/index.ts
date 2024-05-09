import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import GymService from "@/db/services/gym";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const gymService = new GymService();
      console.log('ya generé un gymService:', gymService);
      const gyms = await gymService.getAllGyms();
      console.log('ya obtuve los gyms del método del service:', gyms);

      if (!gyms) res.status(404).json({ message: "Gyms not found" });
      res.status(200).json(gyms);
      res.end();
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const gymService = new GymService();
      const gym = req.body;
      const newGym = await gymService.createGym(gym);

      res.status(201).json(newGym);
    } catch (e) {
      console.error(e);
    }
  }
}
