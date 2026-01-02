import { SelectItem } from 'primereact/selectitem';

export const PRINTING_MODELS = {
  STYLE_BUNDLE: 'App\\Models\\StyleBundle',
  OPERATOR_PROCESS: 'App\\Models\\OperatorProcess',
  USER: 'App\\Models\\User',
  PROCESS_OFFSET: 'App\\Models\\ProcessOffset',
  DEPARTMENT: 'App\\Models\\Department'
};

export const PRINTING_TEMPLATES = {
  QR_CODE_LONG: 'qrcode-long',
  QR_CODE_SHORT: 'qrcode-short'
};

export const PRINTING_TEMPLATES_OPTIONS: SelectItem[] = [
  {
    label: 'QR Code Long',
    value: PRINTING_TEMPLATES.QR_CODE_LONG
  },
  {
    label: 'QR Code Short',
    value: PRINTING_TEMPLATES.QR_CODE_SHORT
  }
];
