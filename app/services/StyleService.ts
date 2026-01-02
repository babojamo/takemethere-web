import { StyleSavePayload, StylePaginatedResponse, StylePlannedFabricsResponse, StyleStoredQuantityResponse } from '../types/api/styles';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';

const BASE_URL = '/api/styles';

export const StyleService = {
  getStyles(params?: Record<string, any>): AxiosPromise<StylePaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  getPlannedFabrics(style_id: string): AxiosPromise<StylePlannedFabricsResponse> {
    return apiClient.get(`${BASE_URL}/planned-fabrics/${style_id}`);
  },
  getStyle(id: string) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  createStyle(payload: StyleSavePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  updateStyle(id: string, payload: StyleSavePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteStyle(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },
  import(payload: FormData) {
    return apiClient.post(`${BASE_URL}/import`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getStoredSizeQuantity(size_id: string): AxiosPromise<StyleStoredQuantityResponse> {
    return apiClient.get(`${BASE_URL}/stored-size-quantity/${size_id}`);
  }
};
