export interface Pagination {
  current_page?: number;
  data: any;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: {
    url?: string;
    label?: string;
    active?: boolean;
  }[];
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}

export type Option = { label: string; value: number; meta?: any };
