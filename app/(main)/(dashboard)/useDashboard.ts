import useUtilityData from '@/app/hooks/useUtilityData';
import DashboardService from '@/app/services/DashboardService';
import {
  DashboardMonthlyEfficiency,
  DashboardOperatorEfficiency,
  DashboardStats,
  DashboardWeeklyEfficiency,
  DashboardYearlyEfficiency
} from '@/app/types/dashboard';
import { StyleBundle } from '@/app/types/styles';
import moment from 'moment';
import { SelectItem } from 'primereact/selectitem';
import { useCallback, useEffect, useState } from 'react';

interface PageFilter {
  year: number;
  efficiency_overview: {
    yearly: number;
    monthly: {
      year: number;
      month: number;
    };
    weekly: {
      from: Date;
      to: Date;
    };
  };
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({});
  const [yearlyEfficiency, setYearlyEfficiency] = useState<DashboardYearlyEfficiency[]>([]);
  const [monthlyEfficiency, setMonthlyEfficiency] = useState<DashboardMonthlyEfficiency[]>([]);
  const [weeklyEfficiency, setWeeklyEfficiency] = useState<DashboardWeeklyEfficiency[]>([]);

  const [operatorEfficiency, setOperatorEfficiency] = useState<DashboardOperatorEfficiency[]>([]);
  const [yearlyEfficiencyBySection, setYearlyEfficiencyBySection] = useState<DashboardYearlyEfficiency[]>([]);
  const [selectedSection, setSelectedSection] = useState<any>();
  const [sectionOptions, setSectionOptions] = useState<SelectItem[]>([]);

  const [isFetchingRecentBundles, setIsFetchingRecentBundles] = useState<boolean>(false);
  const [isFetchingStats, setIsFetchingStats] = useState<boolean>(false);
  const [isFetchingYearlyEfficiency, setIsFetchingYearlyEfficiency] = useState<boolean>(false);
  const [isFetchingMonthlyEfficiency, setIsFetchingMonthlyEfficiency] = useState<boolean>(false);
  const [isFetchingWeeklyEfficiency, setIsFetchingWeeklyEfficiency] = useState<boolean>(false);
  const [isFetchingUnreleasedBundles, setIsFetchingUnreleasedBundles] = useState<boolean>(false);

  const [isFetchingYearlyEfficiencyBySection, setIsFetchingYearlyEfficiencyBySection] = useState<boolean>(false);
  const [isFetchingOperatorEff, setIsFetchingOperatorEff] = useState<boolean>(false);
  const [isFetchingSections, setIsFetchingSections] = useState<boolean>(false);

  const [recentBundles, setRecentBundles] = useState<StyleBundle[]>([]);
  const [unreleasedBundles, setUnreleasedBundles] = useState<StyleBundle[]>([]);

  const [pageFilter, setPageFilter] = useState<PageFilter>({
    year: moment().year(),
    efficiency_overview: {
      yearly: moment().year(),
      monthly: {
        year: moment().year(),
        month: moment().month()
      },
      weekly: {
        from: moment().startOf('week').toDate(),
        to: moment().endOf('week').toDate()
      }
    }
  });

  const { fetchSectionOptions } = useUtilityData();

  const fetchSections = useCallback(async () => {
    setIsFetchingSections(true);
    const options = await fetchSectionOptions();
    if (options.length) setSelectedSection(options[0].value); // Set default value
    setSectionOptions(options);
    setIsFetchingSections(false);
  }, []);

  const fetchOperatorEfficiency = useCallback(async () => {
    setIsFetchingOperatorEff(true);
    const { data } = await DashboardService.fetchOperatorEfficiency();
    setOperatorEfficiency(data);
    setIsFetchingOperatorEff(false);
  }, []);

  const fetchStatus = useCallback(async () => {
    setIsFetchingStats(true);
    const { data } = await DashboardService.fetchStats();
    setStats(data);
    setIsFetchingStats(false);
  }, []);

  const fetchRecentBundles = useCallback(async () => {
    setIsFetchingRecentBundles(true);
    const { data } = await DashboardService.fetchRecentBundles();
    setRecentBundles(data);
    setIsFetchingRecentBundles(false);
  }, []);

  const fetchUnreleasedBundles = useCallback(async () => {
    setIsFetchingUnreleasedBundles(true);
    const { data } = await DashboardService.fetchUnreleasedBundles();
    setUnreleasedBundles(data);
    setIsFetchingUnreleasedBundles(false);
  }, []);

  const fetchYearlyEfficiency = useCallback(async () => {
    setIsFetchingYearlyEfficiency(true);
    if (pageFilter.efficiency_overview) {
      const { data } = await DashboardService.fetchYearlyEfficiency(pageFilter.efficiency_overview?.yearly);
      setYearlyEfficiency(data);
    }
    setIsFetchingYearlyEfficiency(false);
  }, [pageFilter.efficiency_overview?.yearly]);

  const fetchMonthlyEfficiency = useCallback(async () => {
    setIsFetchingMonthlyEfficiency(true);
    if (pageFilter.efficiency_overview) {
      const { data } = await DashboardService.fetchMonthlyEfficiency(
        pageFilter.efficiency_overview.monthly.year,
        pageFilter.efficiency_overview.monthly.month
      );
      setMonthlyEfficiency(data);
    }
    setIsFetchingMonthlyEfficiency(false);
  }, [pageFilter.efficiency_overview?.monthly]);

  const fetchWeeklyEfficiency = useCallback(async () => {
    setIsFetchingWeeklyEfficiency(true);
    if (pageFilter.efficiency_overview) {
      const { data } = await DashboardService.fetchWeeklyEfficiency(
        pageFilter.efficiency_overview.weekly.from,
        pageFilter.efficiency_overview.weekly.to
      );
      setWeeklyEfficiency(data);
    }
    setIsFetchingWeeklyEfficiency(false);
  }, [pageFilter.efficiency_overview?.weekly]);

  const fetchYearlyEfficiencyBySection = useCallback(async (section_id: number) => {
    setIsFetchingYearlyEfficiencyBySection(true);
    const { data } = await DashboardService.fetchYearlyEfficiency(pageFilter.year, section_id);
    setYearlyEfficiencyBySection(data);
    setIsFetchingYearlyEfficiencyBySection(false);
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  useEffect(() => {
    fetchRecentBundles();
  }, [fetchRecentBundles]);

  useEffect(() => {
    fetchUnreleasedBundles();
  }, [fetchUnreleasedBundles]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    fetchYearlyEfficiency();
  }, [fetchYearlyEfficiency]);

  useEffect(() => {
    fetchMonthlyEfficiency();
  }, [fetchMonthlyEfficiency]);

  useEffect(() => {
    fetchWeeklyEfficiency();
  }, [fetchWeeklyEfficiency]);

  useEffect(() => {
    if (selectedSection) fetchYearlyEfficiencyBySection(selectedSection);
  }, [fetchYearlyEfficiencyBySection, selectedSection]);

  useEffect(() => {
    fetchOperatorEfficiency();
  }, [fetchOperatorEfficiency]);

  return {
    fetchMonthlyEfficiency,
    fetchRecentBundles,
    fetchStatus,
    fetchWeeklyEfficiency,
    fetchYearlyEfficiency,
    fetchYearlyEfficiencyBySection,
    isFetchingMonthlyEfficiency,
    isFetchingUnreleasedBundles,
    isFetchingOperatorEff,
    isFetchingRecentBundles,
    isFetchingSections,
    isFetchingStats,
    isFetchingWeeklyEfficiency,
    isFetchingYearlyEfficiency,
    isFetchingYearlyEfficiencyBySection,
    monthlyEfficiency,
    operatorEfficiency,
    pageFilter,
    recentBundles,
    unreleasedBundles,
    sectionOptions,
    selectedSection,
    setPageFilter,
    setSelectedSection,
    stats,
    weeklyEfficiency,
    yearlyEfficiency,
    yearlyEfficiencyBySection
  };
};
