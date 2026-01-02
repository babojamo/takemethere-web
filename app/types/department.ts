import { User } from './users';

export interface Department {
  id: string;
  name: string;
  immutable?: boolean;
  line_id?: string;
  created_by?: User;
  updated_by?: User;
  created_at: string;
  updated_at: string;
}

export interface DepartmentForm {
  id: string;
  name: string;
  immutable?: boolean;
  line_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
