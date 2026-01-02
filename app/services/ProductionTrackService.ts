import { AxiosPromise } from 'axios';
import { formatDbDate } from '../utils';
import { GetProductionTrackPayload, StoreProductionTrackPayload } from '../types/api/production-track';
import { ProductionTrack } from '../types/production-track';
import apiClient from '../api/http-common';

const BASE_URL = '/api/production-tracks';

export const ProductionTrackService = {
  getTracks(section_id: string, params: GetProductionTrackPayload): AxiosPromise<ProductionTrack[]> {
    return apiClient.get(`${BASE_URL}/${section_id}`, { params });
  },
  storeTracks(payload: StoreProductionTrackPayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  duplicate(section_id: string, date_from: Date, date_to: Date): AxiosPromise<ProductionTrack[]> {
    return apiClient.post(`${BASE_URL}/duplicate/${section_id}`, {
      date_from: formatDbDate(date_from),
      date_to: formatDbDate(date_to)
    });
  }
};
