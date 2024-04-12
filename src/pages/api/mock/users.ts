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
        fullname: "Juan Perez",
        dni: "12345678",
        email: "juan@example.com",
        gym_id: 1,
        user_type: "basic",
        gender: "male",
      },
      {
        id: 2,
        fullname: "Maria Garcia",
        dni: "23456789",
        email: "maria@example.com",
        gym_id: 2,
        user_type: "plus",
        gender: "female",
      },
      {
        id: 3,
        fullname: "Carlos Martinez",
        dni: "34567890",
        email: "carlos@example.com",
        gym_id: 3,
        user_type: "premium",
        gender: "male",
      },
      {
        id: 4,
        fullname: "Luisa Fernandez",
        dni: "45678901",
        email: "luisa@example.com",
        gym_id: 4,
        user_type: "basic",
        gender: "female",
      },
      {
        id: 5,
        fullname: "Pedro Gomez",
        dni: "56789012",
        email: "pedro@example.com",
        gym_id: 1,
        user_type: "plus",
        gender: "male",
      },
      {
        id: 6,
        fullname: "Ana Rodriguez",
        dni: "67890123",
        email: "ana@example.com",
        gym_id: 2,
        user_type: "premium",
        gender: "female",
      },
      {
        id: 7,
        fullname: "Diego Suarez",
        dni: "78901234",
        email: "diego@example.com",
        gym_id: 3,
        user_type: "basic",
        gender: "male",
      },
      {
        id: 8,
        fullname: "Laura Diaz",
        dni: "89012345",
        email: "laura@example.com",
        gym_id: 4,
        user_type: "plus",
        gender: "female",
      },
      {
        id: 9,
        fullname: "Pablo Lopez",
        dni: "90123456",
        email: "pablo@example.com",
        gym_id: 1,
        user_type: "premium",
        gender: "male",
      },
      {
        id: 10,
        fullname: "Carmen Martinez",
        dni: "01234567",
        email: "carmen@example.com",
        gym_id: 2,
        user_type: "basic",
        gender: "female",
      },
    ]);
  }
}
