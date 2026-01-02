import { Department } from './department';
import { User } from './users';

export interface Section {
  id?: string;
  name: string;
  shift_start?: string | Date;
  shift_end?: string | Date;
  created_by?: User;
  updated_by?: User;
  created_at?: string;
  updated_at?: string;
  department_id?: string;
  department?: Department;
  breaktimes?: SectionBreaktime[];
}

export interface SectionForm {
  id: string;
  name: string;
  department_id?: string;
  shift_start?: string | Date;
  shift_end?: string | Date;
  created_by?: string;
  created_at: string;
  updated_at: string;
  breaktimes?: SectionBreaktime[];
}

export interface SectionBreaktime {
  id?: string;
  section_id?: string;
  type?: string;
  time_start?: string | Date;
  time_end?: string | Date;
}
