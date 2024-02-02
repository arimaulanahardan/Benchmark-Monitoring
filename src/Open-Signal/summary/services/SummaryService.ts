import {
  Get,
  Post,
  Service,
  mock,
  response,
} from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../../../common/interfaces/FilterRequest";
import { IFilterRequestKPI } from "../interfaces/FilterRequestKPI";
import city from "./mocks/city.json";
import { IOpportunityTrend } from "../../../common/interfaces/OpportunityTrend";
import { IAchievementTable } from "../interfaces/AchievementTable";
import Achievement from "./mocks/achievement.json";
import map from "./mocks/map.json";
import okr_nation from "./mocks/okr_nation.json";
import chart from "./mocks/chart.json";
import insight from "./mocks/insight.json";
import table from "./mocks/table.json";
import { IMap } from "../interfaces/Map";
import { IOKRTrend } from "../interfaces/OKRTrend";
import { IKpiTrend } from "../interfaces/KpiTrend";
import { IKpiInsight } from "../interfaces/KpiInsight";
import { IKpiTable } from "../interfaces/KpiTable";

@Service("api")
export class SummaryService {
  @Post("/open-signal-summary/opportunity")
  getOpportunity(_: IFilterRequest) {
    return response<IBaseResponse<IOpportunityTrend[]>>();
  }
  @Post("/open-signal-summary/table")
  getAchievement(_: IFilterRequest) {
    return response<IBaseResponse<IAchievementTable[]>>();
  }
  @Post("/open-signal-summary/map")
  getMap(_: IFilterRequest) {
    return response<IBaseResponse<IMap[]>>();
  }
  @Post("/open-signal-summary/okr-nation")
  getOKRNation(_: IFilterRequest) {
    return response<IBaseResponse<IOKRTrend>>();
  }
  @Post("/open-signal-summary/chart")
  getChart(_: IFilterRequestKPI) {
    return response<IBaseResponse<IKpiTrend>>();
  }
  // @Post("/open-signal/kpi/insight")
  // getInsight(_: IFilterRequestKPI) {
  //   return response<IBaseResponse<IKpiInsight>>();
  // }
  // @Post("/open-signal/kpi/table")
  // getTable(_: IFilterRequestKPI) {
  //   return response<IBaseResponse<IKpiTable[]>>();
  // }
}

if (process.env.NODE_ENV === "development") {
  mock.onPost("api/open-signal-summary/opportunity").reply(200, city);
  mock.onPost("api/open-signal-summary/table").reply(200, Achievement);
  mock.onPost("api/open-signal-summary/map").reply(200, map);
  mock.onPost("api/open-signal-summary/okr-nation").reply(200, okr_nation);
  mock.onPost("api/open-signal-summary/chart").reply(200, chart);
  // mock.onPost("api/open-signal/kpi/insight").reply(200, insight);
  // mock.onPost("api/open-signal/kpi/table").reply(200, table);
}
