import { useCallback, useEffect } from "react";
import { FilterService } from "../services/FilterService";
import { useDispatch, useSelector } from "react-redux";
import { FilterAction } from "../reducers/FilterReducer";
import { State } from "../../store";
import _ from "lodash";
import { useSelectFilter } from "./useSelectFilter";

const service = new FilterService();

export function useFetchData() {
  const dispatch = useDispatch();
  const { levelWeekMonitoring } = useSelectFilter();

  const menu = useSelector<State, string>(
    (state) => state.filter_benchmark.menu
  );
  const vendor = useSelector<State, string>(
    (state) => state.filter_benchmark.vendor
  );  
  const yearweeks = useSelector<State, number[]>(
    (state) => state.filter_benchmark.yearWeeks
  );
  const yearweekOpenSignals = useSelector<State, number[]>(
    (state) => state.filter_benchmark.yearweekOpenSignals
  );
 
  
  // Fail Contributor
  const levels = useSelector<State, string[]>(
    (state) => state.filter_benchmark.levels
  );
  const regions = useSelector<State, string[]>(
    (state) => state.filter_benchmark.regions
  );
  const cities = useSelector<State, string[]>(
    (state) => state.filter_benchmark.cities
  );
  const kecamatans = useSelector<State, string[]>(
    (state) => state.filter_benchmark.kecamatans
  );
  const searchCity = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCity
  );
  const searchKecamatan = useSelector<State, string>(
    (state) => state.filter_benchmark.searchKecamatan
  );

  // Tutela Daily Monitoring
  const levelDayMonitorings = useSelector<State, string[]>(
    (state) => state.filter_benchmark.levelDayMonitorings
  );
  const regionDayMonitorings = useSelector<State, string[]>(
    (state) => state.filter_benchmark.regionDayMonitorings
  );
  const citiesDayMonitorings = useSelector<State, any[]>(
    (state) => state.filter_benchmark.citiesDayMonitorings
  );
  const searchCityDayMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCityDayMonitoring
  );

  // Tutela Week Monitoring
  const yearweekWeekMonitorings = useSelector<State, number[]>(
    (state) => state.filter_benchmark.yearweekWeekMonitorings
  );
  const levelWeekMonitorings = useSelector<State, string[]>(
    (state) => state.filter_benchmark.levelWeekMonitorings
  );
  const regionWeekMonitorings = useSelector<State, string[]>(
    (state) => state.filter_benchmark.regionWeekMonitorings
  );
  const citiesWeekMonitorings = useSelector<State, any[]>(
    (state) => state.filter_benchmark.citiesWeekMonitorings
  );
  const searchCityWeekMonitoring = useSelector<State, string>(
    (state) => state.filter_benchmark.searchCityWeekMonitoring
  );


  // Flip Flop
  const kpis = useSelector<State, string[]>(
    (state) => state.filter_benchmark.kpis
  );
  const citiesFlipFlop = useSelector<State, any[]>(
    (state) => state.filter_benchmark.citiesflipflop
  );


  // ============== Data Filter Feching ============== //

  const fetchYearweeks = useCallback(async () => {
    try {
      const res = await service.getYearWeek();
      const yearweeks = res.data.data.sort((a, b) => b - a);
      dispatch(FilterAction.setYearweeks(yearweeks));
      dispatch(FilterAction.setYearweek(yearweeks[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  // fecth Fail Contributor
  const fetchLevels = useCallback(async () => {
    try {
      const res = await service.getLevel();
      dispatch(FilterAction.setLevels(res.data.data));
      // dispatch(FilterAction.setLevel(res.data.data[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchRegions = useCallback(async () => {
    try {
      const res = await service.getRegion();
      dispatch(FilterAction.setRegions(res.data.data));
      // dispatch(FilterAction.setRegion(res.data.data[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchCities = useCallback(async () => {
    try {
      const res = await service.getCity({
        ...(searchCity ? { keyword: searchCity } : {}),
      });
      searchCity && dispatch(FilterAction.setCities(res.data.data));
      dispatch(FilterAction.setCities(res.data.data));
      // dispatch(FilterAction.setCity(res.data.data[0]));
    } catch (err) {
      console.error(err);
    }
  }, [searchCity,
    //  level
  ]);

  const fetchKecamatans = useCallback(async () => {
    try {
      const res = await service.getKecamatan({
        ...(searchKecamatan ? { keyword: searchKecamatan } : {}),
      });
      searchKecamatan && dispatch(FilterAction.setKecamatans(res.data.data));
      dispatch(FilterAction.setKecamatans(res.data.data));
      // dispatch(FilterAction.setKecamatan(res.data.data[0]));
    } catch (err) {
      console.error(err);
    }
  }, [searchKecamatan,
    //  level
  ]);

  const fetchOperators = useCallback(async () => {
    try {
      const res = await service.getOperator();
      dispatch(FilterAction.setOperators(res.data.data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPeriods = useCallback(async () => {
    try {
      const res = await service.getPeriod();
      dispatch(FilterAction.setPeriods(res.data.data));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchEndWeek = useCallback(async () => {
    try {
      const res = await service.getYearWeek();
      const yearweeks = res.data.data.sort((a, b) => b - a);
      dispatch(FilterAction.setYearweeks(yearweeks));
      dispatch(FilterAction.setEndweek(yearweeks[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchStartWeek = useCallback(async () => {
    try {
      const res = await service.getYearWeek();
      const yearweeks = res.data.data.sort((a, b) => b - a);
      if (yearweeks.length < 7) {
        dispatch(FilterAction.setStartweek(yearweeks[yearweeks.length - 1]));
      } else {
        dispatch(FilterAction.setStartweek(yearweeks[7]));
      }
      dispatch(FilterAction.setYearweeks(yearweeks));
    } catch (err) {
      console.error(err);
    }
  }, []);


  // fecth Tutela Daily Monitoring
  const fetchLevelDayMonitorings = useCallback(async () => {
    try {
      const res = await service.getLevelDayMonitoring();
      const levels = res.data.data;
      dispatch(FilterAction.setLevelDayMonitorings(levels));
    } catch (err) {
      console.error(err);
    }
  }, []);
  const fetchRegionDayMonitorings = useCallback(async () => {
    try {
      const res = await service.getRegionDayMonitoring();
      const regionDayMonitoring = res.data.data;
      dispatch(FilterAction.setRegionDayMonitorings(regionDayMonitoring));
      dispatch(FilterAction.setRegionDayMonitoring(regionDayMonitoring[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);
  const fetchCitiesDayMonitorings = useCallback(async () => {
    try {
      const res = await service.getCitiesDayMonitoring(
        { ...(searchCityDayMonitoring ? { keyword: searchCityDayMonitoring } : {}), }
      );
      const citiesDayMonitoring = res.data.data;

      searchCityDayMonitoring && dispatch(FilterAction.setCitiesDayMonitorings(citiesDayMonitoring));
      dispatch(FilterAction.setCitiesDayMonitorings(citiesDayMonitoring));
    } catch (err) {
      console.error(err);
    }
  }, [
    searchCityDayMonitoring
  ]);

  // fecth Tutela Week Monitoring
  const fetchStartWeekMonitoring = useCallback(async () => {
    try {
      const res = await service.getDateWeekMonitoring();
      const yearweekWeekMonitorings = res.data.data.sort((a, b) => b - a);
      if (yearweekWeekMonitorings.length < 7) {
        dispatch(FilterAction.setStartWeekMonitoring(yearweekWeekMonitorings[yearweekWeekMonitorings.length - 1]));
      } else {
        dispatch(FilterAction.setStartWeekMonitoring(yearweekWeekMonitorings[7]));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchEndWeekMonitoring = useCallback(async () => {
    try {
      const res = await service.getDateWeekMonitoring();
      const yearweekWeekMonitorings = res.data.data.sort((a, b) => b - a);
      dispatch(FilterAction.setYearweekWeekMonitorings(yearweekWeekMonitorings));
      dispatch(FilterAction.setEndWeekMonitoring(yearweekWeekMonitorings[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchLevelWeekMonitorings = useCallback(async () => {
    try {
      const res = await service.getLevelWeekMonitoring();
      const levels = res.data.data;
      dispatch(FilterAction.setLevelWeekMonitorings(levels));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchRegionWeekMonitorings = useCallback(async () => {
    try {
      const res = await service.getRegionWeekMonitoring();
      const regionWeekMonitoring = res.data.data;
      dispatch(FilterAction.setRegionWeekMonitorings(regionWeekMonitoring));
      dispatch(FilterAction.setRegionWeekMonitoring(regionWeekMonitoring[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchCitiesWeekMonitorings = useCallback(async () => {
    try {
      const res = await service.getCitiesWeekMonitoring({
        ...(searchCityWeekMonitoring ? { keyword: searchCityWeekMonitoring } : {}),
      }
      );
      const citiesWeekMonitoring = res.data.data;
      searchCityWeekMonitoring && dispatch(FilterAction.setCitiesWeekMonitorings(citiesWeekMonitoring));
      dispatch(FilterAction.setCitiesWeekMonitorings(citiesWeekMonitoring));
    } catch (err) {
      console.error(err);
    }
  }, [
    levelWeekMonitoring,
    searchCityWeekMonitoring
  ]);


  // fetch Flip Flop
  const fetchKpis = useCallback(async () => {
    try {
      const res = await service.getKpi();
      const kpis = res.data.data;
      dispatch(FilterAction.setKpis(kpis));
      dispatch(FilterAction.setKpi(kpis[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchCitiesFlipFlop = useCallback(async () => {
    try {
      const res = await service.getCityFlipFlop();
      const citiesFlipFlop = res.data.data;
      dispatch(FilterAction.setCitiesFlipFlop(citiesFlipFlop));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchYearWeekOpenSignal = useCallback(async () => {
    try {
      const res = await service.getYearWeekOpenSignal();
      const yearweeksOpen = res.data.data.sort((a, b) => b - a);
      dispatch(FilterAction.setYearweekOpenSignals(yearweeksOpen));
      dispatch(FilterAction.setYearweekOpenSignal(yearweeksOpen[0]));
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ============== Data Filter Feching Use Effect ============== //

  useEffect(() => {
    if(menu === "summary" || menu === "kpi-details" && vendor === "tutela") {
      fetchYearweeks();
    }
  }, [fetchYearweeks])

  // Efect Day Monitoring
  useEffect(() => {
    if (menu === "day-monitoring" && vendor === "tutela") {
      fetchLevelDayMonitorings();
      fetchRegionDayMonitorings();
      fetchCitiesDayMonitorings();
    }
  }, [
    fetchLevelDayMonitorings,
    fetchCitiesDayMonitorings,
    fetchRegionDayMonitorings,
    menu,
    vendor,
  ]);

  // Efect Week Monitoring
  useEffect(() => {
    if (menu === "week-monitoring" && vendor === "tutela") {
      fetchStartWeekMonitoring();
      fetchEndWeekMonitoring();
      fetchLevelWeekMonitorings();
      fetchRegionWeekMonitorings();
      fetchCitiesWeekMonitorings();
    }
  }, [
    menu,
    fetchStartWeekMonitoring,
    fetchEndWeekMonitoring,
    fetchLevelWeekMonitorings,
    fetchRegionWeekMonitorings,
    fetchCitiesWeekMonitorings,
    vendor,
  ]);

  // Efect Month Monitoring
  useEffect(() => {
    if (menu === "month-monitoring" && vendor === "tutela") {
      fetchStartWeekMonitoring();
      fetchEndWeekMonitoring();
      fetchLevelWeekMonitorings();
      fetchRegionWeekMonitorings();
      fetchCitiesWeekMonitorings();
    }
  }, [
    menu,
    fetchStartWeekMonitoring,
    fetchEndWeekMonitoring,
    fetchLevelWeekMonitorings,
    fetchRegionWeekMonitorings,
    fetchCitiesWeekMonitorings,
    vendor,
  ]);

  // Efect Fail Contributor
  useEffect(() => {
    if (menu === "fail-contributor" && vendor === "tutela") {
      fetchEndWeek();
      fetchStartWeek();
      fetchLevels();
      fetchOperators();
      fetchPeriods();
      fetchCities();
      fetchRegions();
      fetchKecamatans();
    }
  }, [
    fetchLevels,
    fetchOperators,
    fetchPeriods,
    fetchEndWeek,
    fetchStartWeek,
    fetchRegions,
    fetchCities,
    fetchKecamatans,
    menu,
    vendor,
  ]);

  // Efect Flip Flop
  useEffect(() => {
    if (menu === "flip-flop" && vendor === "tutela") {
      fetchKpis();
      fetchCitiesFlipFlop();
    }
  }, [fetchKpis, fetchCitiesFlipFlop, vendor]);

  // Efect Open Signal
  useEffect(() => {
    if (menu === "summary-open" || menu === "kpi-details-open" && vendor === "open-signal") {
      fetchYearWeekOpenSignal();
    }
  }, [vendor, fetchYearWeekOpenSignal]);

  return {
    kpis,
    yearweeks,
    yearweekOpenSignals,
    levels,
    regions,
    cities,
    kecamatans,
    levelDayMonitorings,
    regionDayMonitorings,
    citiesDayMonitorings,
    citiesFlipFlop,
    yearweekWeekMonitorings,
    levelWeekMonitorings,
    regionWeekMonitorings,
    citiesWeekMonitorings
  };
}
