'use client';

import { SelectItem } from 'primereact/selectitem';
import { useDashboard } from './(dashboard)/useDashboard';
import DashboardEfficiencyOverview from '../components/dashboard/DashboardEfficiencyOverview';
import DashboardEfficiencyOverviewBySection from '../components/dashboard/DashboardEfficiencyOverviewBySection';
import DashboardOperatorPerformer from '../components/dashboard/DashboardOperatorPerformer';
import DashboardRecentBundles from '../components/dashboard/DashboardRecentBundles';
import DashboardStatistics from '../components/dashboard/DashboardStatistics';
import DashboardUnreleasedBundles from '../components/dashboard/DashboardUnreleasedBundles';
import React from 'react';

const Dashboard = () => {
  const {
    stats,
    yearlyEfficiency,
    pageFilter,
    recentBundles,
    isFetchingRecentBundles,
    isFetchingStats,
    isFetchingYearlyEfficiency,
    isFetchingMonthlyEfficiency,
    isFetchingWeeklyEfficiency,
    isFetchingOperatorEff,
    isFetchingSections,
    sectionOptions,
    selectedSection,
    operatorEfficiency,
    setSelectedSection,
    yearlyEfficiencyBySection,
    isFetchingYearlyEfficiencyBySection,
    weeklyEfficiency,
    monthlyEfficiency,
    unreleasedBundles,
    isFetchingUnreleasedBundles,
    setPageFilter
  } = useDashboard();

  const handleSectionChange = (item: SelectItem) => {
    setSelectedSection(item.value);
  };

  return (
    <>
      <div className="grid">
        <DashboardStatistics loading={isFetchingStats} value={stats} />
        <div className="col-12 xl:col-6">
          <DashboardUnreleasedBundles loading={isFetchingUnreleasedBundles} value={unreleasedBundles} />
          <DashboardOperatorPerformer loading={isFetchingOperatorEff} value={operatorEfficiency} />
        </div>
        <div className="col-12 xl:col-6">
          <DashboardRecentBundles loading={isFetchingRecentBundles} value={recentBundles} />
          <DashboardEfficiencyOverview
            loading={isFetchingYearlyEfficiency || isFetchingMonthlyEfficiency || isFetchingWeeklyEfficiency}
            valueYear={yearlyEfficiency}
            valueMonth={monthlyEfficiency}
            valueWeek={weeklyEfficiency}
            onMonthlyChange={(year, month) =>
              setPageFilter({
                ...pageFilter,
                efficiency_overview: {
                  ...pageFilter?.efficiency_overview,
                  monthly: {
                    year,
                    month
                  }
                }
              })
            }
            onYearlyChange={(year) =>
              setPageFilter({
                ...pageFilter,
                efficiency_overview: {
                  ...pageFilter?.efficiency_overview,
                  yearly: year
                }
              })
            }
            onWeeklyChange={(from, to) =>
              setPageFilter({
                ...pageFilter,
                efficiency_overview: {
                  ...pageFilter?.efficiency_overview,
                  weekly: {
                    from,
                    to
                  }
                }
              })
            }
          />
          <DashboardEfficiencyOverviewBySection
            sectionOptions={sectionOptions}
            sectionId={selectedSection}
            loadingSections={isFetchingSections}
            loading={isFetchingYearlyEfficiencyBySection || isFetchingSections}
            year={pageFilter.year}
            value={yearlyEfficiencyBySection}
            onSectionChange={handleSectionChange}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
