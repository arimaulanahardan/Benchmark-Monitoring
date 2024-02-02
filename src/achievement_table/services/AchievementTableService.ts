import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IAchievementTable } from "../interfaces/AchievementTable";
import { IFilterRequest } from "../../common/interfaces/FilterRequest";
import {
  Post,
  Service,
  mock,
  response,
} from "@pt-neural-technologies-indonesia/service-api-fe";
import achievement from "./mocks/achievement.json";

@Service("api")
export class AchievementTableService {
  @Post("/achievement")
  getAchievement(_: IFilterRequest) {
    return response<IBaseResponse<IAchievementTable[]>>();
  }
}

if (process.env.NODE_ENV === "development"){
  mock.onPost("api/achievement").reply(200, achievement);
}
