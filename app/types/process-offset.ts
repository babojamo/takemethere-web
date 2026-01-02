import { Operator } from './operator';
import { User } from './users';

export interface ProcessOffset {
  id: string;
  name: string;
  description?: string;
  device_id?: string;
  created_by?: User;
  updated_by?: User;
  created_at: string;
  updated_at: string;
  operators?: Operator[];
}

export interface CachedProcessOffset {
  id?: string;
  remarks: string;
  device_id?: string;
}

export interface ProcessOffsetForm {
  id: string;
  name: string;
  description?: string;
  device_id?: string;
  operator_ids?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}
