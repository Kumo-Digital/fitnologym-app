import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";
import { UserForm } from "@/types/user";

export const createUser = async (payload: UserForm) => {
  const { data } = await apiClient.post(apiUrls.users.create, {
    ...payload,
    role: "user",
    last_logged_in: null,
  });

  return data;
};

export const editUser = async (payload: UserForm, userId: string) => {
  const { data } = await apiClient.put(apiUrls.users.edit(userId), {
    ...payload,
    role: "user",
  });

  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await apiClient.delete(apiUrls.users.delete(userId));

  return data;
};
