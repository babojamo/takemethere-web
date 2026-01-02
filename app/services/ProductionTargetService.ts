import apiClient from '../api/http-common';
import { AxiosPromise } from 'axios';
import { GetProductionTargetPayload, LogProductionTargetPayload, StoreProductionTargetPayload } from '../types/api/production-target';
import { ProductionTarget, ProductionTargetLog } from '../types/production-target';
import { formatDbDate } from '../utils';

const BASE_URL = '/api/production-targets';

export const ProductionTargetService = {
  getTargets(params: GetProductionTargetPayload): AxiosPromise<ProductionTarget[]> {
    return apiClient.get(`${BASE_URL}`, { params });
  },
  storeTargets(payload: StoreProductionTargetPayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  },
  duplicate(date_from: Date, date_to: Date): AxiosPromise<ProductionTarget[]> {
    return apiClient.post(`${BASE_URL}/duplicate`, {
      date_from: formatDbDate(date_from),
      date_to: formatDbDate(date_to)
    });
  },
  counterLog(payload: LogProductionTargetPayload): AxiosPromise<ProductionTargetLog> {
    return apiClient.post(`${BASE_URL}/target`, payload);
  }
};
