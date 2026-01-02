'use client';

import { SelectItem } from 'primereact/selectitem';
import FormInputText from '../form/input-text/component';
import { ProcessForm } from '@/app/types/process';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProcessProps {
  value?: ProcessForm;
  onSubmit?: any;
  children?: any;
}

const schema = yup.object().shape({
  code: yup.string().required('Code is required'),
  name: yup.string().required('Name is required')
});

const FormProcess = ({ value, onSubmit, children }: FormProcessProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: '',
      name: ''
    }
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
        code: value?.code
      });
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText
        placeholder="Process Code"
        {...register('code')}
        label="Code"
        errorMessage={errors.code?.message}
        isError={errors.code ? true : false}
      />
      <FormInputText
        placeholder="Process name"
        {...register('name')}
        label="Name"
        errorMessage={errors.name?.message}
        isError={errors.name ? true : false}
      />
      {children}
    </form>
  );
};

export default FormProcess;
