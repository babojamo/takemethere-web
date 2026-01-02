import { User } from './users';

export interface Process {
  id: string;
  name: string;
  code: string;
  created_by?: User;
  updated_by?: User;
  created_at: string;
  updated_at: string;
}

export interface ProcessForm {
  id: string;
  name: string;
  code: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
