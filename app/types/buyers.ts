import { User } from './users';

export interface Buyer {
  id: string;
  name: string;
  buyer_logo_path?: string;
  created_by?: User;
  updated_by?: User;
  created_at: string;
  updated_at: string;
}

export interface BuyerForm {
  id: string;
  name: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
