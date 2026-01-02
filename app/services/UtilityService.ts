import type { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import { Department } from '../types/department';
import { Section } from '../types/section';
import { Process } from '../types/process';
import { StyleBundlePaginatedResponse, StylePaginatedResponse } from '../types/api/styles';
import { Operator } from '../types/operator';
import { Buyer } from '../types/buyers';

const BASE_URL = '/api/utils';

class UtilityService {
  itemTypes(): AxiosPromise {
    return apiClient.get(`${BASE_URL}/item-types`);
  }
  buyers(): AxiosPromise<Buyer[]> {
    return apiClient.get(`${BASE_URL}/buyers`);
  }
  departments(): AxiosPromise<Department[]> {
    return apiClient.get(`${BASE_URL}/departments`);
  }
  sections(): AxiosPromise<Section[]> {
    return apiClient.get(`${BASE_URL}/sections`);
  }
  processes(): AxiosPromise<Process[]> {
    return apiClient.get(`${BASE_URL}/processes`);
  }
  operators(): AxiosPromise<Operator[]> {
    return apiClient.get(`${BASE_URL}/operators`);
  }
  findStyles(keyword: string, perPage: number = 15): AxiosPromise<StylePaginatedResponse> {
    return apiClient.get(`${BASE_URL}/find-styles`, { params: { q: keyword, page: 1, perPage } });
  }
  findBundles(keyword: string, perPage: number = 15): AxiosPromise<StyleBundlePaginatedResponse> {
    return apiClient.get(`${BASE_URL}/find-bundles`, { params: { q: keyword, page: 1, perPage } });
  }
  productionTrackClassifications(): AxiosPromise<string[]> {
    return apiClient.get(`${BASE_URL}/production-track-classifications`);
  }
}
export default new UtilityService();
