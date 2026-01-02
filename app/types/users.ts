export enum UserRole {
  OPERATOR = 'operator',
  ADMIN = 'admin',
  MANAGER = 'manager',
  BUNDLE_LOGGER = 'bundle-logger'
}
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  created_by?: User;
  updated_by?: User;
  created_at: string;
  updated_at: string;
  refreshToken?: string;
}

export interface UserForm {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  barcode_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
