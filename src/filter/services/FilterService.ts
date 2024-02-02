import { Get, Service, mock, response, Post} from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IDownloadFailContributor } from "../interfaces/DownloadFailContributor";
import regions from "./mocks/regions.json";
import levels_tutela_daily from "./mocks/levels_tutela_daily.json";
import yearweek from "./mocks/yearweek.json"
import levels_fail_contributor from "./mocks/levels_fail_contributor.json"
import cities_tutela_daily from "./mocks/cities_tutela_daily.json"
import cities from "./mocks/cities.json"
import kecamatan from "./mocks/kecamatan.json"
import operators from "./mocks/operators.json"
import kpi from "./mocks/kpi.json";
import citiesFlipFlop from "./mocks/citiesFlipFlop.json";
import dateWeekly from "./mocks/dateWeekly.json";
import period from "./mocks/period.json";
import yearweekOpen from "./mocks/yearweekOpen.json";

@Service("api")
export class FilterService {
  @Get("/filter/yearweek")
  getYearWeek() {
    return response<IBaseResponse<number[]>>();
  }
  @Post("/open-signal-summary/filter/yearweek")
  getYearWeekOpenSignal() {
    return response<IBaseResponse<number[]>>();
  }

  // Fail Contributor
  @Post("/fail-contributor/filter/levels")
  getLevel() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/filter/cities")
  getCity(_: { keyword?: string }) {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/filter/kecamatan")
  getKecamatan(_: { keyword?: string }) {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/filter/regions")
  getRegion() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/filter/operators")
  getOperator() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/filter/periods")
  getPeriod() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/fail-contributor/download")
  GetDownload(_: IDownloadFailContributor) {
    return response<any>();
  }

  // Tutela Daily Monitoring
  @Post("/tutela-daily/filter/regions")
  getRegionDayMonitoring() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/tutela-daily/filter/cities")
  getCitiesDayMonitoring(_: { keyword?: string }) {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/tutela-daily/filter/levels")
  getLevelDayMonitoring() {
    return response<IBaseResponse<string[]>>();
  }

  // Tutela Weekly Monitoring
  @Post("/tutela-weekly/filter/regions")
  getRegionWeekMonitoring() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/tutela-weekly/filter/cities")
  getCitiesWeekMonitoring(_: { keyword?: string }) {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/tutela-weekly/filter/levels")
  getLevelWeekMonitoring() {
    return response<IBaseResponse<string[]>>();
  }
  @Post("/tutela-weekly/filter/dates")
  getDateWeekMonitoring() {
    return response<IBaseResponse<number[]>>();
  }

  // Flip Flop
  @Get("/flip-flop/filter/cities")
  getCityFlipFlop() {
    return response<IBaseResponse<string[]>>();
  }
  @Get("/flip-flop/filter/kpi")
  getKpi() {
    return response<IBaseResponse<string[]>>();
  }
}

if (process.env.NODE_ENV === "development") {
  mock.onGet("api/filter/yearweek").reply(200, yearweek);
  mock.onPost("api/open-signal-summary/filter/yearweek").reply(200, yearweekOpen);
  mock.onPost("api/fail-contributor/filter/levels").reply(200, levels_fail_contributor);
  mock.onPost("api/fail-contributor/filter/yearweeks").reply(200, yearweek);
  mock.onPost("api/fail-contributor/filter/cities").reply(200, cities);
  mock.onPost("api/fail-contributor/filter/kecamatan").reply(200, kecamatan);
  mock.onPost("api/fail-contributor/filter/regions").reply(200, regions);
  mock.onPost("api/fail-contributor/filter/operators").reply(200, operators);
  mock.onPost("api/fail-contributor/filter/periods").reply(200, period);
  mock.onPost("api/tutela-daily/filter/regions").reply(200, regions);
  mock.onPost("api/tutela-daily/filter/cities").reply(200, cities_tutela_daily);
  mock.onPost("api/tutela-daily/filter/levels").reply(200, levels_tutela_daily);
  mock.onPost("api/tutela-weekly/filter/regions").reply(200, regions);
  mock.onPost("api/tutela-weekly/filter/cities").reply(200, cities_tutela_daily);
  mock.onPost("api/tutela-weekly/filter/levels").reply(200, levels_tutela_daily);
  mock.onPost("api/tutela-weekly/filter/dates").reply(200, dateWeekly);
  mock.onGet("api/flip-flop/filter/cities").reply(200, citiesFlipFlop);
  mock.onGet("api/flip-flop/filter/kpi").reply(200, kpi)
}