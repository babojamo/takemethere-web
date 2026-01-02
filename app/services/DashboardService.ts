import apiClient from '../api/http-common';
import type { AxiosPromise } from 'axios';
import {
  DashboardMonthlyEfficiency,
  DashboardOperatorEfficiency,
  DashboardStats,
  DashboardWeeklyEfficiency,
  DashboardYearlyEfficiency,
  MachinePleatsDashboard
} from '../types/dashboard';
import { StyleBundle } from '../types/styles';
import { formatDbDate } from '../utils';

const BASE_URL = '/api/dashboard';

class DashboardService {
  fetchStats(): AxiosPromise<DashboardStats> {
    return apiClient.get(`${BASE_URL}/stats`);
  }
  fetchYearlyEfficiency(year: number, section_id?: number): AxiosPromise<DashboardYearlyEfficiency[]> {
    return apiClient.get(`${BASE_URL}/yearly-efficiency`, { params: { year, section_id } });
  }
  fetchMonthlyEfficiency(year: number, month: number, section_id?: number): AxiosPromise<DashboardMonthlyEfficiency[]> {
    return apiClient.get(`${BASE_URL}/monthly-efficiency`, { params: { year, month, section_id } });
  }
  fetchWeeklyEfficiency(from: Date, to: Date, section_id?: number): AxiosPromise<DashboardWeeklyEfficiency[]> {
    return apiClient.get(`${BASE_URL}/weekly-efficiency`, { params: { from: formatDbDate(from), to: formatDbDate(to), section_id } });
  }
  fetchRecentBundles(): AxiosPromise<StyleBundle[]> {
    return apiClient.get(`${BASE_URL}/recent-bundles`);
  }
  fetchUnreleasedBundles(): AxiosPromise<StyleBundle[]> {
    return apiClient.get(`${BASE_URL}/unreleased-bundles`);
  }
  fetchOperatorEfficiency(): AxiosPromise<DashboardOperatorEfficiency[]> {
    return apiClient.get(`${BASE_URL}/operators-efficiency`);
  }
  fetchMachinePleatsStats(): AxiosPromise<MachinePleatsDashboard[]> {
    return apiClient.get(`${BASE_URL}/machine-pleats`);
  }
}

export default new DashboardService();
