import { apiUrls } from "@/lib/apiUrls";
import { Measurement } from "@/types/measurements";
import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

export const useUniqueMeasure = (measurementId: string): any => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getMeasurement(measurementId),
    apiFetcher
  );

  return {
    measurement: data,
    error,
    isLoading,
    refetch: mutate,
  };
};

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

export const useUniqueFirstMeasure = (userId: string): any => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getFirstMeasureByUser(userId),
    apiFetcher
  );

  return {
    firstMeasure: data,
    error,
    isLoading,
    refetch: mutate,
  };
};

export const useCalculateEvolution = (userId: string): any => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getEvolution(userId),
    apiFetcher
  );

  return {
    evolution: data,
    error,
    isLoading,
    refetch: mutate,
  };
};

export const useCalculateEvolutionFromFirstToLast = (userId: string): any => {
  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.measurements.getEvolutionFromFirstToLast(userId),
    apiFetcher
  );

  return {
    evolutionFromFirstToLast: data,
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
    refetch: mutate
  }
}
