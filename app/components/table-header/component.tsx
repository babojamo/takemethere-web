/* eslint-disable @next/next/no-sync-scripts */
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

interface TableHeaderProps {
  children?: any;
  onClear?: () => void;
  searchValue?: string;
  searchFocus?: boolean;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHeader = ({ onClear, searchFocus, children, searchValue, onSearchChange }: TableHeaderProps) => {
  // const [searchValue, setGlobalFilterValue] = useState('');

  // const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setGlobalFilterValue(e.target.value);
  // };

  return (
    <div className="flex flex-column md:flex-row gap-3 md:gap-2 align-items-stretch md:align-items-center">
      <div className="order-2 md:order-1">
        {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={onClear} className="w-full md:w-auto" size="small" /> */}
      </div>
      <div className="flex flex-column md:flex-row gap-2 w-full md:w-auto md:ml-auto order-1 md:order-2">
        {children}
        <IconField iconPosition="left" className="w-full md:w-20rem">
          <InputIcon className="pi pi-search" />
          <InputText value={searchValue} onChange={onSearchChange} placeholder="Keyword Search" className="w-full" />
          <InputIcon
            className="pi pi-times cursor-pointer"
            style={{
              right: '0.75rem',
              position: 'absolute',
              display: typeof searchValue === 'string' && searchValue.length > 0 ? '' : 'none'
            }}
            autoFocus={searchFocus}
            onClick={onClear}
          />
        </IconField>
      </div>
    </div>
  );
};

export default TableHeader;
