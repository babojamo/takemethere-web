import { Button } from 'primereact/button';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import Modal from '@/app/components/modal/component';
import React, { useContext, useEffect, useState } from 'react';
import useBarcodePrinting from '@/app/hooks/useBarcodePrinting';
import { PRINTING_TEMPLATES_OPTIONS } from '@/app/constants/barcode';

interface PrintBarcodeState {
  show?: boolean;
  saving?: boolean;
}

interface PrintBarcodeProps {
  ids: string[];
  model: string;
  visible?: boolean;
  onHide?: any;
}

const PrintBarcode = ({ ids, visible, onHide, model }: PrintBarcodeProps) => {
  const [state, setState] = useState<PrintBarcodeState>({});
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>();
  const [printerOptions, setPrinterOptions] = useState<SelectItem[]>([]);
  const [loadingPrinters, setLoadingPrinters] = useState<boolean>(false);
  const { showError, showApiError } = useContext(LayoutContext);
  const { queueBarcode, fetchPrintersSelectOptions } = useBarcodePrinting();

  useEffect(() => {
    setState({ ...state, show: visible });
    if (visible) initData();
  }, [visible]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  const initData = async () => {
    try {
      setLoadingPrinters(true);
      setPrinterOptions(await fetchPrintersSelectOptions());
    } catch (error) {
      showApiError(error, 'Error fetching printers');
    } finally {
      setLoadingPrinters(false);
    }
  };

  const print = async () => {
    if (!selectedPrinter) {
      showError('Please select a printer.');
      return;
    }
    setState({ ...state, saving: true });
    // @NOTE: Change to user printing
    await queueBarcode(selectedPrinter?.toString() ?? '', ids, model, selectedTemplate?.toString() ?? '');
    setState({ ...state, saving: false });
  };

  return (
    <Modal title="Print Barcode" width="50vh" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <FormDropdown
        label="Barcode Printer"
        value={selectedPrinter}
        onChange={(option: any) => setSelectedPrinter(option.value)}
        placeholder="Select"
        loading={loadingPrinters}
        options={printerOptions}
      />
      <FormDropdown
        label="Template"
        value={selectedTemplate}
        onChange={(option: any) => setSelectedTemplate(option.value)}
        placeholder="Select"
        options={PRINTING_TEMPLATES_OPTIONS}
      />
      <p>{ids.length} Barcode(s) selected.</p>
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={print} loading={state.saving} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default PrintBarcode;
