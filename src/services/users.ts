import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";
import { UserForm } from "@/types/user";

export const createUser = async (payload: UserForm) => {
  const { data } = await apiClient.post(apiUrls.users.create, {
    ...payload,
    role: "user",
  });

  return data;
};
