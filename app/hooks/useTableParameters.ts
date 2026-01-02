import { useEffect, useState } from 'react';
import { Pagination } from '../types';

export default function useTableParameters(filters: any) {
  const [rows, setRows] = useState<number | undefined>(0);
  const [totalRecords, setTotalRecords] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [currentLimit, setCurrentLimit] = useState<number | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>();
  const [params, setParams] = useState<any>();

  const onSort = (event: any) => {
    setSortField(event.sortField);
    setSortOrder(event.sortOrder < 0 ? 'asc' : 'desc');
  };

  const paginate = (pagination: Pagination) => {
    setRows(pagination.per_page);
    setTotalRecords(pagination.total);
  };

  const onPageChange = (event: any) => {
    setCurrentPage(event.page + 1);
  };

  const onRowsChange = (event: any) => {
    setCurrentLimit(event);
  };

  useEffect(() => {
    setParams({
      filters: filters,
      limit: currentLimit,
      page: currentPage,
      sortField: sortField,
      sortOrder: sortOrder
    });
  }, [filters, currentLimit, currentPage, sortField, sortOrder]);

  return {
    onSort,
    rows,
    params,
    totalRecords,
    onPageChange,
    paginate,
    onRowsChange
  };
}
