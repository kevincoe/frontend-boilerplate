import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient from '../lib/api';
import { fetchDashboardStats } from './dashboardService';
import type { DashboardStats } from '../types';

vi.mock('../lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('dashboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch dashboard stats', async () => {
    const mockStats: DashboardStats = {
      totalEquipment: 100,
      rentedEquipment: 50,
      activeCustomers: 10,
      activeOrders: 5,
      monthlyRevenue: 5000,
      recentOrders: [],
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockStats });

    const result = await fetchDashboardStats();

    expect(apiClient.get).toHaveBeenCalledWith('/dashboard/stats');
    expect(result).toEqual(mockStats);
  });
});
