import { apiUrls } from "@/lib/apiUrls";
import { Metrics } from "@/types/measurements";
import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

interface MetricsResponse {
  metrics: Metrics;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<Metrics>;
}

export const useMetrics = (filters: URLSearchParams): MetricsResponse => {
  const params = new URLSearchParams(filters);

  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.metrics.get(params.toString()),
    apiFetcher
  );

  return {
    metrics: data ? data[0] : {},
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
