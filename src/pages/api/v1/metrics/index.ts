import MetricService from "@/db/services/metric";
import connectDB from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, metric, startDate, endDate } = req.query as { userId: string, metric: string, startDate: string, endDate: string };
    if (!userId || !metric || !startDate || !endDate) res.status(422).json({ message: "Missing parameters" });
    await connectDB();
    const metricService = new MetricService();
    const metrics = await metricService.getMetrics(userId, metric, startDate, endDate);

    if (!metrics) res.status(404).json({ message: "Metrics couldn't be filtered" });
    res.status(200).json(metrics);
  } catch (e) {
    console.error(e);
  }
}
