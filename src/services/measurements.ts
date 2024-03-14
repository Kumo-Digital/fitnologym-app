import { apiClient } from "@/lib/apiClient";
import { apiUrls } from "@/lib/apiUrls";
import { MeasurementFormValues } from "@/types/admin";

export const createMeasurement = async (payload: MeasurementFormValues) => {
  const { data } = await apiClient.post(apiUrls.measurements.create, payload);

  return data;
};
