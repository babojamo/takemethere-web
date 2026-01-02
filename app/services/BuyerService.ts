import { Buyer } from '@/app/types/buyers';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { BuyerPaginatedResponse } from '../types/api/buyers';

const BASE_URL = '/api/buyers';

export const BuyerService = {
  getBuyer(id: string): AxiosPromise<Buyer> {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  getBuyers(params?: Record<string, any>, options?: any): AxiosPromise<BuyerPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params, ...options });
  },

  createBuyer(payload: FormData) {
    return apiClient.post(`${BASE_URL}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  updateBuyer(id: string, payload: FormData) {
    return apiClient.post(`${BASE_URL}/${id}?_method=PUT`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  deleteBuyer(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
