/* eslint-disable @next/next/no-sync-scripts */
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useMemo } from 'react';

interface PageHeaderProps {
  titles?: string[];
  children?: any;
}

const PageHeader = ({ titles, children }: PageHeaderProps) => {
  const home = { icon: 'pi pi-home', url: '/' };
  const items = useMemo(() => {
    return titles?.map((title) => ({ label: title }));
  }, [titles]);

  return (
    <div className="flex items-center justify-between pb-4 w-full">
      {/* Left side: Breadcrumb */}
      <BreadCrumb model={items} home={home} className={`w-full ` + (children && `mr-3`)} />

      {children && (
        <>
          <div className="flex flex-none gap-2 flex-align-center">{children}</div>
        </>
      )}
    </div>
  );
};

export default PageHeader;
