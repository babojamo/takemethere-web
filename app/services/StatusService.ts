import apiClient from '../api/http-common';
import type { AxiosPromise } from 'axios';
import { User } from '../types/users';
import { Style } from 'util';
import { StatusPayload } from '../types/api/status';

const BASE_URL = '/api/status';

class StatusService {
  update(payload: StatusPayload): AxiosPromise<User | Style> {
    return apiClient.post(`${BASE_URL}`, payload);
  }
}

export default new StatusService();
