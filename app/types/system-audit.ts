import { User } from './users';

export interface SystemAudit {
  id: string;
  user: User;
  action: string;
  model: string;
  meta: {};
  ip: string;
  created_at: string;
  updated_at: string;
}
