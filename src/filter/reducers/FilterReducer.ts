import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const defaultDateStart = dayjs().subtract(15, "day");
const defaultDate = dayjs().subtract(1, "day");

const reducer = createSlice({
  name: "filter",
  initialState: {
    yearweek: 0,
    yearWeeks: [] as number[],
    vendor: "tutela",
    menu: "summary",
    yearweekOpenSignal: 0,
    yearweekOpenSignals: [] as number[],


    // Fail Contributor
    endweek: 0,
    startweek: 0,
    level: "Region",
    levels: [] as string[],
    region: ["Sumbagut"],
    regions: [] as string[],
    city: ["ACEH BARAT"],
    cities: [] as string[],
    kecamatan: ["BANDA"],
    kecamatans: [] as string[],
    operator: ["Telkomsel"],
    operators: [] as string[],
    searchCity: "",
    searchKecamatan: "",
    period: "Weekly",
    periods: [] as string[],

    // Tutela Daily Monitoring
    dateStringStart: defaultDateStart,
    dateString: defaultDate,
    levelDayMonitoring: "nationwide",
    levelDayMonitorings: [] as string[],
    regionDayMonitoring: ["CENTRAL JABOTABEK"],
    regionDayMonitorings: [] as string[],
    citiesDayMonitoring: ["1107"],
    citiesDayMonitorings: [] as string[],
    searchCityDayMonitoring: "",

    // Tutela Weekly Monitoring
    startWeekMonitoring: 0,
    endWeekMonitoring: 0,
    yearweekWeekMonitorings: [] as number[],
    levelWeekMonitoring: "nationwide",
    levelWeekMonitorings: [] as string[],
    regionWeekMonitoring: [] as string[],
    regionWeekMonitorings: [] as string[],
    citiesWeekMonitoring: ["1107"],
    citiesWeekMonitorings: [] as string[],
    searchCityWeekMonitoring: "",

    // Flip Flop Cities
    kpi: "",
    kpis: [] as string[],
    cityflipflop: "KOTA JAKARTA SELATAN",
    citiesflipflop: [] as any[],
  },
  
  reducers: {
    
    setYearweekOpenSignal(state, action: PayloadAction<number>) {
      state.yearweekOpenSignal = action.payload;
    },
    setYearweekOpenSignals(state, action: PayloadAction<number[]>) {
      state.yearweekOpenSignals = action.payload;
    },
    
    setYearweek(state, action: PayloadAction<number>) {
      state.yearweek = action.payload;
    },
    setYearweeks(state, action: PayloadAction<number[]>) {
      state.yearWeeks = action.payload;
    },
    setVendor(state, action: PayloadAction<string>) {
      state.vendor = action.payload;
    },
    setMenu(state, action: PayloadAction<string>) {
      state.menu = action.payload;
    },

    // Tutela Daily Monitoring
    setLevelDayMonitoring(state, action: PayloadAction<string>) {
      state.levelDayMonitoring = action.payload;
    },
    setLevelDayMonitorings(state, action: PayloadAction<string[]>) {
      state.levelDayMonitorings = action.payload;
    },
    setRegionDayMonitoring(state, action: PayloadAction<string>) {
      state.regionDayMonitoring = [action.payload];
    },
    setRegionDayMonitorings(state, action: PayloadAction<string[]>) {
      state.regionDayMonitorings = action.payload;
    },
    setCitiesDayMonitoring(state, action: PayloadAction<string>) {
      state.citiesDayMonitoring = [action.payload];
    },
    setCitiesDayMonitorings(state, action: PayloadAction<any[]>) {
      state.citiesDayMonitorings = action.payload;
    },
    setSearchCityDayMonitoring(state, action: PayloadAction<string>) {
      state.searchCityDayMonitoring = action.payload;
    },
    setDateStringStart(state, action: PayloadAction<ReturnType<typeof dayjs>>) {
      if (action.payload) {
        state.dateStringStart = action.payload;
      }
    },
    setDateString(state, action: PayloadAction<ReturnType<typeof dayjs>>) {
      if (action.payload) {
        state.dateString = action.payload;
      }
    },

    // Tutela Weekly Monitoring
    setStartWeekMonitoring(state, action: PayloadAction<number>) {
      state.startWeekMonitoring = action.payload;
    },
    setEndWeekMonitoring(state, action: PayloadAction<number>) {
      state.endWeekMonitoring = action.payload;
    },
    setYearweekWeekMonitorings(state, action: PayloadAction<number[]>) {
      state.yearweekWeekMonitorings = action.payload;
    },
    setLevelWeekMonitoring(state, action: PayloadAction<string>) {
      state.levelWeekMonitoring = action.payload;
    },
    setLevelWeekMonitorings(state, action: PayloadAction<string[]>) {
      state.levelWeekMonitorings = action.payload;
    },
    setRegionWeekMonitoring(state, action: PayloadAction<string>) {
      state.regionWeekMonitoring = [action.payload];
    },
    setRegionWeekMonitorings(state, action: PayloadAction<string[]>) {
      state.regionWeekMonitorings = action.payload;
    },
    setCitiesWeekMonitoring(state, action: PayloadAction<string>) {
      state.citiesWeekMonitoring = [action.payload];
    },
    setCitiesWeekMonitorings(state, action: PayloadAction<any[]>) {
      state.citiesWeekMonitorings = action.payload;
    },
    setSearchCityWeekMonitoring(state, action: PayloadAction<string>) {
      state.searchCityWeekMonitoring = action.payload;
    },

    // Fail Contributor
    setSearchCity(state, action: PayloadAction<string>) {
      state.searchCity = action.payload;
    },
    setSearchKecamatan(state, action: PayloadAction<string>) {
      state.searchKecamatan = action.payload;
    },
    setStartweek(state, action: PayloadAction<number>) {
      state.startweek = action.payload;
    },
    setEndweek(state, action: PayloadAction<number>) {
      state.endweek = action.payload;
    },
    setLevel(state, action: PayloadAction<string>) {
      state.level = action.payload;
    },
    setLevels(state, action: PayloadAction<string[]>) {
      state.levels = action.payload;
    },
    setRegion(state, action: PayloadAction<string>) {
      state.region = [action.payload];
    },
    setRegions(state, action: PayloadAction<string[]>) {
      state.regions = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = [action.payload];
    },
    setCities(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },
    setKecamatan(state, action: PayloadAction<string>) {
      state.kecamatan = [action.payload];
    },
    setKecamatans(state, action: PayloadAction<string[]>) {
      state.kecamatans = action.payload;
    },
    setOperator(state, action: PayloadAction<string>) {
      state.operator = [action.payload];
    },
    setOperators(state, action: PayloadAction<string[]>) {
      state.operators = action.payload;
    },
    setPeriod(state, action: PayloadAction<string>) {
      state.period = action.payload;
    },
    setPeriods(state, action: PayloadAction<string[]>) {
      state.periods = action.payload;
    },

    // Flip Flop Cities
    setKpi(state, action: PayloadAction<string>) {
      state.kpi = action.payload;
    },
    setKpis(state, action: PayloadAction<string[]>) {
      state.kpis = action.payload;
    },
    setCityFlipFlop(state, action: PayloadAction<string>) {
      state.cityflipflop = action.payload;
    },
    setCitiesFlipFlop(state, action: PayloadAction<any[]>) {
      state.citiesflipflop = action.payload;
    }
  },
});

export const FilterReducer = reducer.reducer;
export const FilterAction = reducer.actions;
