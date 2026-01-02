'use client';

import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormInputText from '../form/input-text/component';
import { UserForm } from '@/app/types/users';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface FormUserProps {
  userTypes: SelectItem[];
  value?: UserForm;
  onSubmit?: any;
  children?: any;
}

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  user_type: string;
  barcode_id?: string;
};

const FormUser = ({ userTypes = [], value, onSubmit, children }: FormUserProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      user_type: '',
      barcode_id: ''
    }
  });

  useEffect(() => {
    if (value) {
      reset({
        name: value?.name,
        email: value?.email,
        username: value?.username,
        password: '',
        user_type: value?.role,
        barcode_id: value?.barcode_id
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Employee Name" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Email" type="email" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={{ required: 'Username is required' }}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Username" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required' }}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Password" type="password" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        name="user_type"
        control={control}
        rules={{ required: 'Role is required' }}
        render={({ field, fieldState }) => (
          <FormDropdown
            {...field}
            value={field.value}
            onChange={(e: any) => field.onChange(e.value)}
            label="User Type"
            errorMessage={fieldState.error?.message}
            isError={!!fieldState.error}
            options={userTypes}
          />
        )}
      />
      <Controller
        name="barcode_id"
        control={control}
        rules={{ required: 'Barcode id is required' }}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Employee Barcode ID" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />

      {children}
    </form>
  );
};

export default FormUser;
