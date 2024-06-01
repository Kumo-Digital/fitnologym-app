import MeasurementModel from "../models/MeasurementModel";

const multipleValues = ["body_fat", "muscle_mass", "muscle_quality"];
const circumferenceValues = ["circumference"];

class MetricService {
  async getMetrics(
    userId: string,
    metric: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    let metrics: any[];

    if (multipleValues.includes(metric)) {
      metrics = await MeasurementModel.aggregate([
        {
          $match: {
            user_id: userId,
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $project: {
            _id: 0,
            uom: `$metrics.${metric}.measure_uom`,
            filtered_metrics: {
              date: "$date",
              overview: `$metrics.${metric}.measure_value`,
              left_arm: `$metrics.left_arm.${metric}.measure_value`,
              right_arm: `$metrics.right_arm.${metric}.measure_value`,
              trunk: `$metrics.trunk.${metric}.measure_value`,
              left_leg: `$metrics.left_leg.${metric}.measure_value`,
              right_leg: `$metrics.right_leg.${metric}.measure_value`,
            },
          },
        },
        {
          $unwind: "$filtered_metrics",
        },
        {
          $sort: { "filtered_metrics.date": 1 },
        },
        {
          $group: {
            _id: "$user_id",
            uom: { $first: "$uom" },
            filtered_metrics: { $push: "$filtered_metrics" },
          },
        },
        {
          $project: {
            _id: 0,
            uom: 1,
            filtered_metrics: 1,
          },
        },
      ]);
    } else if (circumferenceValues.includes(metric)) {
      metrics = await MeasurementModel.aggregate([
        {
          $match: {
            user_id: userId,
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $project: {
            _id: 0,
            uom: "cm",
            filtered_metrics: {
              date: "$date",
              circumferenceNeck: "$metrics.circumferenceNeck.measure_value",
              circumferenceChest: "$metrics.circumferenceChest.measure_value",
              circumferenceWaist: "$metrics.circumferenceWaist.measure_value",
              circumferenceHips: "$metrics.circumferenceHips.measure_value",
              circumferenceGlutes: "$metrics.circumferenceGlutes.measure_value",
              circumferenceShouldersLeft:
                "$metrics.circumferenceShoulders.left.measure_value",
              circumferenceShouldersRight:
                "$metrics.circumferenceShoulders.right.measure_value",
              circumferenceArmsLeft: "$metrics.circumferenceArms.left.measure_value",
              circumferenceArmsRight: "$metrics.circumferenceArms.right.measure_value",
              circumferenceQuadsLeft: "$metrics.circumferenceQuads.left.measure_value",
              circumferenceQuadsRight: "$metrics.circumferenceQuads.right.measure_value",
              circumferenceCalfLeft: "$metrics.circumferenceCalf.left.measure_value",
              circumferenceCalfRight: "$metrics.circumferenceCalf.right.measure_value",
            },
          },
        },
        {
          $unwind: "$filtered_metrics",
        },
        {
          $sort: { "filtered_metrics.date": 1 },
        },
        {
          $group: {
            _id: "$user_id",
            uom: { $first: "$uom" },
            filtered_metrics: { $push: "$filtered_metrics" },
          },
        },
        {
          $project: {
            _id: 0,
            uom: 1,
            filtered_metrics: 1,
          },
        },
      ]);
    } else {
      metrics = await MeasurementModel.aggregate([
        {
          $match: {
            user_id: userId,
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $project: {
            _id: 0,
            uom: `$metrics.${metric}.measure_uom`,
            filtered_metrics: {
              date: "$date",
              overview: `$metrics.${metric}.measure_value`,
            },
          },
        },
        {
          $unwind: "$filtered_metrics",
        },
        {
          $sort: { "filtered_metrics.date": 1 },
        },
        {
          $group: {
            _id: "$user_id",
            uom: { $first: "$uom" },
            filtered_metrics: { $push: "$filtered_metrics" },
          },
        },
        {
          $project: {
            _id: 0,
            uom: 1,
            filtered_metrics: 1,
          },
        },
      ]);
    }

    return metrics;
  }
}

export default MetricService;
