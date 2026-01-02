'use client';

import { Controller, useForm } from 'react-hook-form';
import { DefaultFormData } from '@/app/types/form';
import { generateSimpleId } from '@/app/utils';
import { SelectItem } from 'primereact/selectitem';
import { FormStyleFabric, StyleItem } from '@/app/types/styles';
import FormCalendar from '../form/calendar/component';
import FormInputText from '../form/input-text/component';
import FormStyleItemTable from './FormStyleItemTable';
import FormStyleFabricTable from './FormStyleFabricTable';
import { Divider } from 'primereact/divider';
import FormDropdown from '../form/dropdown/component';
import { useEffect, useState } from 'react';
import { STYLE_SEASONS } from '@/app/constants/styles';

interface FormStyleProps {
  value?: DefaultFormData;
  styleOptions: SelectItem[];
  itemTypes?: SelectItem[];
  onSubmit?: any;
  children?: any;
  buyerOptions?: SelectItem[];
  sectionOptions?: SelectItem[];
  loading?: {
    buyerField?: boolean;
    sectionField?: boolean;
    fields?: boolean;
  };
}

interface FormData extends DefaultFormData {
  control_number: string;
  buyer_id: string;
  section_id?: string;
  style_number: string;
  pleats_name?: string | null;
  item_type?: string | null;
  ship_date_from_japan?: Date | string | null; // ISO date string: "YYYY-MM-DD"
  ship_date_from_cebu?: Date | string | null; // ISO date string
  noumae?: string | null;
  sample?: string | null;
  pattern?: string | null;
  season?: string | null;
  name?: string;
  style_items: StyleItem[];
  style_fabrics: FormStyleFabric[];
}

const FormStyle = ({ value, onSubmit, children, buyerOptions, sectionOptions, loading }: FormStyleProps) => {
  const [seasonOptions] = useState<SelectItem[]>([
    { label: 'SS', value: STYLE_SEASONS.SS },
    { label: 'AW', value: STYLE_SEASONS.AW }
  ]);

  const emptyStyleItem = (): StyleItem => ({
    id: generateSimpleId(),
    item_name: '',
    item_number: '',
    specs_qty: 0,
    specs_unit: '',
    youjyaku_qty: 0,
    youjyaku_unit: '',
    color_detail: ''
  });

  const emptyStyleFabric = (): FormStyleFabric => ({
    id: generateSimpleId(),
    col_number: '',
    color: '',
    size_zero: 0,
    size_one: 0,
    size_two: 0,
    size_three: 0,
    size_four: 0,
    size_five: 0,
    total: 0
  });

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      control_number: '',
      buyer_id: '',
      section_id: '',
      style_number: '',
      pleats_name: '',
      item_type: '',
      ship_date_from_japan: '', // ISO date string: "YYYY-MM-DD"
      ship_date_from_cebu: '', // ISO date string
      noumae: '',
      sample: '',
      season: '',
      pattern: '',
      name: '',
      style_items: [emptyStyleItem()],
      style_fabrics: [emptyStyleFabric()]
    }
  });

  useEffect(() => {
    if (value) {
      const toDate = (d?: string | null) => (d ? new Date(d) : null);

      // @ts-ignore
      reset({
        control_number: value?.control_number,
        buyer_id: value?.buyer_id,
        section_id: value?.section_id,
        style_number: value?.style_number,
        pleats_name: value?.pleats_name,
        item_type: value?.item_type,
        ship_date_from_japan: toDate(value?.ship_date_from_japan) ?? null, // convert to Date
        ship_date_from_cebu: toDate(value?.ship_date_from_cebu) ?? null, // convert to Date
        noumae: value?.noumae,
        sample: value?.sample,
        season: value?.season,
        pattern: value?.pattern,
        name: value?.name,
        style_items: value?.style_items.map((s: any) => {
          return {
            id: s.id || generateSimpleId(),
            item_name: s.item_name || '',
            item_number: s.item_number || '',
            specs_qty: s.specs_qty || 0,
            specs_unit: s.specs_unit || '',
            youjyaku_qty: s.youjyaku_qty || 0,
            youjyaku_unit: s.youjyaku_unit || '',
            color_detail: s.color_detail || ''
          };
        }) || [emptyStyleItem()],
        style_fabrics: value?.style_planned_fabrics.map((f: any) => {
          f.style_planned_fabric_sizes.forEach((size: any) => {
            (f as any)[`size_${size.size_number}`] = size.quantity || 0;
          });

          return {
            id: f.id || generateSimpleId(),
            col_number: `${f.col_number}` || '',
            color: f.color || '',
            size_zero: f.size_0 || 0,
            size_one: f.size_1 || 0,
            size_two: f.size_2 || 0,
            size_three: f.size_3 || 0,
            size_four: f.size_4 || 0,
            size_five: f.size_5 || 0,
            total: f.total || 0
          };
        }) || [emptyStyleFabric()]
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid">
        <div className="col-12">
          <Controller
            name="control_number"
            control={control}
            rules={{ required: 'Control number is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Control #" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-6">
          <Controller
            name="buyer_id"
            control={control}
            rules={{ required: 'Buyer is required' }}
            render={({ fieldState, field }) => (
              <FormDropdown
                loading={loading?.buyerField || loading?.fields}
                label="Buyer"
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                filter={true}
                placeholder="Select"
                options={buyerOptions}
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
        <div className="col-12 md:col-6">
          <Controller
            name="section_id"
            control={control}
            render={({ fieldState, field }) => (
              <FormDropdown
                loading={loading?.sectionField || loading?.fields}
                label="Section"
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                filter={true}
                showClear={true}
                placeholder="Select"
                options={sectionOptions}
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Controller
            name="style_number"
            control={control}
            rules={{ required: 'Style number is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Style No." errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-6">
          <Controller
            name="pleats_name"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Pleats Name" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Controller
            name="item_type"
            control={control}
            rules={{ required: 'Item is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Item" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-3">
          <Controller
            name="season"
            control={control}
            rules={{ required: 'Season is required' }}
            render={({ fieldState, field }) => (
              <FormDropdown
                label="Season"
                value={field.value}
                onChange={(e: any) => field.onChange(e.value)}
                filter={true}
                placeholder="Select"
                options={seasonOptions}
                optionValue="label"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
      </div>

      <Divider align="center" className="mb-5">
        Shipping Information
      </Divider>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Controller
            name="ship_date_from_cebu"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormCalendar
                {...field}
                label="Ship Date From Cebu"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
        <div className="col-12 md:col-6">
          <Controller
            name="ship_date_from_japan"
            control={control}
            rules={{ required: 'Pleats name is required' }}
            render={({ fieldState, field }) => (
              <FormCalendar
                {...field}
                label="Ship Date From Japan"
                errorMessage={fieldState.error?.message}
                isError={fieldState.error ? true : false}
              />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Controller
            name="noumae"
            control={control}
            rules={{ required: 'Noumae name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Noumae" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
        <div className="col-12 md:col-6">
          <Controller
            name="sample"
            control={control}
            rules={{ required: 'Sample name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Sample" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Controller
            name="pattern"
            control={control}
            rules={{ required: 'Pattern name is required' }}
            render={({ fieldState, field }) => (
              <FormInputText {...field} label="Pattern" errorMessage={fieldState.error?.message} isError={fieldState.error ? true : false} />
            )}
          />
        </div>
      </div>
      <FormStyleItemTable control={control} />
      <div className="m-5"></div>
      <FormStyleFabricTable control={control} />
      {children}
    </form>
  );
};

export default FormStyle;
