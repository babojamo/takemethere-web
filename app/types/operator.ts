import { Process } from './process';
import { Section } from './section';
import { User } from './users';

export interface Operator {
  id: string;
  name: string;
  section_id?: string;
  section?: Section;
  created_by?: User;
  created_at?: string;
  updated_at?: string;
  operator_processes?: {
    id?: number;
    process_id?: number;
    section_id?: number;
    time?: number;
    barcode?: string;
    process: Process;
  }[];
}

export interface OperatorForm {
  id?: string;
  name?: string;
  section_id?: string;
  section?: Section;
  operator_processes?: Process[];
  process_ids?: string[]; // Array of process IDs
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OperatorProcess {
  id?: string | number;
  operator_id?: string;
  operator?: Operator;
  process_id?: string;
  process_name?: string;
  total_output?: number;
  target?: number;
  classification?: string;
  outputs?: {
    [time: string]: number | string | undefined;
  };
}

export interface OperatorBuyer {
  id?: string | number;
  operator_id?: string;
  operator?: Operator;
  process_id?: string;
  process_name?: string;
  total_output?: number;
  target?: number;
  classification?: string;
  outputs?: {
    [time: string]: number | string | undefined;
  };
}
