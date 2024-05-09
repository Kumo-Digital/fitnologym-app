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
      const gyms = await gymService.getAllGyms();

      if (!gyms) {
        res.status(404).json({ message: "Gyms not found" });
        return;
      }
      res.status(200).json(gyms);
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const gymService = new GymService();
      const gym = req.body;
      const newGym = await gymService.createGym(gym);

      res.status(201).json(newGym);
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
}
