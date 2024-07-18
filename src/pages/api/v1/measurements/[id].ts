import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    if (!req.query.id) {
      return res.status(400).json({ message: "Measurement ID is required" });
    }

    try {
      await connectDB();
      const measurementService = new MeasurementService();
      const deletedMeasurement = await measurementService.deleteMeasurement(
        req.query.id as string
      );

      if (!deletedMeasurement)
        return res.status(400).json({ message: "Measurement was not deleted" });

      return res.status(200).json(deletedMeasurement);
    } catch (e) {
      console.error(e);
    }
  }
}
