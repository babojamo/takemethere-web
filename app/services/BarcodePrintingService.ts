import { AxiosPromise } from 'axios';
import { BarcodePrinter, BarcodePrinting } from '../types/barcodes';
import { QueueBarcodePrintPayload } from '../types/api/barcode';
import apiClient from '../api/http-common';

const BASE_URL = '/api/barcode-printing';

export const BarcodePrintingService = {
  getBarcodePrinters(params?: Record<string, any>): AxiosPromise<BarcodePrinter[]> {
    return apiClient.get(`${BASE_URL}/printers`, { params });
  },

  getPrintingQueues(params?: Record<string, any>): AxiosPromise<BarcodePrinting[]> {
    return apiClient.get(`${BASE_URL}/queues`, { params });
  },
  storeQueues(payload: QueueBarcodePrintPayload) {
    return apiClient.post(`${BASE_URL}/queues`, payload);
  }
};
