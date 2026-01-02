import { AxiosPromise } from 'axios';
import { StyleBundleEntryLog } from '../types/styles';
import apiClient from '../api/http-common';

const BASE_URL = '/api/bundle-entry';

export const KioskService = {
  logBundle(
    bundle_number: string,
    department_id: string,
    logger_barcode: string,
    returned: boolean = false,
    remarks: string | null = null
  ): AxiosPromise<StyleBundleEntryLog> {
    return apiClient.post(`${BASE_URL}/log`, {
      barcode: bundle_number,
      department_id,
      returned,
      remarks,
      logger_barcode
    });
  }
};
