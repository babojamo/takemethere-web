'use client';

import { DataTable, DataTableHeaderTemplateType, DataTableStateEvent } from 'primereact/datatable';
import { EMPTY_TABLE_MESSAGE } from '@/app/constants';

interface CustomDatatableProps {
  value?: any;
  children?: any;
  loading?: boolean;
  selection?: any;
  onSelectionChange?: (event: any) => void;
  onPage?: (event: DataTableStateEvent) => void;
  header?: DataTableHeaderTemplateType<any>;
  first?: number;
  rows?: number;
  totalRecords?: number;
  rowGroupMode?: string | undefined;
  groupRowsBy?: any;
}

const CustomDatatable = ({
  value,
  children,
  rowGroupMode,
  groupRowsBy,
  loading,
  selection,
  onSelectionChange,
  onPage,
  header,
  first,
  rows,
  totalRecords
}: CustomDatatableProps) => {
  return (
    <DataTable
      value={value}
      paginator
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      groupRowsBy={groupRowsBy}
      rowGroupMode={rowGroupMode}
      className="custom-table p-datatable-gridlines"
      showGridlines
      dataKey="id"
      scrollable
      loading={loading}
      emptyMessage={EMPTY_TABLE_MESSAGE}
      selectionMode={'checkbox'}
      selection={selection}
      onSelectionChange={onSelectionChange}
      onPage={onPage}
      header={header}
      lazy
      first={first}
      rows={rows}
      rowsPerPageOptions={[5, 10, 20, 50]}
      filterDisplay="menu"
      totalRecords={totalRecords}
    >
      {children}
    </DataTable>
  );
};

export default CustomDatatable;
