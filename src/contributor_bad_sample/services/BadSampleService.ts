import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../interfaces/FilterRequest";
import { IBadSampleInsight } from "../interfaces/BadSampleInsight";
import { IBadSampleTable } from "../interfaces/BadSampleTable";
import { IBadSampleTrend } from "../interfaces/BadSampleTrend";

import Trend from "./mocks/trend.json"
import Table from "./mocks/table.json"

@Service("api")
export class BadSampleService{
    @Post("/bad_sample/chart")
    getChart(_: IFilterRequest ) {
        return response<IBaseResponse<IBadSampleTrend>>();
    }
    // @Post("/bad_sample/insight")
    // getInsight(_: IFilterRequest ) {
    //     return response<IBaseResponse<IBadSampleInsight>>();
    // }
    @Post("/bad_sample/table")
    getTable(_: IFilterRequest ) {
        return response<IBaseResponse<IBadSampleTable[]>>();
    }
}

if (process.env.NODE_ENV === "development"){
    mock.onPost("api/bad_sample/chart").reply(200, Trend);
    mock.onPost("api/bad_sample/table").reply(200, Table);
}
