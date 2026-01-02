import { PaginatedResponse } from '.';
import { Buyer } from '../buyers';

export interface BuyerCreatePayload {
  name: string;
}

export interface BuyerPaginatedResponse extends PaginatedResponse {
  data?: Buyer[];
}
