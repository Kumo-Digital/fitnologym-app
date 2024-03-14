import MeasurementModel from "@/db/models/MeasurementModel";
import { IMeasurement } from "@/db/interfaces/IMeasurement";
import { NextResponse } from "next/server";
import { generateId } from "lucia";

class MeasurementService {
  async getAll(): Promise<IMeasurement[]> {
    const measurements = await MeasurementModel.find();
    return measurements;
  }

  async getMeasurementById(measureId: string): Promise<IMeasurement> {
    const measurement = await MeasurementModel.findOne({
      _id: measureId,
    });

    return measurement;
  }

  async getMeasurementsByUser(userId: string): Promise<IMeasurement[]> {
    const measurements = await MeasurementModel.find({
      user_id: userId,
    });

    return measurements;
  }

  async getLastMeasureByUser(userId: string): Promise<IMeasurement> {
    const measurement = await MeasurementModel.findOne(
      {
        user_id: userId,
      },
      {},
      {
        sort: {
          date: -1,
        },
      }
    );

    return measurement;
  }

  async createMeasurement(MeasurementData: IMeasurement): Promise<any> {
    try {
      const newMeasurement = await MeasurementModel.create(MeasurementData);

      return newMeasurement;
    } catch (error) {
      return error;
    }
  }
}

export default MeasurementService;
