import { useSelector } from "react-redux";
import { State } from "../../store";
import { useMemo } from "react";
import { getPreviousYearweek } from "../utils/get-prev-yearweek";
import dayjs from "dayjs";

export function useSelectFilter() {
  const vendor = useSelector<State, string>(
    (state) => state.filter_benchmark.vendor
  );
  const menu = useSelector<State, string>(
    (state) => state.filter_benchmark.menu
  );

  const yearweek = useSelector<State, number>(
    (state) => state.filter_benchmark.yearweek
  );
  const yearweeks = useSelector<State, number[]>(
    (state) => state.filter_benchmark.yearWeeks
  );
  const pastYearweek = useMemo(
    () => getPreviousYearweek(yearweeks, yearweek),
    [yearweek, yearweeks]
  );


  const yearweekOpenSignal = useSelector<State, number>(
    (state) => state.filter_benchmark.yearweekOpenSignal
  );
  const yearweekOpenSignals = useSelector<State, number[]>(
    (state) => state.filter_benchmark.yearweekOpenSignals
  );

  const pastYearweekOpenSignal = useMemo(
    () => getPreviousYearweek(yearweekOpenSignals, yearweekOpenSignal),
    [yearweekOpenSignal, yearweekOpenSignals]
  );


  // Fail Contributor
  const startweek = useSelector<State, number>(
    (state) => state.filter_benchmark.startweek
  );
  const endweek = useSelector<State, number>(
    (state) => state.filter_benchmark.endweek
  );
  const level = useSelector<State, string>(
    (state) => state.filter_benchmark.level
  );
  const region = useSelector<State, string[]>(
    (state) => state.filter_benchmark.region
  );
  const kecamatan = useSelector<State, string[]>(
    (state) => state.filter_benchmark.kecamatan
  );
  const city = useSelector<State, string[]>(
    (state) => state.filter_benchmark.city
  );
  const operator = useSelector<State, string[]>(
    (state) => state.filter_benchmark.operator
  );
  const operators = useSelector<State, string[]>(
    (state) => state.filter_benchmark.operators
  );
  const period = useSelector<State, string>(
    (state) => state.filter_benchmark.period
  );
  const periods = useSelector<State, string[]>(
    (state) => state.filter_benchmark.periods
  );
  const searchCity = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCity
  );
  const searchKecamatan = useSelector<State, string>(
    (state) => state.filter_benchmark.searchKecamatan
  );

  // Tutela Daily Monitoring
  const levelDayMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.levelDayMonitoring
  );
  const dateStringStart = useSelector<State, ReturnType<typeof dayjs>>(
    (state) => state.filter_benchmark.dateStringStart
  );
  const dateString = useSelector<State, ReturnType<typeof dayjs>>(
    (state) => state.filter_benchmark.dateString
  );
  const regionDayMonitoring = useSelector<State, string[]>(
    (state) => state.filter_benchmark.regionDayMonitoring
  );
  const citiesDayMonitoring = useSelector<State, string[]>(
    (state) => state.filter_benchmark.citiesDayMonitoring
  );
  const searchCityDayMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCityDayMonitoring
  );

  // Tutela Weekly Monitoring
  const startWeekMonitoring = useSelector<State, number>(
    (state) => state.filter_benchmark.startWeekMonitoring
  );
  const endWeekMonitoring = useSelector<State, number>(
    (state) => state.filter_benchmark.endWeekMonitoring
  );
  const levelWeekMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.levelWeekMonitoring
  );
  const regionWeekMonitoring = useSelector<State, string[]>(
    (state) => state.filter_benchmark.regionWeekMonitoring
  );
  const citiesWeekMonitoring = useSelector<State, string[]>(
    (state) => state.filter_benchmark.citiesWeekMonitoring
  );
  const searchCityWeekMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCityWeekMonitoring
  );


  // Flip Flop
  const kpi = useSelector<State, string>(
    (state) => state.filter_benchmark.kpi
  );
  const cityflipflop = useSelector<State, string>(
    (state) => state.filter_benchmark.cityflipflop
  );

  return {
    vendor,
    menu,
    yearweek,
    yearweeks,
    pastYearweek,
    pastYearweekOpenSignal,
    yearweekOpenSignal,
    yearweekOpenSignals,

    // Fail Contributor
    level,
    startweek,
    endweek,
    region,
    city,
    kecamatan,
    operator,
    operators,
    searchCity,
    searchKecamatan,
    period,
    periods,

    // Tutela Daily Monitoring
    levelDayMonitoring,
    dateStringStart,
    dateString,
    regionDayMonitoring,
    citiesDayMonitoring,
    searchCityDayMonitoring,

    // Tutela Weekly Monitoring
    startWeekMonitoring,
    endWeekMonitoring,
    levelWeekMonitoring,
    regionWeekMonitoring,
    citiesWeekMonitoring,
    searchCityWeekMonitoring,

    // Flip Flop
    kpi,
    cityflipflop,
  };
}
