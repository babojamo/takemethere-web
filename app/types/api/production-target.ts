export interface LogProductionTargetPayload {
  barcode: string;
  log_type: string;
}

export interface StoreProductionTargetPayload {
  targets: {
    id?: string | boolean;
    date: string;
    order: number;
    buyer_id: string;
    flow_department_id_1: string;
    flow_department_id_2: string;
    target: number | string;
  }[];
  delete_targets?: string[];
}

export interface GetProductionTargetPayload {
  target_date: string;
}
