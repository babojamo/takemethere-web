import { PaginatedResponse } from '.';
import { ProcessOffset } from '../process-offset';

export interface ProcessOffsetCreatePayload {
  name: string;
  description: string;
}

export interface ProcessOffsetPaginatedResponse extends PaginatedResponse {
  data?: ProcessOffset[];
}
