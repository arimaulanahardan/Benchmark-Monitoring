import {
  Post,
  Service,
  mock,
  response,
} from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../interfaces/FilterRequest";
import { IKpiTrend } from "../interfaces/KpiTrend";
import { IKpiInsight } from "../interfaces/KpiInsight";
import { IKpiTable } from "../interfaces/KpiTable";
import chart from "./mocks/chart.json";
import insight from "./mocks/insight.json";
import table from "./mocks/table.json";

@Service("api")
export class KPIService {
  @Post("/kpi/chart")
  getChart(_: IFilterRequest) {
    return response<IBaseResponse<IKpiTrend>>();
  }
  @Post("/kpi/insight")
  getInsight(_: IFilterRequest) {
    return response<IBaseResponse<IKpiInsight>>();
  }
  @Post("/kpi/table")
  getTable(_: IFilterRequest) {
    return response<IBaseResponse<IKpiTable[]>>();
  }
}

if (process.env.NODE_ENV === "development") {
  mock.onPost("api/kpi/chart").reply(200, chart);
  mock.onPost("api/kpi/insight").reply(200, insight);
  mock.onPost("api/kpi/table").reply(200, table);
}
