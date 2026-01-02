import { FileUpload } from 'primereact/fileupload';
import React, { forwardRef } from 'react';

interface FormInputFilePros extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: any;
  isError?: boolean;
  errorMessage?: string;
  auto?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  name?: any;
  onUpload?: any;
  onSelect?: any;
  accept?: string;
  maxFileSize?: number;
  chooseLabel?: string;
  customUpload?: any;
  disabled?: boolean;
}

const FormInputFile = forwardRef<HTMLInputElement, FormInputFilePros>(
  (
    {
      name,
      accept,
      value,
      maxFileSize = 100000,
      isError,
      onSelect,
      disabled,
      chooseLabel,
      customUpload,
      required,
      auto,
      autoFocus,
      onUpload,
      errorMessage,
      ...rest
    },
    ref
  ) => (
    <div className="field">
      <FileUpload
        mode="basic"
        disabled={disabled}
        name={name}
        chooseLabel={chooseLabel}
        auto={auto}
        customUpload={customUpload}
        onSelect={onSelect}
        accept={accept}
        maxFileSize={maxFileSize}
        onUpload={onUpload}
      />
      {isError && <small className="text-red-500">{errorMessage}</small>}
    </div>
  )
);

FormInputFile.displayName = 'FormInputFile';

export default FormInputFile;
