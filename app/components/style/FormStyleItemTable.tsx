'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { generateSimpleId } from '@/app/utils';
import { StyleItem } from '@/app/types/styles';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';

interface FormStyleProps {
  control?: any;
}

const FormStyleItemTable = ({ control }: FormStyleProps) => {
  const emptyItem = (): StyleItem => ({
    id: generateSimpleId(),
    item_name: '',
    item_number: '',
    specs_qty: 0,
    specs_unit: '',
    youjyaku_qty: 0,
    youjyaku_unit: '',
    color_detail: ''
  });

  const items = useWatch({ control, name: 'style_items' }) || [];

  const { append, remove } = useFieldArray({
    control,
    name: 'style_items'
  });

  const actionBodyTemplate = (rowData: StyleItem, options: { rowIndex: number }) => {
    return (
      <div className="flex gap-2">
        <Button size="small" outlined rounded type="button" onClick={() => remove(options.rowIndex)} icon="pi pi-trash" severity="danger" />
      </div>
    );
  };

  const tableHeader = () => {
    return (
      <div className="flex align-items-center">
        <div>Style Items</div>
        <div className="ml-auto flex align-items-center gap-2">
          <Button type="button" onClick={onAddOperatorClick} icon="pi pi-plus" label="Add" />
        </div>
      </div>
    );
  };

  const onAddOperatorClick = () => {
    addNewItem();
  };

  const addNewItem = () => {
    append(emptyItem());
  };

  return (
    <DataTable
      rows={10}
      editMode="row"
      header={tableHeader()}
      value={items}
      className="custom-table p-datatable-gridlines"
      showGridlines
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No items provided."
    >
      <Column
        className="field-mb-0"
        field="item_name"
        header="Item"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.item_name` as const}
            rules={{ required: 'Item name is required' }}
            render={({ field, fieldState }) => (
              <FormInputText
                {...field}
                placeholder="e.g., Fabric, Lining Cloth"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column
        className="field-mb-0"
        field="item_number"
        header="Item No."
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.item_number` as const}
            rules={{ required: 'Item number is required' }}
            render={({ field, fieldState }) => (
              <FormInputText {...field} placeholder="Text" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        )}
      />
      <Column
        className="field-mb-0"
        field="specs_qty"
        header="Specs"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.specs_qty` as const}
            rules={{ required: 'Specs quantity is required' }}
            render={({ field, fieldState }) => (
              <FormInputNumber
                value={field.value as number | null}
                onValueChange={(e) => field.onChange(e.value ?? null)}
                placeholder="Number"
                mode="decimal"
                maxFractionDigits={2} // Maximum decimal places allowed
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />

      <Column
        className="field-mb-0"
        field="specs_unit"
        header="Specs Unit"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.specs_unit` as const}
            rules={{ required: 'Specs unit is required' }}
            render={({ field, fieldState }) => (
              <FormInputText
                {...field}
                placeholder="e.g. (cm, m)"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column
        className="field-mb-0"
        field="youjyaku_qty"
        header="Youjyaku"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.youjyaku_qty` as const}
            rules={{ required: 'Youjyaku quantity is required' }}
            render={({ field, fieldState }) => (
              <FormInputNumber
                value={field.value as number | null}
                onValueChange={(e) => field.onChange(e.value ?? null)}
                placeholder="Number"
                mode="decimal"
                maxFractionDigits={2} // Maximum decimal places allowed
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />

      <Column
        className="field-mb-0"
        field="youjyaku_unit"
        header="Youjyaku Unit"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.youjyaku_unit` as const}
            rules={{ required: 'Youjyaku unit is required' }}
            render={({ field, fieldState }) => (
              <FormInputText
                {...field}
                placeholder="e.g. (cm, m)"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />

      <Column
        className="field-mb-0"
        field="color_detail"
        header="Color Details"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`style_items.${options.rowIndex}.color_detail` as const}
            rules={{ required: 'Color detail is required' }}
            render={({ field, fieldState }) => (
              <FormInputText
                {...field}
                placeholder="e.g. Color Detail"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
};

export default FormStyleItemTable;
