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

  async createMeasurement(
    MeasurementData: IMeasurement
  ): Promise<NextResponse> {
    try {
      console.log("la data en el servicio se recibe:", MeasurementData);
      const newMeasurement = await MeasurementModel.create(MeasurementData);
      console.log("Se creó la new measure en mongodb?");
      console.log("Mi new measure es:", newMeasurement);

      return NextResponse.json(
        {
          message: "Medida añadida",
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: error,
          success: false,
        },
        { status: 400 }
      );
    }
  }
}

export default MeasurementService;
