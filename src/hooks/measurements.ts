import { apiUrls } from "@/lib/apiUrls";
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
