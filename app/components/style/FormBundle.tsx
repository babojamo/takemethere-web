'use client';

import { Controller, useForm } from 'react-hook-form';
import { FormReleaseBundle, StylePlannedFabricSize } from '@/app/types/styles';
import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormInputNumber from '../form/input-number/component';
import FormInputText from '../form/input-text/component';
import React, { useEffect } from 'react';

interface FormBundleProps {
  value?: FormReleaseBundle;
  onSubmit?: any;
  children?: any;
  colorOptions?: SelectItem[];
  sizesOptions?: SelectItem[];
  sectionOptions?: SelectItem[];
  loading?: {
    sizeField?: boolean;
    colorField?: boolean;
  };
}

const FormBundle = ({ value, onSubmit, children, colorOptions = [], sizesOptions = [], sectionOptions = [], loading }: FormBundleProps) => {
  const { control, handleSubmit, reset } = useForm<FormReleaseBundle>({
    defaultValues: {
      roll_number: 0,
      style_planned_fabric_id: 0,
      style_planned_fabric_size_id: 0,
      quantity: 0,
      postfix: '',
      remarks: '',
      section_id: 0,
      belong_style_bundle_id: ''
    }
  });

  useEffect(() => {
    if (value) {
      reset({
        id: value.id,
        roll_number: value?.roll_number,
        postfix: value?.postfix,
        style_planned_fabric_id: value?.style_planned_fabric_id,
        style_planned_fabric_size_id: value?.style_planned_fabric_size_id,
        quantity: value?.quantity,
        remarks: value?.remarks,
        section_id: value?.section_id,
        belong_style_bundle_id: value?.belong_style_bundle_id
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={`roll_number` as const}
        rules={{ required: 'Roll number is required' }}
        render={({ field, fieldState }) => (
          <FormInputNumber
            value={field.value as number | null}
            label="Roll No."
            onValueChange={(e) => field.onChange(e.value ?? null)}
            placeholder="Roll"
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
          />
        )}
      />
      <Controller
        control={control}
        name={`style_planned_fabric_id` as const}
        rules={{ required: 'Color is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            placeholder="Select"
            label="Color"
            loading={loading?.colorField}
            filter
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={colorOptions}
          />
        )}
      />
      <Controller
        control={control}
        name={`style_planned_fabric_size_id` as const}
        rules={{ required: 'Size is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            label="Size"
            placeholder="Select"
            loading={loading?.sizeField}
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={sizesOptions}
            filter={true}
          />
        )}
      />
      <label htmlFor="quantity" className="p-float-label" style={{ marginBottom: '0.5rem' }}>
        Quantity
      </label>
      <div className="flex gap-2">
        <Controller
          control={control}
          name={`quantity` as const}
          rules={{ required: 'Quantity is required', min: { value: 1, message: 'Minimum is 1' } }}
          render={({ field, fieldState }) => (
            <FormInputNumber
              style={{ maxWidth: '50px' }}
              value={field.value as number | null}
              onValueChange={(e) => field.onChange(e.value ?? null)}
              placeholder="Qty"
              errorMessage={fieldState.error?.message}
              isError={fieldState.error ? true : false}
            />
          )}
        />
        <Controller
          control={control}
          name={`postfix` as const}
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
      <Controller
        control={control}
        name={`remarks` as const}
        render={({ field, fieldState }) => (
          <FormInputText
            {...field}
            label="Remarks"
            placeholder="Text"
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
          />
        )}
      />
      <Controller
        control={control}
        name={`belong_style_bundle_id` as const}
        render={({ field, fieldState }) => (
          <FormInputText
            {...field}
            label="Tagged To"
            placeholder="Bundle No."
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
          />
        )}
      />

      <Controller
        control={control}
        name={`section_id` as const}
        rules={{ required: 'Section is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            placeholder="Select"
            label="Section"
            filter
            errorMessage={fieldState.error?.message}
            isError={fieldState.error ? true : false}
            options={sectionOptions}
          />
        )}
      />
      {children}
    </form>
  );
};

export default FormBundle;
