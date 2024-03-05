import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useGyms = () => {
  const { data, error, isLoading, mutate } = useSWR("/gyms", apiFetcher);

  return {
    gyms: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};

export const useUniqueGym = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/gyms/${id}`, apiFetcher);

  return {
    gym: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
