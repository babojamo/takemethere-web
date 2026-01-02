import { AxiosPromise } from 'axios';
import { SectionCreatePayload, SectionPaginatedResponse } from '../types/api/sections';
import { Section } from '../types/section';
import apiClient from '../api/http-common';

const BASE_URL = '/api/sections';

export const SectionService = {
  getSection(id: string): AxiosPromise<Section> {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  getSections(params?: Record<string, any>, options?: any): AxiosPromise<SectionPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params, ...options });
  },
  createSection(payload: SectionCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  updateSection(id: string, payload: SectionCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteSection(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
