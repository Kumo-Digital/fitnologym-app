import { coreClient, mockClient } from "@/lib/apiClient";
import { AxiosError } from "axios";

const coreUrl = process.env.NEXT_PUBLIC_API_URL;
const mockUrl = process.env.NEXT_PUBLIC_MOCK_API_URL;
const token = `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;
const API_URL_V1 = "/api/v1";

export const apiFetcher = async (url: string) => {
  return coreClient
    .get<any>(url)
    .then((res) => res.data)
    .catch((e: AxiosError | any) => {
      // TODO: Handle Error, should we logout the user from the site?
  });
}

export const mockFetcher = async (url: string) => {
  return mockClient
    .get<any>(url)
    .then((res) => res.data)
    .catch((e: AxiosError | any) => {
      // TODO: Handle Error, should we logout the user from the site?
  });
}