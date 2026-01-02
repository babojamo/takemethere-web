import React, { useEffect, useMemo } from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { ProductionDailyOutput } from '@/app/types/reports';
import { groupBy } from 'lodash';
import { ProgressSpinner } from 'primereact/progressspinner';
import { roundToDecimal } from '@/app/utils';

export type OperatorPerformance = {
  outputs?: ProductionDailyOutput[];
  loading?: boolean;
};

const StatRow = ({ label, value, title }: { title: string; label: string; value: React.ReactNode }) => (
  <li className="flex align-items-center justify-content-between my-2 mx-0">
    <span className="font-medium text-color-secondary cursor-pointer" title={title}>
      {label}
    </span>
    <span className="p-tag p-tag-warning">{value}%</span>
  </li>
);

const EfficiencyRow = ({ value }: { value: number }) => {
  const severity = value >= 90 ? 'success' : value >= 70 ? 'info' : value >= 40 ? 'warning' : 'danger';
  return (
    <div className="flex items-center gap-2">
      <ProgressBar value={value} showValue={false} style={{ height: 8, width: '100%' }}></ProgressBar>
      <Tag value={`${value}%`} severity={severity as any} rounded></Tag>
    </div>
  );
};

const EfficiencyCard = (operatorName: string, outputs: ProductionDailyOutput[]) => {
  const processes = groupBy<any[]>(outputs, 'process_name');

  const pros = Object.entries(processes).map(([process_name, opts]) => {
    const id = opts.map((o) => o.id).reduce((sum, val) => sum + val, 0);
    const total_output = opts.map((o) => o.total_output).reduce((sum, val) => sum + val, 0);
    const target = opts.map((o) => o.target).reduce((sum, val) => sum + val, 0);

    const effs = opts.map((o) => o.efficiency);
    const avgEff = roundToDecimal((effs.reduce((sum, val) => sum + val, 0) || 0) / effs.length, 2);

    return {
      id: id,
      label: `${process_name} - ${total_output}/${target}`,
      title: ` Total scanned (${total_output}) over target (${target}).`,
      value: avgEff
    };
  });

  const efficiencies = outputs.map((o) => o.efficiency);
  const avg = roundToDecimal((efficiencies.reduce((sum, val) => sum + val, 0) || 0) / efficiencies.length, 2);

  return (
    <div className="col-12 md:col-6 lg:col-4">
      <Card className="h-full shadow-2 border-round-2xl">
        <div className="mb-3">
          <h3 className="text-lg font-semibold">{operatorName}</h3>
        </div>
        <ul className="list-none p-0 m-0">
          {pros.map((output, index) => (
            <StatRow key={`${operatorName}-${output.id ?? index}`} label={output.label} title={output.title} value={output.value} />
          ))}
        </ul>
        <div>
          <span className="font-medium text-color-secondary text-sm">Average Efficiency</span>
          <EfficiencyRow value={avg} />
        </div>
      </Card>
    </div>
  );
};

// Component
export default function OperatorPerformanceCard({ outputs, loading }: OperatorPerformance) {
  const groupedOutputs = useMemo<any>(() => {
    return groupBy<any[]>(outputs, 'operator_name');
  }, [outputs]);
  return (
    <div className="grid">
      {!outputs?.length && !loading && (
        <div className="col-12 flex justify-content-center align-items-center">
          <p className="text-mute">No records found.</p>
        </div>
      )}
      {Object.entries(groupedOutputs).map(([operatorName, opts]) => (
        <React.Fragment key={operatorName}>{EfficiencyCard(operatorName, opts as ProductionDailyOutput[])}</React.Fragment>
      ))}
      {loading && (
        <div className="col-12 flex justify-content-center align-items-center">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} />
        </div>
      )}
    </div>
  );
}
