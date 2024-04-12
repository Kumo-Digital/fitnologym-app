import { mockFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useUsers = (id?: number) => {
  const key = id ? `/users/${id}` : "/users";
  const { data, error, isLoading, mutate } = useSWR(key, mockFetcher);

  return {
    users: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};

export const useGyms = (id?: number) => {
  const key = id ? `/gyms/${id}` : "/gyms";
  const { data, error, isLoading, mutate } = useSWR(key, mockFetcher);

  return {
    gyms: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
