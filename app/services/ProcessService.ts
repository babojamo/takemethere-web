import { Process } from '@/app/types/process';
import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { ProcessCreatePayload, ProcessPaginatedResponse } from '../types/api/process';
import { get } from 'http';

const BASE_URL = '/api/processes';

export const ProcessService = {
  getProcess(id: string): AxiosPromise<Process> {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  getProcesses(params?: Record<string, any>, options?: any): AxiosPromise<ProcessPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params, ...options });
  },
  createProcess(payload: ProcessCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  updateProcess(id: string, payload: ProcessCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteProcess(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
