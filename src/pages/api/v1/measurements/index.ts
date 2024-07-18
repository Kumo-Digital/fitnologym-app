import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import MeasurementService from "@/db/services/measurement";
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

      if (!measurements)
        res.status(404).json({ message: "Measurements not found" });
      res.status(200).json(measurements);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const measurementService = new MeasurementService();

      const preparedMeasurement = prepareMeasurementForInsert(req.body);
      const newMeasurement = await measurementService.createMeasurement(
        preparedMeasurement
      );

      if (!newMeasurement)
        return res.status(400).json({ message: "Measurement was not created" });

      return res.status(201).json(newMeasurement);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "PUT") {
    try {
      await connectDB();
      const measurementService = new MeasurementService();

      const preparedMeasurement = prepareMeasurementForInsert(req.body);
      const updatedMeasurement = await measurementService.updateMeasurement(
        preparedMeasurement,
        req.body._id
      );

      if (!updatedMeasurement)
        return res.status(400).json({ message: "Measurement was not updated" });

      return res.status(200).json(updatedMeasurement);
    } catch (e) {
      console.error(e);
    }
  }

  if (req.method === "DELETE") {
    if (!req.body.id) {
      return res.status(400).json({ message: "Measurement ID is required" });
    }

    try {
      await connectDB();
      const measurementService = new MeasurementService();
      const deletedMeasurement = await measurementService.deleteMeasurement(
        req.body.id
      );

      if (!deletedMeasurement)
        return res.status(400).json({ message: "Measurement was not deleted" });

      return res.status(200).json(deletedMeasurement);
    } catch (e) {
      console.error(e);
    }
  }
}
