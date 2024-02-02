import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../interfaces/FilterRequest";
import { IFailContributorTrend } from "../interfaces/FailContributorTrend";
import Trend from "./Mocks/Trend.json"
import SampleTrend from "./Mocks/SampleTrend.json"

@Service("api")
export class FailContributorService {
    @Post("/fail-contributor/trend?kpi=:kpi")
    getChart(_: IFilterRequest & { kpi: string }) {
        return response<IBaseResponse<IFailContributorTrend>>();
    }
}

if (process.env.NODE_ENV === "development") {
    mock.onPost("api/fail-contributor/trend?kpi=good_quality").reply(200, Trend);
    mock.onPost("api/fail-contributor/trend?kpi=game_score").reply(200, Trend);
    mock.onPost("api/fail-contributor/trend?kpi=video_netflix").reply(200, Trend);
    mock.onPost("api/fail-contributor/trend?kpi=sample_qualitymatch").reply(200, SampleTrend);
    mock.onPost("api/fail-contributor/trend?kpi=sample_gamematch").reply(200, SampleTrend);
    mock.onPost("api/fail-contributor/trend?kpi=sample_videomatch_netflix").reply(200, SampleTrend);
}