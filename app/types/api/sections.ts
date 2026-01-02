import { PaginatedResponse } from '.';
import { Section } from '../section';

export interface SectionCreatePayload {
  name: string;
  department_id?: string;
  shift_start?: string;
  shift_end?: string;
  breaktimes?: {
    id: string | null;
    type: string;
    time_start: string;
    time_end: string;
  }[];
}

export interface SectionPaginatedResponse extends PaginatedResponse {
  data?: Section[];
}
