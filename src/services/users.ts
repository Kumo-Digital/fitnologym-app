import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";
import { ChangePasswordForm, UserForm } from "@/types/user";

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

export const changePassword = async (userId: string, payload: ChangePasswordForm) => {
  const { data } = await apiClient.put(apiUrls.users.changePassword(userId), {
    ...payload,
  });

  return data;
};

export const recoverPassword = async (dni: string) => {
  const { data } = await apiClient.post(apiUrls.users.recoverPassword, {
    dni: dni,
  });

  return data;
}

export const saveLastLoggedInDate = async (userId: string) => {
  const { data } = await apiClient.post(apiUrls.users.saveLastLoggedInDate(userId));

  return data;
}

export const deleteUser = async (userId: string) => {
  const { data } = await apiClient.delete(apiUrls.users.delete(userId));

  return data;
};

export const getUniqueUser = async (userId: string) => {
  const { data } = await apiClient.get(apiUrls.users.getById(userId));

  return data;
};
