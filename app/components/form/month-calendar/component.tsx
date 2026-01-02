import { Calendar, CalendarSelectionMode } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormMonthCalendarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange?: any;
  value?: any;
  placeholder?: string;
  className?: string;
  selectionMode?: CalendarSelectionMode;
  readOnlyInput?: boolean;
  showIcon?: boolean;
}

const FormMonthCalendar = forwardRef<HTMLInputElement, FormMonthCalendarProps>(
  ({ label, value, isError, readOnlyInput, placeholder, showIcon, onChange, errorMessage, className }, ref) => (
    <div className="field">
      {label && <label htmlFor="name">{label}</label>}
      <Calendar
        inputRef={ref}
        value={value}
        view="month"
        dateFormat="mm/yy"
        readOnlyInput={readOnlyInput}
        placeholder={placeholder}
        showIcon={showIcon}
        className={classNames(
          className,
          {
            'p-invalid': isError
          },
          'w-full'
        )}
        onChange={onChange}
      />
      {isError && <small className="text-red-500">{errorMessage}</small>}
    </div>
  )
);

FormMonthCalendar.displayName = 'FormMonthCalendar';

export default FormMonthCalendar;
