import UserService from '@/app/services/UserService';
import { DefaultFormData } from '@/app/types/form';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useContext, useState } from 'react';

export const useUserProfilePage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const { showApiError, showSuccess } = useContext(LayoutContext);

  const updateUserAccount = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await UserService.updateUserAccount({
        password: e.password,
        username: e.username
      });
      showSuccess('Account successfully updated.');
      return response;
    } catch (error) {
      showApiError(error, 'Failed to save account.');
      throw error;
    } finally {
      setIsSaveLoading(false);
    }
  };

  return {
    updateUserAccount,
    isSaveLoading
  };
};
