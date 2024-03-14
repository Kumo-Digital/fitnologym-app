import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import MeasurementModel from "../models/MeasurementModel";

const multipleValues = ['body_fat', 'muscle_mass', 'muscle_quality'];
const circumferenceValues = ['circumference'];
// const singleValues = ['weight', 'bmi', 'visc_fat', 'bone_mass', 'bmr', 'metab_age', 'body_water', 'physique_rating'];

class MetricService {
  async getMetrics(userId: string, metric: string, startDate: string, endDate: string): Promise<any> {
    let metrics: any[];

    if (multipleValues.includes(metric)) {
      metrics = [];
    } else if (circumferenceValues.includes(metric)) {
      metrics = [];
    } else {
      metrics = await MeasurementModel.aggregate([
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
              overview: `$values.${metric}.measure_value`
            }
          }
        },
        {
          $unwind: '$filtered_metrics',
        },
        {
          $sort: { 'filtered_metrics.date': 1 }
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
    }

    console.log(metrics);
    return metrics;
  }
}

export default MetricService;