import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});

const adminToken =
  process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

apiClient.interceptors.request.use((config: any) => {
  config.headers.authorization = `Bearer ${adminToken}`;
  return config;
});
