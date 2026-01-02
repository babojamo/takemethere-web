'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OperatorProcess } from '@/app/types/operator';

interface ProcessOutputTableProps {
  processOutputs: OperatorProcess[];
}

interface OperatorOutput {
  id?: string;
  operator_name?: string;
  total_output?: number;
  break?: number;
  output_count?: number;
  total_count?: number;
  target?: number;
  classification?: string;
  efficiency?: number;
  average?: number;
  [time: string]: number | string | undefined;
}

interface ColDef {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
}

const ProcessOutputTable = ({ processOutputs = [] }: ProcessOutputTableProps) => {
  const [operatorOutputs, setOperatorOutputs] = useState<OperatorOutput[]>([]);
  const [columns, setColumns] = useState<ColDef[]>([]);

  useEffect(() => {
    if (processOutputs) {
      mapToTable();
    }
  }, [processOutputs]);

  const mapToTable = () => {
    const fields: any = {};
    const timeColumns: ColDef[] = [];
    const initialData = processOutputs[0];

    // Set the columns
    if (initialData) {
      for (const key in initialData?.outputs) {
        timeColumns.push({ field: key, header: key, sortable: true, filter: true });
      }
    }
    setColumns(timeColumns);

    // Set the values
    processOutputs.forEach((processOutput) => {
      for (const key in processOutput?.outputs) {
        if (Object.prototype.hasOwnProperty.call(processOutput?.outputs, key)) {
          fields[key] = processOutput?.outputs[key];
        }
      }
      setOperatorOutputs([
        {
          id: processOutput?.id,
          ...fields,
          operator_name: processOutput?.operator?.name
        }
      ]);
    });
  };

  return (
    <DataTable
      rows={10}
      value={operatorOutputs}
      paginator
      className="custom-table p-datatable-gridlines"
      showGridlines
      dataKey="id"
      filterDisplay="menu"
      emptyMessage="No styles provided."
    >
      <Column key="operator_name" field="operator_name" header="Operator" />
      <Column field="target" header="Target" />

      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} filter={col.filter} />
      ))}
      <Column field="remarks" header="Remarks" />
      <Column field="total_output" header="Total Output" />
      <Column field="break" header="Break" />
      <Column field="total_output" header="Total Output" />
      <Column field="count" header="Output Count" />
      <Column field="count" header="Total Count" />
      <Column field="count" header="Target" />
      <Column field="count" header="Efficiency" />
    </DataTable>
  );
};

export default ProcessOutputTable;
