import MetricService from "@/db/services/metric";
import connectDB from "@/lib/db";
import { getLastDayOfMonth } from "@/utils/analysis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, metric, startMonth, endMonth } = req.query as { userId: string, metric: string, startMonth: string, endMonth: string };
    if (!userId || !metric || !startMonth || !endMonth) res.status(422).json({ message: "Missing parameters" });
    await connectDB();
    const metricService = new MetricService();

    // Parse dates for the MongoDB find() method
    const dates = endMonth.split('-');
    const lastDayOfEndDate = getLastDayOfMonth(dates[0], dates[1]);
    const parsedStartDate = startMonth.split('T')[0].slice(0, -2).concat('01');
    const parsedEndDate = endMonth.split('T')[0].slice(0, -2).concat(lastDayOfEndDate.toString());

    const metrics = await metricService.getMetrics(userId, metric, parsedStartDate, parsedEndDate);

    if (!metrics) res.status(404).json({ message: "Metrics couldn't be filtered" });
    res.status(200).json(metrics);
  } catch (e) {
    console.error(e);
  }
}
