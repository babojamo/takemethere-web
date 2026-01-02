'use client';
import { Button } from 'primereact/button';
import React, { useContext, useEffect, useState } from 'react';
import Modal from '@/app/components/modal/component';
import Barcode from '@/app/components/barcode/Barcode';
import { ListBox } from 'primereact/listbox';
import { StyleBundle } from '@/app/types/styles';
import useBarcodePrinting from '@/app/hooks/useBarcodePrinting';
import FormDropdown from '../form/dropdown/component';
import { SelectItem } from 'primereact/selectitem';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { PRINTING_TEMPLATES_OPTIONS } from '@/app/constants/barcode';

interface BundleSinglePrintBarcodeState {
  show?: boolean;
  saving?: boolean;
}

interface BundleSinglePrintBarcodeProps {
  bundle?: StyleBundle;
  visible?: boolean;
  onHide?: any;
}

interface BundleDetail {
  name: string;
  value: string;
}

const BundleSinglePrintBarcode = ({ bundle, visible, onHide }: BundleSinglePrintBarcodeProps) => {
  const [state, setState] = useState<BundleSinglePrintBarcodeState>({});
  const [details, setDetails] = useState<BundleDetail[]>([]);
  const [barcode, setBarcode] = useState<string>('');
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>();
  const [printerOptions, setPrinterOptions] = useState<SelectItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>();

  const { showError } = useContext(LayoutContext);
  const { queuePrintStyleBundle, fetchPrintersSelectOptions } = useBarcodePrinting();

  useEffect(() => {
    if (visible) {
      initData();
    }
    setState({ ...state, show: visible });
  }, [visible]);

  useEffect(() => {
    if (bundle) {
      setDetails([
        { name: 'Style', value: bundle?.style?.style_number ?? '' },
        { name: 'Buyer', value: bundle?.style?.buyer?.name ?? '' },
        { name: 'Roll No.', value: bundle.roll_number?.toString() ?? '' },
        { name: 'Size', value: bundle.style_planned_fabric_size?.size_number.toString() ?? '' },
        { name: 'Release Quantity', value: bundle.quantity.toString() ?? '' }
      ]);
      setBarcode(`${bundle?.bundle_number}`);
    }
  }, [bundle]);

  const onHideModal = () => {
    hide();
  };

  const hide = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  const initData = async () => {
    setPrinterOptions(await fetchPrintersSelectOptions());
  };

  const itemTemplate = (item: BundleDetail) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">
            {' '}
            <i className="pi pi-tag text-sm"></i> {item.name}
          </span>
        </div>
        <span className="font-bold text-900">{item.value}</span>
      </div>
    );
  };

  const print = async () => {
    if (!selectedPrinter) {
      showError('Please select a printer.');
      return;
    }
    setState({ ...state, saving: true });
    await queuePrintStyleBundle(selectedPrinter?.toString() ?? '', [bundle?.id?.toString() ?? ''], selectedTemplate?.toString() ?? '');
    hide();
    setState({ ...state, saving: false });
  };

  return (
    <Modal title="Print Barcode" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <div className="flex m-5">
        <div className="flex flex-column align-items-center m-auto">
          <Barcode value={barcode} />
          <ListBox filter={false} dataKey="id" options={details} itemTemplate={itemTemplate} />
        </div>
      </div>
      <FormDropdown
        label="Barcode Printer"
        value={selectedPrinter}
        onChange={(option: any) => setSelectedPrinter(option.value)}
        placeholder="Select"
        options={printerOptions}
      />
      <FormDropdown
        label="Template"
        value={selectedTemplate}
        onChange={(option: any) => setSelectedTemplate(option.value)}
        placeholder="Select"
        options={PRINTING_TEMPLATES_OPTIONS}
      />
      <div className="flex align-items-center">
        <div className="ml-auto">
          <Button loading={state.saving} onClick={print} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default BundleSinglePrintBarcode;
