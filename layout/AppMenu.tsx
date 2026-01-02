/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: 'Home',
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Machine Pleats', icon: 'pi pi-fw pi-chart-line', to: '/dashboard' }
      ]
    },
    {
      label: 'Operations',
      items: [
        { label: 'Production', icon: 'pi pi-fw pi-cog', to: '/operations/production-operations' },
        { label: 'Release Bundles', icon: 'pi pi-fw pi-box', to: '/operations/bundles' },
        { label: 'Bundle Flow', icon: 'pi pi-fw pi-share-alt', to: '/operations/bundle-flow' },
        { label: 'Machine Pleats Target', icon: 'pi pi-fw pi-share-alt', to: '/operations/machine-pleats-targets' }
      ]
    },
    {
      label: 'Management',
      items: [
        { label: 'Styles', icon: 'pi pi-fw pi-clone', to: '/management/styles' },
        { label: 'Departments', icon: 'pi pi-fw pi-building', to: '/management/departments' },
        { label: 'Sections', icon: 'pi pi-fw pi-sitemap', to: '/management/sections' },
        { label: 'Operators', icon: 'pi pi-fw pi-users', to: '/management/operators' },
        { label: 'Processes', icon: 'pi pi-fw pi-cog', to: '/management/processes' },
        { label: 'Process Offset', icon: 'pi pi-fw pi-sliders-h', to: '/management/process-offset' },
        { label: 'Buyers', icon: 'pi pi-fw pi-users', to: '/management/buyers' }
      ]
    },
    {
      label: 'Reports',
      items: [
        { label: 'Daily Production Output', icon: 'pi pi-fw pi-clock', to: '/reports/daily-production-output' },
        { label: 'Section Hourly Efficiency', icon: 'pi pi-fw pi-clock', to: '/reports/section-hourly-efficiency' },
        { label: 'Monthly Efficiency Report', icon: 'pi pi-fw pi-chart-bar', to: '/reports/monthly-production-efficiency' },
        { label: 'Bundle Entry Log', icon: 'pi pi-fw pi-box', to: '/reports/bundle-releases' },
        { label: 'System Audit', icon: 'pi pi-fw pi-flag', to: '/reports/system-audit' },
        { label: 'Shipment Status', icon: 'pi pi-fw pi-building', to: '/reports/shipment-status' }
      ]
    },
    {
      label: 'Administrator',
      items: [
        { label: 'Users', icon: 'pi pi-fw pi-id-card', to: '/administration/users' },
        { label: 'Downloads', icon: 'pi pi-fw pi-download', to: '/administration/downloads' }
      ]
    }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
