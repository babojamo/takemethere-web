import { BarcodePrinter, BarcodePrinting } from '../types/barcodes';
import { BarcodePrintingService } from '../services/BarcodePrintingService';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useContext } from 'react';
import { PRINTING_MODELS } from '../constants/barcode';
import { SelectItem } from 'primereact/selectitem';

export default function useBarcodePrinting() {
  const { showWarning, showApiError } = useContext(LayoutContext);

  const fetchQueues = async (): Promise<BarcodePrinting[]> => {
    try {
      const { data } = await BarcodePrintingService.getPrintingQueues();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchPrinters = async (): Promise<BarcodePrinter[]> => {
    try {
      const { data } = await BarcodePrintingService.getBarcodePrinters();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchPrintersSelectOptions = async (): Promise<SelectItem[]> => {
    try {
      const data = await fetchPrinters();
      return data.map((d) => ({ label: `${d.printer_name} - ${d.ip_address}`, value: d.id }));
    } catch (error) {
      throw error;
    }
  };

  const queueBarcode = async (barcode_printer_id: string, ids: string[], model: string, template: string) => {
    try {
      await BarcodePrintingService.storeQueues({
        barcode_printer_id,
        queues: ids.map((id) => ({
          model_id: id,
          model,
          template
        }))
      });
      showWarning('Successfully added to barcode printing queue.', 'Printing Queue');
    } catch (error) {
      showApiError(error, 'Error adding to barcode printing queue.');
    }
  };

  const queuePrintStyleBundle = (barcode_printer_id: string, ids: string[], template: string) =>
    queueBarcode(barcode_printer_id, ids, PRINTING_MODELS.STYLE_BUNDLE, template);
  const queuePrintOperatorProcess = (barcode_printer_id: string, ids: string[], template: string) =>
    queueBarcode(barcode_printer_id, ids, PRINTING_MODELS.OPERATOR_PROCESS, template);

  return {
    queueBarcode,
    fetchPrinters,
    fetchPrintersSelectOptions,
    fetchQueues,
    queuePrintStyleBundle,
    queuePrintOperatorProcess
  };
}
