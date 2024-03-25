import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";

interface LoginUserPayload {
  email: string;
  password: string;
  // remember: boolean;
}

export const loginUser = async (payload: LoginUserPayload) => {
  const { data } = await apiClient.post(apiUrls.auth.login, payload);

  return data;
};

export const logoutUser = async () => {
  await apiClient.post(apiUrls.auth.logout);
};
