import GymService from "@/db/services/gym";
import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.id)
      return res.status(400).json({
        message:
          "Missing identifier in request URL. Please provide a valid gym id.",
      });

    try {
      await connectDB();
      const gymService = new GymService();

      const gymId = req.query.id as string;
      const gym = await gymService.getGymById(gymId);

      if (!gym) res.status(404).json({ message: "Gym not found" });
      res.status(200).json(gym);
    } catch (e) {
      console.error(e);
    }
  }
}
