import { useState } from 'react';
import { DatatableFilters } from '../types/datatable';

export default function useDatatable() {
  const [filters, setFilters] = useState<DatatableFilters>({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [tableLoading, setTableLoading] = useState(true);

  const clearFilter = () => {
    setFilters({});
  };

  const handleOnPageChange = (e: any) => {
    setFilters({ ...filters, page: e.page + 1, per_page: e.rows });
    setFirst(e.first);
    setRows(e.rows);
  };

  return {
    clearFilter,
    setRows,
    setFirst,
    setTableLoading,
    setTotalRecords,
    setFilters,
    handleOnPageChange,
    tableLoading,
    totalRecords,
    first,
    rows,
    filters
  };
}
