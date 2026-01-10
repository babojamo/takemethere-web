'use client';

import { Route } from '@/app/types/route';
import { ListBox } from 'primereact/listbox';
import { SelectItem } from 'primereact/selectitem';
import React, { useMemo, useState } from 'react';

interface RouteListProps {
  routes: Route[];
  selectedRoute?: (route?: Route) => void;
}
const RouteList = ({ routes, selectedRoute }: RouteListProps) => {
  const [selectedOption, setSelectedOption] = useState<SelectItem | undefined>();
  const options = useMemo<SelectItem[]>(() => routes.map(r => ({ label: r.name, value: r.id })), [routes])

  const selectRoute = (value: SelectItem) => {
    if (selectedRoute) selectedRoute(routes.find(r => r.id === value.value));
    setSelectedOption(value);
  }

  return (
    <ListBox value={selectedOption} onChange={(e) => selectRoute(e)} options={options} optionLabel="label" className="w-full md:w-14rem" />
  );
};

export default RouteList;
