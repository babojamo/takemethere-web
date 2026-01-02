import { PaginatedResponse } from '.';
import { Department } from '../department';

export interface DepartmentCreatePayload {
  name: string;
  immutable?: boolean;
}

export interface DepartmentPaginatedResponse extends PaginatedResponse {
  data?: Department[];
}
