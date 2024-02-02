import {
  Post,
  Service,
  mock,
  response,
} from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../../common/interfaces/FilterRequest";
import city from "./mocks/city.json";
import { IOpportunityTrend } from "../interfaces/useTrendOpportunity";

@Service("api")
export class OpportunityService {
  @Post("/opportunity/city")
  getOpportunity(_: IFilterRequest) {
    return response<IBaseResponse<IOpportunityTrend>>();
  }
}

if (process.env.NODE_ENV === "development"){
  mock.onPost("api/opportunity/city").reply(200, city);
}
