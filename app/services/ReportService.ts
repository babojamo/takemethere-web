import { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import {
  ProductionMonthlyEfficiencyResponse,
  ReportProductionDailyOutputResponse,
  ReportSectionDailyProcessOutputResponse,
  ReportShipmentStatusResponse,
  ReportStyleBundleEntryLogResponse,
  ReportSystemAuditResponse
} from '../types/api/reports';
import { SystemAudit } from '../types/system-audit';
import { ProductionDailyOutput, ReportShipmentStatus } from '../types/reports';

const BASE_URL = '/api/reports';

export const ReportService = {
  getProductionDailyOutput(params?: Record<string, any>): AxiosPromise<ReportProductionDailyOutputResponse> {
    return apiClient.get(`${BASE_URL}/production-daily-outputs`, { params });
  },
  getSectionDailyOutput(params?: Record<string, any>): AxiosPromise<ReportSectionDailyProcessOutputResponse> {
    return apiClient.get(`${BASE_URL}/sections-daily-outputs`, { params });
  },
  getAllProductionDailyOutput(params?: Record<string, any>): AxiosPromise<ProductionDailyOutput[]> {
    return apiClient.get(`${BASE_URL}/production-daily-outputs`, { params: { ...params, no_limit: true } });
  },
  getAllSystemAudit(params?: Record<string, any>, options?: any): AxiosPromise<ReportSystemAuditResponse> {
    return apiClient.get(`${BASE_URL}/system-audits`, { params, ...options });
  },
  getAllBundleEntryLogs(params?: Record<string, any>, options?: any): AxiosPromise<ReportStyleBundleEntryLogResponse> {
    return apiClient.get(`${BASE_URL}/bundle-entry-logs`, { params, ...options });
  },
  getAllShipmentStatus(params?: Record<string, any>, options?: any): AxiosPromise<ReportShipmentStatusResponse> {
    return apiClient.get(`${BASE_URL}/shipment-status`, { params, ...options });
  },
  exportProductionDailyOutput(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/production-daily-outputs`, { params, responseType: 'blob' });
  },
  exportAllBundleEntryLogs(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/bundle-entry-logs`, { params, responseType: 'blob' });
  },
  getProductionMonthlyEfficiency(params?: Record<string, any>): AxiosPromise<ProductionMonthlyEfficiencyResponse> {
    return apiClient.get(`${BASE_URL}/production-monthly-efficiency`, { params });
  },
  exportProductionMonthlyEfficiency(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/production-monthly-efficiency`, { params, responseType: 'blob' });
  },
  exportShipmentStatus(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/shipment-status`, { params, responseType: 'blob' });
  },
  exportReleasedBundles(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/released-bundles`, { params, responseType: 'blob' });
  },
  exportProcessSheet(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/process-sheet`, { params, responseType: 'blob' });
  },
  exportSectionDailyOutput(params?: Record<string, any>): AxiosPromise<Blob> {
    return apiClient.get(`${BASE_URL}/exports/sections-daily-outputs`, { params, responseType: 'blob' });
  }
};
