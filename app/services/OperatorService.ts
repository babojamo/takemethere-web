import { AxiosPromise } from 'axios';
import { Operator } from '@/app/types/operator';
import { OperatorCreatePayload, OperatorPaginatedResponse } from '../types/api/operators';
import apiClient from '../api/http-common';

const BASE_URL = '/api/operators';

export const OperatorService = {
  getOperators(params?: Record<string, any>, options?: any): AxiosPromise<OperatorPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params, ...options });
  },
  createOperator(payload: OperatorCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  getOperator(id: string) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  updateOperator(id: string, payload: OperatorCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteOperator(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
