import { apiUrls } from "@/lib/apiUrls";
import { User } from "@/types/user";
import { apiFetcher } from "@/utils/apiUtils";
import useSWR from "swr";

type UseUsersProps = { but: "admins" | "basic" | "plus" | "premium" };
type UseUniqueUserProps = { id: string } | { email: string };
interface UseUsersPayload {
  users: User[];
  isLoading: boolean;
  isError: any;
  refetch: any;
}

interface UseUniqueUserPayload {
  user: User;
  isLoading: boolean;
  isError: any;
  refetch: any;
}

export const useUsers = (options?: UseUsersProps): UseUsersPayload => {
  if (options?.but === "admins") {
    const { data, error, isLoading, mutate } = useSWR(
      apiUrls.users.getAllUsersButAdmins,
      apiFetcher
    );

    return {
      users: data,
      isLoading,
      isError: error,
      refetch: mutate,
    };
  }

  const { data, error, isLoading, mutate } = useSWR(
    apiUrls.users.get,
    apiFetcher
  );

  return {
    users: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
};

export const useUniqueUser = (
  identifier: UseUniqueUserProps
): UseUniqueUserPayload => {
  if ("id" in identifier) {
    const { data, error, isLoading, mutate } = useSWR(
      apiUrls.users.getById(identifier.id),
      apiFetcher
    );

    return {
      user: data,
      isLoading,
      isError: error,
      refetch: mutate,
    };
  }

  if ("email" in identifier) {
    const validURI = encodeURIComponent(identifier.email);
    const { data, error, isLoading, mutate } = useSWR(
      apiUrls.users.getById(validURI),
      apiFetcher
    );

    return {
      user: data,
      isLoading,
      isError: error,
      refetch: mutate,
    };
  }

  return {} as any;
};
