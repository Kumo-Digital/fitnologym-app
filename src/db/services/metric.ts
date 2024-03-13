import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import MeasurementModel from "../models/MeasurementModel";

class MetricService {
  async getMetrics(userId: string, metric: string, startDate: string, endDate: string): Promise<any> {

    const metrics = await MeasurementModel.aggregate([
      {
        $match: {
          user_id: userId,
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          }
        }
      },
      {
        $project: {
          _id: 0,
          uom: `$values.${metric}.measure_uom`,
          filtered_metrics: {
            date: "$createdAt",
            general: `$values.${metric}.measure_value`
          }
        }
      },
      {
        $group: {
          _id: "$user_id",
          uom: { $first: "$uom" },
          filtered_metrics: { $push: "$filtered_metrics" }
        },
      },
      {
        $project: {
          _id: 0,
          uom: 1,
          filtered_metrics: 1
        }
      }
    ]);

    console.log(metrics);
    return metrics;
  }
}

export default MetricService;