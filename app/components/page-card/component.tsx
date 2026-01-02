/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';

interface PageCardProps {
  title?: any;
  children?: any;
  toolbar?: React.ReactNode;
}

const PageCard = ({ title, children, toolbar }: PageCardProps) => {
  return (
    <>
      <div className="card">
        <div className="flex align-items-center">
          <h5>{title ?? 'Page Card'}</h5>
          <div className="ml-auto pb-3">{toolbar}</div>
        </div>
        {children}
      </div>
    </>
  );
};

export default PageCard;
