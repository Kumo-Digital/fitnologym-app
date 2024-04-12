import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";

interface GymPayload {
  name: string;
  address: string;
  city: string;
  image_url?: string;
}

export const createGym = async (payload: GymPayload) => {
  const { data } = await apiClient.post(apiUrls.gyms.create, payload);

  return data;
};

export const editGym = async (payload: GymPayload, id: string) => {
  const { data } = await apiClient.put(apiUrls.gyms.edit(id), payload);

  return data;
};

export const deleteGym = async (id: string) => {
  const { data } = await apiClient.delete(apiUrls.gyms.delete(id));

  return data;
};
