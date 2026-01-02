import { InputNumber, InputNumberChangeEvent, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import React, { CSSProperties, forwardRef } from 'react';

interface FormInputNumberProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  inputClassName?: string;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  mode?: 'decimal' | 'currency';
  onChange?: (event: InputNumberChangeEvent) => void;
  onValueChange?: (event: InputNumberValueChangeEvent) => void;
}

const FormInputNumber = forwardRef<any, FormInputNumberProps>(
  (
    {
      label,
      className = 'field',
      inputClassName,
      style,
      value,
      isError,
      required,
      placeholder,
      disabled,
      autoFocus,
      onChange,
      onValueChange,
      errorMessage,
      minFractionDigits,
      maxFractionDigits,
      mode,
      ...rest
    },
    ref
  ) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}
      <InputNumber
        ref={ref}
        {...rest}
        inputStyle={style}
        value={value}
        mode={mode}
        minFractionDigits={minFractionDigits}
        maxFractionDigits={maxFractionDigits}
        onChange={onChange}
        required={required}
        onValueChange={onValueChange}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        className={classNames(
          {
            'p-invalid': isError
          },
          inputClassName
        )}
      />
      {isError && (
        <div>
          <small className="text-red-500">{errorMessage}</small>
        </div>
      )}
    </div>
  )
);

FormInputNumber.displayName = 'FormInputNumber';

export default FormInputNumber;
