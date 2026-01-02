import { User } from '@/app/types/users';

import apiClient from '../api/http-common';
import type { AxiosPromise } from 'axios';
import { UserCreatePayload } from '../types/api/users';

const BASE_URL = '/api/users';

class UserService {
  getUsers(payload?: Record<string, any>, options?: any): AxiosPromise {
    return apiClient.get(`${BASE_URL}`, { params: { ...payload }, ...options });
  }

  getUser(id: string) {
    return apiClient.get(`${BASE_URL}/${id}`);
  }

  getUserByEmail(email: string) {
    return apiClient.get(`${BASE_URL}`, { params: { email } });
  }

  getMe() {
    return apiClient.get(`${BASE_URL}/me`);
  }

  createUser(payload: UserCreatePayload) {
    return apiClient.post(`${BASE_URL}`, payload);
  }

  updateUser(id: string, payload: UserCreatePayload) {
    return apiClient.put(`${BASE_URL}/${id}`, payload);
  }

  deleteUser(id: string) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  }

  updateUserAccount(payload: { password?: string; username?: string }) {
    return apiClient.put<User>(`${BASE_URL}/me/account`, payload);
  }
}

export default new UserService();
