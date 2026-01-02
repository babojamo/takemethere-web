import { StatusModel } from '@/app/constants/status';

export interface StatusPayload {
  model: StatusModel;
  id: string;
  status: string;
}
