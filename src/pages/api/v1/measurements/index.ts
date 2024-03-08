import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";
import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { prepareMeasurementForInsert } from "@/utils/measurement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const measurementService = new MeasurementService();
      const measurements = await measurementService.getAll();

      if (!measurements) res.status(404).json({ message: "Measurements not found" });
      res.status(200).json(measurements);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const measurementService = new MeasurementService();
      const measurement = req.body;
      console.log('Me llega como body:', measurement);
      
      const preparedMeasurement = prepareMeasurementForInsert(req.body);
      console.log('La measure PREPARADA queda como:', preparedMeasurement);
      const newMeasurement = await measurementService.createMeasurement(preparedMeasurement);

      if (!newMeasurement)
        return res.status(400).json({ message: "Measurement was not created" });

      return res.status(201).json(newMeasurement);
    } catch (e) {
      console.error(e);
    }
  }
}
