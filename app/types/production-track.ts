import { Operator } from './operator';
import { Process } from './process';
import { Section } from './section';
import { Style } from './styles';

export interface ProductionTrack {
  id?: string;
  date: string;
  section_id?: string;
  operator_id?: string;
  process_id?: string;
  time: number | string;
  target: number | string;
  remarks: string;
  classification: string;
  section?: Section;
  style_id?: string;
  style?: Style;
  operator?: Operator;
  process?: Process;
}
