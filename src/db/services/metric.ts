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
              overview: `$values.${metric}.measure_value`,
              left_arm: `$values.left_arm.${metric}.measure_value`,
              right_arm: `$values.right_arm.${metric}.measure_value`,
              torso: `$values.trunk.${metric}.measure_value`,
              left_leg: `$values.left_leg.${metric}.measure_value`,
              right_leg: `$values.right_leg.${metric}.measure_value`,
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
    } else if (circumferenceValues.includes(metric)) {
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
            uom: 'cm',
            filtered_metrics: {
              date: "$createdAt",
              circumferenceNeck: '$values.circumferenceNeck.measure_value',
              circumferenceChest: '$values.circumferenceChest.measure_value',
              circumferenceShoulders: '$values.circumferenceShoulders.measure_value',
              circumferenceArms: '$values.circumferenceArms.measure_value',
              circumferenceWaist: '$values.circumferenceWaist.measure_value',
              circumferenceHips: '$values.circumferenceHips.measure_value',
              circumferenceGlutes: '$values.circumferenceGlutes.measure_value',
              circumferenceQuads: '$values.circumferenceQuads.measure_value',
              circumferenceCalf: '$values.circumferenceCalf.measure_value',
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

    return metrics;
  }
}

export default MetricService;