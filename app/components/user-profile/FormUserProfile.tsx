'use client';

import { SelectItem } from 'primereact/selectitem';
import FormDropdown from '../form/dropdown/component';
import FormInputText from '../form/input-text/component';
import { UserForm } from '@/app/types/users';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Divider } from 'primereact/divider';

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

const FormUserProfile = ({ userTypes = [], value, onSubmit, children }: FormUserProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      user_type: ''
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
        barcode_id: ''
      });
    }
  }, [value, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        disabled
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Employee Name" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        disabled
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Email" type="email" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />
      <Controller
        disabled
        name="user_type"
        control={control}
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
        disabled
        name="barcode_id"
        control={control}
        render={({ field, fieldState }) => (
          <FormInputText {...field} label="Employee Barcode ID" errorMessage={fieldState.error?.message} isError={!!fieldState.error} />
        )}
      />

      <Divider align="center" className="my-5">
        Account Credentials
      </Divider>

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

      {children}
    </form>
  );
};

export default FormUserProfile;
