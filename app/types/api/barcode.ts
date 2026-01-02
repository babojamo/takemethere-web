export interface QueueBarcodePrintPayload {
  barcode_printer_id: string;
  queues: {
    model_id?: string;
    model?: string;
  }[];
}
