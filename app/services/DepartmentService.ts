import { AxiosPromise } from 'axios';
import { Department } from '../types/department';
import { DepartmentCreatePayload, DepartmentPaginatedResponse } from '../types/api/department';
import apiClient from '../api/http-common';

const BASE_URL = '/api/departments';

export const DepartmentService = {
  getDepartment(id: string) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },
  getDepartmentes(params?: Record<string, any>, options?: any): AxiosPromise<DepartmentPaginatedResponse> {
    return apiClient.get(`${BASE_URL}`, { params, ...options });
  },
  createDepartment(payload: DepartmentCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  updateDepartment(id: string, payload: DepartmentCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  },
  deleteDepartment(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }
};
