import { AxiosError } from "axios";
import { coreClient, mockClient } from "@/lib/apiClient";

export const apiFetcher = async (url: string) => {
  return coreClient
    .get<any>(url)
    .then((res) => res.data)
    .catch((e: AxiosError | any) => {
      // TODO: Handle Error, should we logout the user from the site?
    });
};

export const mockFetcher = async (url: string) => {
  return mockClient
    .get<any>(url)
    .then((res) => res.data)
    .catch((e: AxiosError | any) => {
      // TODO: Handle Error, should we logout the user from the site?
    });
};
