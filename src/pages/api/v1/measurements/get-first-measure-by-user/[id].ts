import connectDB from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query as { id: string };

    try {
      await connectDB();
      const measurementService = new MeasurementService();
      const users = await measurementService.getFirstMeasureByUser(id);

      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}
