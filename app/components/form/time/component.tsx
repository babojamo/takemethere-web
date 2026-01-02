import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormTimeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange?: any;
  value?: any;
  placeholder?: string;
  className?: string;
}

const FormTime = forwardRef<HTMLInputElement, FormTimeProps>(({ label, value, isError, onChange, placeholder, errorMessage, className }, ref) => (
  <div className="field">
    {label && <label htmlFor="name">{label}</label>}
    <Calendar
      inputRef={ref}
      value={value}
      placeholder={placeholder}
      className={classNames(
        className,
        {
          'p-invalid': isError
        },
        'w-full'
      )}
      timeOnly
      onChange={onChange}
    />
    {isError && <small className="text-red-500">{errorMessage}</small>}
  </div>
));

FormTime.displayName = 'FormTime';

export default FormTime;
