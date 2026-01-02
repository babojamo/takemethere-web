import { SaveStyleFabricPayload, StyleBundlePaginatedResponse, StyleReleaseFabricPayload } from '../types/api/styles';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { StyleBundle, StyleBundleEntryLog } from '../types/styles';
import { ReportStyleBundleEntryLog } from '../types/reports';

const BASE_URL = '/api/style-bundles';

export const StyleBundleService = {
  getBundles(params?: Record<string, any>): AxiosPromise<StyleBundlePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  getStyleBundles(style_id: string): AxiosPromise<StyleBundle[]> {
    return apiClient.get(`${BASE_URL}/styles/${style_id}`);
  },
  releaseFabrics(payload: StyleReleaseFabricPayload, style_id: string): AxiosPromise<StyleBundle[]> {
    return apiClient.post(`${BASE_URL}/release-fabrics/${style_id}`, payload);
  },
  updateFabricBundle(id: string, payload: SaveStyleFabricPayload): AxiosPromise<StyleBundle> {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  releaseFabricBundle(id: string): AxiosPromise<StyleBundleEntryLog> {
    return apiClient.post(`${BASE_URL}/${id}/release`);
  },
  releaseFabricBundleBarcode(barcode: string): AxiosPromise<StyleBundleEntryLog> {
    return apiClient.post(`${BASE_URL}/release-barcode`, { barcode });
  },
  getFabricBundle(id: string): AxiosPromise<StyleBundle> {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  getBundleFlow(id: string): AxiosPromise<ReportStyleBundleEntryLog[]> {
    return apiClient.get(`${BASE_URL}/${id}/bundle-flow`);
  },
  deleteBundle(id: string): AxiosPromise<void> {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
