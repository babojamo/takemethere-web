import { AutoComplete } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormInputTextProps {
  value?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  required?: boolean;
  inputClassName?: string;
  onChange?: any;
  completeMethod?: any;
  suggestions?: string[];
  className?: string;
}

const FormAutoComplete = forwardRef<any, FormInputTextProps>(
  (
    { label, className = 'field', inputClassName, value, isError, required, completeMethod, suggestions, autoFocus, onChange, errorMessage, ...rest },
    ref
  ) => (
    <div className={className}>
      {label && <label htmlFor="name">{label}</label>}

      <AutoComplete
        inputRef={ref}
        onChange={onChange}
        required={required}
        value={value}
        suggestions={suggestions}
        completeMethod={completeMethod}
        className={classNames(
          {
            'p-invalid': isError
          },
          inputClassName
        )}
      />
      {isError && <small className="text-red-500">{errorMessage}</small>}
    </div>
  )
);

FormAutoComplete.displayName = 'FormAutoComplete';

export default FormAutoComplete;
