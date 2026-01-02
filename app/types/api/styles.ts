import { PaginatedResponse } from '.';
import { Style, StyleBundle, StylePlannedFabric, StylePlannedFabricSize } from '../styles';

export interface StyleSavePayload {
  control_number: string;
  buyer_id: string;
  section_id?: string;
  style_number: string;
  pleats_name?: string | null;
  item_type?: string | null;
  ship_date_from_japan?: string | null; // ISO date string: "YYYY-MM-DD"
  ship_date_from_cebu?: string | null; // ISO date string
  noumae?: string | null;
  sample?: string | null;
  season?: string | null;
  pattern?: string | null;
  style_items?: ItemStyleSavePayload[];
  style_fabrics?: ItemFabricCreatePayload[];
}

export interface ItemStyleSavePayload {
  item_name?: string;
  item_number?: string;
  specs_qty?: number;
  specs_unit?: string;
  youjyaku_qty?: number;
  youjyaku_unit?: string;
  color_detail?: string;
}

export interface ItemFabricCreatePayload {
  col_number?: string;
  color?: string;
  size_zero?: number;
  size_one?: number;
  size_two?: number;
  size_three?: number;
  size_four?: number;
  size_five?: number;
}

export interface StylePaginatedResponse extends PaginatedResponse {
  data?: Style[];
}

export interface StyleBundlePaginatedResponse extends PaginatedResponse {
  data?: StyleBundle[];
}

export interface StylePlannedFabricsResponse {
  colors: StylePlannedFabric[];
  sizes: StylePlannedFabricSize[];
}

export interface StyleStoredQuantityResponse {
  stored_quantity: number;
  planned_quantity: number;
}

export interface StyleReleaseFabricPayload {
  bundles: SaveStyleFabricPayload[];
}

export interface SaveStyleFabricPayload {
  roll_number?: number;
  style_planned_fabric_id?: number;
  style_planned_fabric_size_id?: number;
  quantity?: number;
  remarks?: string;
  postfix?: string;
  belong_style_bundle_id?: string;
  section_id?: number | null;
  is_save_only?: boolean;
}
