export interface BarcodePrinter {
  id: string;
  hardware_id?: string;
  printer_name?: string;
  printings?: BarcodePrinting[];
  ip_address?: string;
}

export interface BarcodePrinting {
  id: string;
  barcode_printer_id?: string;
  printer?: BarcodePrinter;
  model_id?: string;
  model?: string;
}
