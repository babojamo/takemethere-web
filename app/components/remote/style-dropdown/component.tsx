import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primereact/autocomplete';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { Option } from '@/app/types';
import { useState, useCallback, useContext } from 'react';
import UtilityService from '@/app/services/UtilityService';

interface RemoteStyleDropdownProps {
  value?: Option | null;
  onChange?: (val: Option | null) => void;
  onSelect?(event: AutoCompleteSelectEvent<Option>): void;
  placeholder?: string;
  perPage?: number;
}

export default function RemoteStyleDropdown({
  value = null,
  onChange,
  onSelect,
  placeholder = 'Find style...',
  perPage = 15
}: RemoteStyleDropdownProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const { showApiError } = useContext(LayoutContext);

  const fetchOptions = useCallback(
    async (q: string) => {
      try {
        const { data: res } = await UtilityService.findStyles(q, perPage);
        const mapped: Option[] = (res.data ?? res.data ?? []).map((item: any) => ({
          label: item.style_number,
          value: item.id,
          meta: item
        }));
        setOptions(mapped);
      } catch (e: any) {
        showApiError(e, 'Error loading style list options.');
      }
    },
    [perPage]
  );

  // PrimeReact calls this as the user types OR when clicking the dropdown button.
  const completeMethod = useCallback(
    (e: AutoCompleteCompleteEvent) => {
      // Debounce lightly: PrimeReact already throttles, but you can add your own if needed.
      fetchOptions(e.query ?? '');
    },
    [fetchOptions]
  );

  return (
    <AutoComplete
      value={value}
      suggestions={options}
      completeMethod={completeMethod}
      onChange={(e) => onChange?.(e.value)}
      onSelect={onSelect}
      dropdown
      placeholder={placeholder}
      field="label" // what to display
      // Optional: custom item template
      itemTemplate={(opt) => <div className="flex items-center">{opt?.label}</div>}
      // Optional: selected chip/label
      selectedItemTemplate={(opt) => (opt ? opt.label : '')}
    />
  );
}
