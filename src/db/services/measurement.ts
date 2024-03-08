import MeasurementModel from "@/db/models/MeasurementModel";
import { IMeasurement } from "@/db/interfaces/IMeasurement";

class MeasurementService {
  async getAllMeasurements(): Promise<IMeasurement[]> {
    const measurements = await MeasurementModel.find();

    return measurements;
  }
}