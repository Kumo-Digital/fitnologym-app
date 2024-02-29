import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * (2500 - 500 + 1)) + 500)
    );

    res.status(200).json([
      {
        id: 1,
        name: "Fitness World",
        address: "123 Main Street",
        city: "New York",
      },
      {
        id: 2,
        name: "Gym Fusion",
        address: "456 Elm Street",
        city: "Los Angeles",
      },
      {
        id: 3,
        name: "Powerhouse Gym",
        address: "789 Oak Avenue",
        city: "Chicago",
      },
      {
        id: 4,
        name: "BodyWorks Fitness",
        address: "101 Maple Drive",
        city: "Miami",
      },
    ]);
  }
}
