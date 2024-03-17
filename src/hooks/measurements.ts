import { apiUrls } from "@/lib/apiUrls";
import { Measurement } from "@/types/measurements";
import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useUniqueLastMeasure = (userId: string): any => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getLastMeasureByUser(userId),
    apiFetcher
  );

  return {
    lastMeasure: data,
    error,
    isLoading,
    refetch: mutate,
  };
};

interface UseMeasurementsReturn {
  measurements: Measurement[];
  error: any;
  isLoading: boolean;
  refetch: () => Promise<any>;
}

export const useMeasurements = (): UseMeasurementsReturn => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.get,
    apiFetcher
  );

  return {
    measurements: data,
    error,
    isLoading,
    refetch: mutate,
  };
};
