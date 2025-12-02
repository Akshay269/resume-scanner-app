import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken({ template: "default" });
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
