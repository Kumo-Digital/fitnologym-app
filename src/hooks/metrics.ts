import { apiUrls } from "@/lib/apiUrls";
import { apiFetcher, mockFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useMetrics = (filters: URLSearchParams) => {
  const params = new URLSearchParams(filters);

  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.metrics.get(params.toString()),
    apiFetcher
  );

  return {
    metrics: data ? data[0] : [],
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
