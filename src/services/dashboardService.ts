import apiClient from "../lib/api";
import type { DashboardStats } from "../types";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<DashboardStats>("/dashboard/stats");
  return response.data;
};
