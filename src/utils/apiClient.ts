import axios from "axios";

export const coreClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
  },
});

export const mockClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API_URL,
});
