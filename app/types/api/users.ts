export interface UserCreatePayload {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  status: string;
  barcode_id?: string;
}
