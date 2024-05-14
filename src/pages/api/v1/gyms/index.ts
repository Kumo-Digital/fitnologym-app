import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import GymService from "@/db/services/gym";
import { NextResponse } from "next/server";

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
        return NextResponse.json({ error: 'Gyms not found' }, { status: 404 })
        // res.status(404).json({ message: "Gyms not found" });
        // return;
      }
      return NextResponse.json(gyms, { status: 200 });
      // res.status(200).json(gyms);
      // return;
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      // res.status(500).json({ error: "Internal Server Error" });
      // return;
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
