import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../interfaces/FilterRequest";
import { IMonitoringTrend } from "../../common/interfaces/MonitoringTrend";
import Trend from "./mocks/Trend.json"

@Service("api")
export class DayMonitoringService {
    @Post("/tutela-daily/day-monitoring/trend")
    getChart(_: IFilterRequest ) {
        return response<IBaseResponse<IMonitoringTrend>>();
    }
}

if (process.env.NODE_ENV === "development"){
    mock.onPost("api/tutela-daily/day-monitoring/trend").reply(200, Trend);
}

