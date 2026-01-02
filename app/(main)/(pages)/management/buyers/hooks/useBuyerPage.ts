import { BuyerService } from '@/app/services/BuyerService';
import { DefaultFormData } from '@/app/types/form';
import { useState } from 'react';

export const useBuyerPage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const saveBuyer = async (e: DefaultFormData) => {
    try {
      const form = new FormData();
      form.append('name', e.name);

      if (e.buyer_logo) {
        form.append('buyer_logo', e.buyer_logo); // must match backend request key
      }

      setIsSaveLoading(true);
      const response = await BuyerService.createBuyer(form);
      setIsSaveLoading(false);
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  const updateBuyer = async (id: string, e: DefaultFormData) => {
    try {
      const form = new FormData();
      form.append('name', e.name);

      if (e.buyer_logo) {
        form.append('buyer_logo', e.buyer_logo);
      }

      setIsSaveLoading(true);
      const response = await BuyerService.updateBuyer(id, form);
      setIsSaveLoading(false);
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  return {
    saveBuyer,
    updateBuyer,
    isSaveLoading,
    isFetching,
    setIsFetching
  };
};
