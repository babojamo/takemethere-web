'use client';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import Modal from '@/app/components/modal/component';
import Barcode from '@/app/components/barcode/Barcode';
import { Style } from '@/app/types/styles';
import { OrderList } from 'primereact/orderlist';
import { string } from 'yup';
import { ListBox } from 'primereact/listbox';

interface SinglePrintBarcodeState {
  show?: boolean;
}

interface SinglePrintBarcodeProps {
  style?: Style;
  visible?: boolean;
  onHide?: any;
}

interface StyleDetail {
  name: string;
  value: string;
}

const SinglePrintBarcode = ({ style, visible, onHide }: SinglePrintBarcodeProps) => {
  const [state, setState] = useState<SinglePrintBarcodeState>({});

  const [details, setDetails] = useState<StyleDetail[]>([]);

  useEffect(() => {
    setState({ ...state, show: visible });
  }, [visible]);

  useEffect(() => {
    if (style) {
      setDetails([
        { name: 'Style Number', value: style.style_number },
        { name: 'Buyer', value: style.buyer?.name ?? '' }
      ]);
    }
  }, [style]);

  const onHideModal = () => {
    setState({ ...state, show: false });
    if (onHide) onHide();
  };

  const itemTemplate = (item: StyleDetail) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">
            {' '}
            <i className="pi pi-tag text-sm"></i> {item.name}
          </span>
        </div>
        <span className="font-bold text-900">${item.value}</span>
      </div>
    );
  };

  return (
    <Modal title="Print Barcode" visible={state.show} onHide={onHideModal} confirmSeverity="danger" hideActions={true}>
      <div className="flex m-5">
        <div className="flex flex-column align-items-center m-auto">
          <Barcode value={style?.style_number ?? 'NO STYLE'} />
          <ListBox filter={false} dataKey="id" options={details} itemTemplate={itemTemplate} />
        </div>
      </div>
      <div className="flex">
        <div className="ml-auto">
          <Button onClick={() => {}} icon="pi pi-print" severity="info" label="Print Barcode" className="mr-2" />
        </div>
      </div>
    </Modal>
  );
};

export default SinglePrintBarcode;
