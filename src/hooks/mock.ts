import { mockFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useUsers = (id?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/users` + id && `/${id}`,
    mockFetcher
  );

  return {
    users: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};

export const useGyms = (id?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/gyms` + id && `/${id}`,
    mockFetcher
  );

  return {
    gyms: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
