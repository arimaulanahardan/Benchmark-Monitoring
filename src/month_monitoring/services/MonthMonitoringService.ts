import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../../common/interfaces/MonitoringFilter";
import { IMonitoringTrend } from "../../common/interfaces/MonitoringTrend";
import TrendMonthly from "./mocks/TrendMonthly.json";

@Service("api")
export class MonthMonitoringService {
    @Post("/tutela-monthly/month-monitoring/trend")
    getChart(_: IFilterRequest) {
        return response<IBaseResponse<IMonitoringTrend>>();
    }
}

if (process.env.NODE_ENV === "development") {
    mock.onPost("api/tutela-monthly/month-monitoring/trend").reply(200, TrendMonthly);
}

