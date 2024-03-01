import axios from "axios";

export const coreClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const mockClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API_URL,
});
