import { Badge } from 'primereact/badge';
import { useState } from 'react';

export enum DateSelectorsType {
  CURRENT_MONTH = 'current_month',
  TODAY = 'today',
  LAST_MONTH = 'last_month',
  THIS_WEEK = 'this_week',
  LAST_WEEK = 'last_week',
  NEXT_MONTH = 'next_month',
  UPCOMING = 'upcoming'
}

interface DateSelectorsProps {
  onDateSelected?: (dates: Date[] | null) => void;
  onlyMonths?: boolean;
  className?: string;
}

const DateSelectors = ({ onDateSelected, className, onlyMonths }: DateSelectorsProps) => {
  const [selected, setSelected] = useState<DateSelectorsType | null>(null);

  const getWeekRange = (date: Date) => {
    const temp = new Date(date); // avoid mutating original
    const day = temp.getDay();
    const diff = temp.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    const start = new Date(temp.setDate(diff));
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  const onDateSet = (selector: DateSelectorsType) => {
    setSelected(selector);

    let from: Date | undefined;
    let to: Date | undefined;

    if (selector === DateSelectorsType.TODAY) {
      from = new Date();
      from.setHours(0, 0, 0, 0);
      to = new Date();
      to.setHours(23, 59, 59, 999);
    } else if (selector === DateSelectorsType.CURRENT_MONTH) {
      const now = new Date();
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      to.setHours(23, 59, 59, 999);
    } else if (selector === DateSelectorsType.LAST_MONTH) {
      const now = new Date();
      from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      to = new Date(now.getFullYear(), now.getMonth(), 0);
      to.setHours(23, 59, 59, 999);
    } else if (selector === DateSelectorsType.THIS_WEEK) {
      const now = new Date();
      const { start, end } = getWeekRange(now);
      from = start;
      to = end;
    } else if (selector === DateSelectorsType.LAST_WEEK) {
      const lastWeekDate = new Date();
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);
      const { start, end } = getWeekRange(lastWeekDate);
      from = start;
      to = end;
    } else if (selector === DateSelectorsType.NEXT_MONTH) {
      const now = new Date();
      from = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      to = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      to.setHours(23, 59, 59, 999);
    } else if (selector === DateSelectorsType.UPCOMING) {
      const now = new Date();
      from = new Date(now);
      from.setHours(0, 0, 0, 0);
      to = new Date(now.getFullYear(), now.getMonth() + 2, 0); // last day of next month
      to.setHours(23, 59, 59, 999);
    }

    if (from && to && onDateSelected) {
      onDateSelected([from, to]);
    }
  };

  const onClear = () => {
    setSelected(null);
    onDateSelected?.([]); // clear parent filter
  };

  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      <Badge
        className="cursor-pointer"
        value="This Month"
        severity={selected === DateSelectorsType.CURRENT_MONTH ? 'contrast' : 'success'}
        onClick={() => onDateSet(DateSelectorsType.CURRENT_MONTH)}
      />
      <Badge
        className="cursor-pointer"
        value="Next Month"
        severity={selected === DateSelectorsType.NEXT_MONTH ? 'contrast' : 'warning'}
        onClick={() => onDateSet(DateSelectorsType.NEXT_MONTH)}
      />
      <Badge
        className="cursor-pointer"
        value="Prev. Month"
        severity={selected === DateSelectorsType.LAST_MONTH ? 'contrast' : 'secondary'}
        onClick={() => onDateSet(DateSelectorsType.LAST_MONTH)}
      />
      {!onlyMonths && (
        <Badge
          className="cursor-pointer"
          value="Upcoming"
          severity={selected === DateSelectorsType.UPCOMING ? 'contrast' : 'warning'}
          onClick={() => onDateSet(DateSelectorsType.UPCOMING)}
        />
      )}
      {!onlyMonths && (
        <Badge
          className="cursor-pointer"
          value="This Week"
          severity={selected === DateSelectorsType.THIS_WEEK ? 'contrast' : 'success'}
          onClick={() => onDateSet(DateSelectorsType.THIS_WEEK)}
        />
      )}
      {!onlyMonths && (
        <Badge
          className="cursor-pointer"
          value="Prev. Week"
          severity={selected === DateSelectorsType.LAST_WEEK ? 'contrast' : 'secondary'}
          onClick={() => onDateSet(DateSelectorsType.LAST_WEEK)}
        />
      )}
      {!onlyMonths && (
        <Badge
          className="cursor-pointer"
          severity={selected === DateSelectorsType.TODAY ? 'contrast' : 'success'}
          value="Today"
          onClick={() => onDateSet(DateSelectorsType.TODAY)}
        />
      )}
      {/* Clear Button */}
      <div className="cursor-pointer border-round text-500 hover:text-700 surface-hover" onClick={onClear}>
        <i className="pi pi-times-circle mt-1" title="Clear"></i>
      </div>
    </div>
  );
};

export default DateSelectors;
