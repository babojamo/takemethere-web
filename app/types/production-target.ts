import { Style } from 'util';
import { Buyer } from './buyers';

export interface ProductionTarget {
  id?: string;
  order: number;
  buyer?: Buyer;
  date?: string;
  buyer_id: string;
  target: number;
  flow_department_id_1?: string;
  flow_department_id_2?: string;
  actual_count?: number;
  defects_count?: number;
}

export interface ProductionTargetLog {
  id?: string;
  production_target_id: string;
  buyer_id: string;
  style_id: string;
  log_type: string;
  style: Style;
  buyer: Buyer;
  production_target: ProductionTarget;
}
