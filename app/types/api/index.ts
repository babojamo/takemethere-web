export interface PaginatedResponse {
  current_page?: number;
  data?: any;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  to?: number;
  total?: number;
  per_page?: number;
}
