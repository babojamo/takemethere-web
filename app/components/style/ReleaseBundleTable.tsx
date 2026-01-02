'use client';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { FormReleaseBundle, StylePlannedFabricSize } from '@/app/types/styles';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';
import React, { useContext } from 'react';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import { LayoutContext } from '@/layout/context/layoutcontext';

interface FormStyleProps {
  control?: any;
  colorOptions?: SelectItem[];
  sectionOptions?: SelectItem[];
  disabled?: boolean;
  defaultSection?: number | null;
  sizesOptions?: StylePlannedFabricSize[];
  loading?: boolean;
  onQuantityChange?: (size_id: string, index: number, quantity: number) => void;
  onRemoveRow?: (index: number) => void;
}

const ReleaseBundleTable = ({
  loading,
  control,
  disabled,
  sectionOptions = [],
  defaultSection,
  colorOptions = [],
  sizesOptions = [],
  onQuantityChange,
  onRemoveRow
}: FormStyleProps) => {
  const items = useWatch({ control, name: 'bundles' }) || [];
  const colors = React.useMemo(() => colorOptions, [colorOptions]);
  const sections = React.useMemo(() => sectionOptions, [sectionOptions]);

  const getSizeOptions = (rowIndex: number): SelectItem[] => {
    const option = items[rowIndex];
    return (
      sizesOptions
        ?.filter((s) => s.style_planned_fabric_id == option.style_planned_fabric_id)
        ?.map((r) => ({
          label: `#${r.size_number.toString()} - Qty: ${r.quantity.toString()}`,
          value: r.id
        })) ?? []
    );
  };

  const emptyItem = (): FormReleaseBundle => ({
    id: items?.length + 1,
    style_planned_fabric_id: 0,
    style_planned_fabric_size_id: 0,
    section_id: defaultSection,
    quantity: 0,
    remarks: '',
    postfix: '',
    belong_style_bundle_id: ''
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'bundles'
  });

  const actionBodyTemplate = (rowData: FormReleaseBundle, options: { rowIndex: number }) => {
    return (
      <div className="flex gap-2">
        <Button
          size="small"
          outlined
          rounded
          type="button"
          onClick={() => {
            if (onRemoveRow) onRemoveRow(options.rowIndex);
            remove(options.rowIndex);
          }}
          icon="pi pi-trash"
          severity="danger"
        />
      </div>
    );
  };

  const tableHeader = () => {
    return (
      <div className="grid align-items-center p-0">
        <p className="m-0">Bundle List</p>
        <div className="ml-auto flex align-items-center gap-2">
          <Button disabled={disabled} severity="help" type="button" onClick={onAddOperatorClick} className="mt-2" icon="pi pi-plus" label="Add" />
        </div>
      </div>
    );
  };

  const handleBundleFabricSizeSelect = (field: any, e: any, index: number) => {
    field.onChange(e);
  };

  const handleQuantityChange = (field: any, e: any, index: number) => {
    const item = items[index];
    field.onChange(e ?? null);
    if (onQuantityChange) onQuantityChange(item.style_planned_fabric_size_id, index, e ?? 0);
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
      loading={loading}
      filterDisplay="menu"
      emptyMessage="No record provided."
    >
      <Column field="id" header="#" />
      <Column
        field="roll_number"
        header="Roll No."
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.roll_number` as const}
            rules={{ required: 'Roll number is required' }}
            render={({ field, fieldState }) => (
              <FormInputNumber
                style={{ width: '80px' }}
                value={field.value as number | null}
                onValueChange={(e) => field.onChange(e.value ?? null)}
                placeholder="Roll"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        )}
      />
      <Column
        field="style_planned_fabric_id"
        header="Color"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.style_planned_fabric_id` as const}
            rules={{ required: 'Color is required' }}
            render={({ field, fieldState }) => (
              <FormDropdown
                {...field}
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                placeholder="Select"
                filter
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
                options={colors}
              />
            )}
          />
        )}
      />
      <Column
        field="style_planned_fabric_size_id"
        header="Size"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.style_planned_fabric_size_id` as const}
            rules={{ required: 'Size is required' }}
            render={({ field, fieldState }) => (
              <FormDropdown
                {...field}
                value={field.value}
                filter
                onChange={(e: any) => handleBundleFabricSizeSelect(field, e.value, options.rowIndex)}
                placeholder="Select"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
                options={getSizeOptions(options.rowIndex)}
              />
            )}
          />
        )}
      />
      <Column
        field="quantity"
        header="Quantity"
        body={(_row: any, options: { rowIndex: number }) => (
          <div className="flex gap-2">
            <Controller
              control={control}
              name={`bundles.${options.rowIndex}.quantity` as const}
              rules={{ required: 'Quantity is required', min: { value: 1, message: 'Minimum is 1' } }}
              render={({ field, fieldState }) => (
                <FormInputNumber
                  style={{ width: '50px' }}
                  disabled={!items[options.rowIndex].style_planned_fabric_size_id}
                  value={field.value as number | null}
                  onValueChange={(e) => handleQuantityChange(field, e.value, options.rowIndex)}
                  placeholder="Qty"
                  errorMessage={fieldState.error?.message}
                  isError={fieldState.error ? true : false}
                />
              )}
            />
            <Controller
              control={control}
              name={`bundles.${options.rowIndex}.postfix` as const}
              render={({ field, fieldState }) => (
                <FormInputText
                  {...field}
                  style={{ width: '80px' }}
                  placeholder="Postfix"
                  errorMessage={fieldState.error?.message}
                  isError={fieldState.error ? true : false}
                />
              )}
            />
          </div>
        )}
      />

      <Column
        field="remarks"
        header="Remarks"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.remarks` as const}
            render={({ field, fieldState }) => (
              <FormInputText {...field} placeholder="e.g. Notes" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        )}
      />
      <Column
        field="belong_style_bundle_id"
        header="Tagged To"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.belong_style_bundle_id` as const}
            render={({ field, fieldState }) => (
              <FormInputText {...field} placeholder="Bundle No." errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        )}
      />

      <Column
        field="section_id"
        header="Section"
        body={(_row: any, options: { rowIndex: number }) => (
          <Controller
            control={control}
            name={`bundles.${options.rowIndex}.section_id` as const}
            rules={{ required: 'Section is required' }}
            render={({ field, fieldState }) => (
              <FormDropdown
                {...field}
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                placeholder="Select"
                filter
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
                options={sections}
              />
            )}
          />
        )}
      />

      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
};

export default ReleaseBundleTable;
