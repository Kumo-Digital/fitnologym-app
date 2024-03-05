import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";
import { UserType } from "@/types/user";

interface UserPayload {
  fullname: string;
  dni: number;
  user_type: UserType;
  gym_id: number;
  email: string;
  gender: "male" | "female";
}

export const createUser = async (payload: UserPayload) => {
  const { data } = await apiClient.post(apiUrls.users.create, {
    ...payload,
    role: "user",
  });

  return data;
};
