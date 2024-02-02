import {
  Get,
  Post,
  Service,
  mock,
  response,
} from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../../common/interfaces/FilterRequest";
import { IMap } from "../interfaces/Map";
import { IOKRTrend } from "../interfaces/OKRTrend";
import map from "./mocks/map.json";
import okr_nation from "./mocks/okr_nation.json";

@Service("api")
export class MapService {
  @Post("/map")
  getMap(_: IFilterRequest) {
    return response<IBaseResponse<IMap[]>>();
  }

  @Get("/map/okr-nation")
  getOKRNation() {
    return response<IBaseResponse<IOKRTrend>>();
  }
}

if (process.env.NODE_ENV === "development") {
  mock.onPost("api/map").reply(200, map);
  mock.onGet("api/map/okr-nation").reply(200, okr_nation);
}
