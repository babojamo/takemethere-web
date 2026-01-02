import moment from 'moment';
import { subYears, format, differenceInMinutes, parseISO, differenceInSeconds } from 'date-fns';
import { SelectItem } from 'primereact/selectitem';

export function generateSimpleId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}`; // same 9-char slice
}

export function format24Hour(date: any) {
  return moment(date, 'HH:mm:ss').format('HH:mm');
}

export function formatDate(date: any) {
  return moment(date).format('YYYY/MM/DD');
}

export function formatDateTime(date: any) {
  return moment(date).format('YYYY/MM/DD HH:mm');
}

export function formatDbDate(date: any) {
  return moment(date).format('YYYY-MM-DD');
}

export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1); // JS months are 0-based
  return date.toLocaleString('default', { month: 'long' });
}

export function currentMonthDates(): Date[] {
  const now = new Date();
  // Start of this month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // End of this month
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return [startOfMonth, endOfMonth];
}

export function getListOfYears() {
  const currentYear = new Date();
  return Array.from({ length: 10 }, (_, i) => format(subYears(currentYear, i), 'yyyy'));
}

export function getListOfYearOptions(): SelectItem[] {
  return getListOfYears().map((year) => ({
    label: year,
    value: Number(year)
  }));
}

export function convertDurationLabel(from: any, to: any) {
  if (!from || !to)
    return {
      label: `0`,
      duration_seconds: 0
    };

  const diffSeconds = Math.max(0, differenceInSeconds(parseISO(from), parseISO(to)));

  // Convert seconds → minutes → hours → days
  const days = Math.floor(diffSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diffSeconds % (60 * 60)) / 60);
  const seconds = diffSeconds % 60;

  return {
    label: [days ? `${days}d` : '', hours ? `${hours}h` : '', minutes ? `${minutes}m` : '', seconds ? `${seconds}s` : '0s'].filter(Boolean).join(' '),
    duration_seconds: diffSeconds
  };
}

export function roundToDecimal(num: number, decimals: number) {
  // const factor = Math.pow(10, decimals);
  // return Math.round(num * factor) / factor;

  return Number(num.toFixed(decimals));
}
