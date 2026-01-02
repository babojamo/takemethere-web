import { addLocale } from 'primereact/api';
import { Calendar, CalendarSelectionMode } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React, { forwardRef } from 'react';

interface FormRangeCalendarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange?: any;
  value?: any;
  placeholder?: string;
  className?: string;
  selectionMode?: CalendarSelectionMode;
  readOnlyInput?: boolean;
  hideOnRangeSelection?: boolean;
  showIcon?: boolean;
  firstDayOfWeek?: number;
}

addLocale('en-MondayStart', {
  firstDayOfWeek: 1, // 1 = Monday
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear'
});

const FormRangeCalendar = forwardRef<HTMLInputElement, FormRangeCalendarProps>(
  ({ label, value, isError, readOnlyInput, placeholder, firstDayOfWeek, showIcon, hideOnRangeSelection, onChange, errorMessage, className }, ref) => (
    <div className="field">
      {label && <label htmlFor="name">{label}</label>}
      <Calendar
        inputRef={ref}
        value={value}
        selectionMode="range"
        readOnlyInput={readOnlyInput}
        placeholder={placeholder}
        showIcon={showIcon}
        locale="en-MondayStart"
        hideOnRangeSelection={hideOnRangeSelection}
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

FormRangeCalendar.displayName = 'FormRangeCalendar';

export default FormRangeCalendar;
