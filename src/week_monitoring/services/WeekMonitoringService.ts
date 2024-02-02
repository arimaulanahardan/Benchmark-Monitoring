import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../../common/interfaces/MonitoringFilter";
import TrendWeekly from "./mocks/TrendWeekly.json"
import { IMonitoringTrend } from "../../common/interfaces/MonitoringTrend";

@Service("api")
export class WeekMonitoringService {
    @Post("/tutela-weekly/week-monitoring/trend")
    getChart(_: IFilterRequest) {
        return response<IBaseResponse<IMonitoringTrend>>();
    }
}

if (process.env.NODE_ENV === "development") {
    mock.onPost("api/tutela-weekly/week-monitoring/trend").reply(200, TrendWeekly);
}

