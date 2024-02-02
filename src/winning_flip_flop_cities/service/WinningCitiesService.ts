import { Post, Service, mock, response } from "@pt-neural-technologies-indonesia/service-api-fe";
import { IBaseResponse } from "../../common/interfaces/BaseResponse";
import { IFilterRequest } from "../interfaces/FilterRequest";
import { IWinningCitiesTrend } from "../interfaces/WinningCitiesTrend";
import Chart from "./mocks/Chart.json";
import TableSum from "./mocks/TableSum.json";
import Table from "./mocks/Table.json";
import Summary from "./mocks/Summary.json";
import { IWinningCitiesTableSummary } from "../interfaces/WinningCitiesTableSummary";
import { IWinningCitiesTable } from "../interfaces/WinningCitiesTable";
import { IWinningCitiesSummary } from "../interfaces/WinningCitiesSumary";

@Service("api")
export class WinningCitiesService {
    @Post("/flip-flop/chart")
    getChart(_: IFilterRequest) {
        return response<IBaseResponse<IWinningCitiesTrend>>();
    }
    @Post("/flip-flop/tabel-atas")
    getTableSummary(_: IFilterRequest) {
        return response<IBaseResponse<IWinningCitiesTableSummary[]>>();
    }
    @Post("/flip-flop/tabel-tengah")
    getTable(_: IFilterRequest) {
        return response<IBaseResponse<IWinningCitiesTable[]>>();
    }
    @Post("/flip-flop/tabel-bawah")
    getSummary(_: IFilterRequest) {
        return response<IBaseResponse<IWinningCitiesSummary>>();
    }
}

if (process.env.NODE_ENV === "development") {
    mock.onPost("api/flip-flop/chart").reply(200, Chart);
    mock.onPost("api/flip-flop/tabel-atas").reply(200, TableSum);
    mock.onPost("api/flip-flop/tabel-tengah").reply(200, Table);
    mock.onPost("api/flip-flop/tabel-bawah").reply(200, Summary);
}