import { Gym } from "@/types/gym";
import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

interface UseGymPayload {
  gyms: Gym[];
  isLoading: boolean;
  isError: any;
  refetch: any;
}
interface UseUniqueGymPayload {
  gym: Gym;
  isLoading: boolean;
  isError: any;
  refetch: any;
}

export const useGyms = (): UseGymPayload => {
  const { data, error, isLoading, mutate } = useSWR("/gyms", apiFetcher);

  return {
    gyms: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};

export const useUniqueGym = (id: string): UseUniqueGymPayload => {
  const { data, error, isLoading, mutate } = useSWR(`/gyms/${id}`, apiFetcher);

  return {
    gym: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};
