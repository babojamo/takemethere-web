import UserService from '@/app/services/UserService';
import { DefaultFormData } from '@/app/types/form';
import { useState } from 'react';

export const useUserPage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const saveUser = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await UserService.createUser({
        email: e.email,
        name: e.name,
        password: e.password,
        role: e.user_type,
        username: e.username,
        status: 'active',
        barcode_id: e.barcode_id
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  const updateUser = async (id: string, e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await UserService.updateUser(id, {
        email: e.email,
        name: e.name,
        password: e.password,
        role: e.user_type,
        username: e.username,
        status: 'active',
        barcode_id: e.barcode_id
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  return {
    saveUser,
    updateUser,
    isSaveLoading
  };
};
