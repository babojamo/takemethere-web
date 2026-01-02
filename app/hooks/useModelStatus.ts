import { useState } from 'react';
import { StatusModel } from '../constants/status';
import StatusService from '../services/StatusService';
import { User } from '../types/users';
import { Style } from 'util';

export default function useModelStatus() {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const updateStatus = async (id: string, status: string, model: StatusModel): Promise<User | Style> => {
    try {
      setIsSaving(true);
      const { data } = await StatusService.update({ id, model, status });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    updateStatus,
    isSaving
  };
}
