import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const filters = req.query;

    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * (2500 - 500 + 1)) + 500)
    );

    res.status(200).json({
      uom: "%",
      filtered_metrics: [
        {
          date: "2024-01-01",
          overview: 8,
          torso: 12.5,
          left_arm: 11.8,
          right_arm: 11.8,
          left_leg: 15.2,
          right_leg: 15.2,
        },
        {
          date: "2024-02-01",
          overview: 7,
          torso: 12.1,
          left_arm: 11.6,
          right_arm: 11.5,
          left_leg: 15.3,
          right_leg: 15.1,
        },
        {
          date: "2024-03-01",
          overview: 7,
          torso: 12.2,
          left_arm: 11.9,
          right_arm: 11.6,
          left_leg: 14.9,
          right_leg: 14.7,
        },
        {
          date: "2024-04-01",
          overview: 8,
          torso: 11.9,
          left_arm: 11.3,
          right_arm: 11.2,
          left_leg: 15.1,
          right_leg: 14.8,
        },
        {
          date: "2024-05-01",
          overview: 9,
          torso: 11.6,
          left_arm: 11.1,
          right_arm: 11.0,
          left_leg: 14.7,
          right_leg: 14.6,
        },
        {
          date: "2024-06-01",
          overview: 8,
          torso: 11.4,
          left_arm: 10.8,
          right_arm: 10.7,
          left_leg: 14.5,
          right_leg: 14.5,
        },
        {
          date: "2024-07-01",
          overview: 7,
          torso: 11.2,
          left_arm: 10.7,
          right_arm: 10.5,
          left_leg: 14.4,
          right_leg: 14.4,
        },
        {
          date: "2024-08-01",
          overview: 6,
          torso: 11.0,
          left_arm: 10.4,
          right_arm: 10.2,
          left_leg: 14.2,
          right_leg: 14.2,
        },
        {
          date: "2024-09-01",
          overview: 6,
          torso: 10.8,
          left_arm: 10.1,
          right_arm: 9.9,
          left_leg: 14.1,
          right_leg: 14.0,
        },
        {
          date: "2024-10-01",
          overview: 7,
          torso: 10.6,
          left_arm: 9.9,
          right_arm: 9.7,
          left_leg: 14.0,
          right_leg: 14.0,
        },
        {
          date: "2024-11-01",
          overview: 8,
          torso: 10.4,
          left_arm: 9.7,
          right_arm: 9.5,
          left_leg: 13.8,
          right_leg: 13.9,
        },
        {
          date: "2024-12-01",
          overview: 9,
          torso: 10.2,
          left_arm: 9.5,
          right_arm: 9.3,
          left_leg: 13.7,
          right_leg: 13.8,
        },
      ],
    });
  }
}
