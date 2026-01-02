'use client';

import FormInputText from '../form/input-text/component';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DepartmentForm } from '@/app/types/department';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';

interface FormDepartmentProps {
  value?: DepartmentForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  immutable: yup.boolean().nullable()
});

const FormDepartment = ({ value, onSubmit, children }: FormDepartmentProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    register
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
        immutable: value?.immutable ? true : false
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText placeholder="Name" {...register('name')} label="Name" errorMessage={errors.name?.message} isError={!!errors.name} />

      <div className="flex align-items-center gap-2 my-3">
        <Controller
          name="immutable"
          control={control}
          render={({ field }) => <Checkbox inputId="immutable" onChange={(e) => field.onChange(e.checked)} checked={field.value ?? false} />}
        />
        <label htmlFor="immutable" className={classNames({ 'p-error': errors.immutable })}>
          Immutable
        </label>
      </div>
      <p className="text-gray-300">Immutable record means could not be deleted and edited.</p>
      {children}
    </form>
  );
};

export default FormDepartment;
